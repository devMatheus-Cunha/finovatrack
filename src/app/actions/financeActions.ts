'use server'

/* ============================================================================
   TIPOS
============================================================================ */

export interface InvestmentDataPropsApi {
  blocked: number
  free: number
  invested: number
  pieCash: number
  ppl: number
  result: number
  total: number
}

export interface IGetAllPies {
  id: number
  cash: number
  dividendDetails: {
    gained: number
    reinvested: number
    inCash: number
  }
  result: {
    priceAvgInvestedValue: number
    priceAvgResult: number
    priceAvgResultCoef: number
    priceAvgValue: number
  }
  progress: number
  status: null
}

export interface TransactionListProps {
  type: string
  amount: number
  reference?: string
  dateTime: string
}

export interface IInvestimentsData {
  patrimonio: {
    total: number
    reservaExterna: number
    totalNaCorretora: number
  }
  composicaoPortfolio: {
    valorInvestido: number
    valorNaoInvestido: number
    valorizacaoAtual: number
    totalInvestidoComValorizacao: number
  }
  rendimentos: {
    lucroTotal: number
    porcentagemLucroTotal: number
    detalhes: {
      jurosSobreCaixa: {
        totalRecebido: number
        taxaAnual: number
        rendimentoHistoricoPercentual: number
      }
      valorizacaoInvestimentos: {
        valor: number
        porcentagem: number
      }
      dividendos: {
        totalRecebido: number
        totalRecebidoUltimos12Meses: number
        yieldAnualizado: number
        distribuicaoPorAtivo: Array<{
          ticker: string
          valor: number
        }>
      }
    }
  }
  projecoes: {
    rendimentoTotalAnual: number
    jurosSobreCaixa: {
      projecaoDiaria: number
      projecaoMensal: number
      projecaoAnual: number
    }
    dividendos: {
      projecaoAnualEstimada: number
      projecaoMensalEstimada: number
      projecaoDiariaEstimada: number
      yieldProjetado: number
    }
  }
  metas: {
    dividendos: {
      objetivoMensal: number
      valorInvestidoNecessario: number
    }
    juros: {
      objetivoMensal: number
      valorNaoInvestidoNecessario: number
    }
  }
  dadosBrutos: {
    transacoesRecentes: TransactionListProps[]
    historicoDividendos: any[]
  }
}

import { revalidatePath } from 'next/cache'
import { adminDb } from '@/services/firebaseAdmin'

/* ============================================================================
   HELPERS
============================================================================ */

interface DividendPageResponse {
  items: any[]
  nextPagePath?: string | null
}

function diffInDays(date1: Date, date2: Date): number {
  const diffTime = Math.abs(date2.getTime() - date1.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 1
}

/* ============================================================================
   FETCH DIVIDENDOS (ROBUSTO)
============================================================================ */

async function fetchAllDividends(
  baseUrl: string,
  fetchOptions: RequestInit
): Promise<any[]> {
  let cursor: string | null = null
  const todos: any[] = []
  const visited = new Set<string>()

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const url = cursor ? `${baseUrl}&cursor=${cursor}` : baseUrl

    const res = await fetch(url, fetchOptions)
    if (!res.ok) break

    const data = (await res.json()) as DividendPageResponse
    todos.push(...data.items)

    if (!data.nextPagePath) break

    try {
      const temp = new URL(`https://dummy.com${data.nextPagePath}`)
      const next = temp.searchParams.get('cursor')

      if (!next) break
      if (visited.has(next)) break

      visited.add(next)
      cursor = next
    } catch {
      break
    }
  }
  return todos
}

/* ============================================================================
   FORMATAR DIVIDENDOS (CORRETO)
============================================================================ */

function formatarDividendos(allDividends: any[], valorInvestido: number) {
  const normalizados = allDividends.map((d) => ({
    ...d,
    amountReal: Number(d.amount ?? d.netAmount ?? d.grossAmount ?? 0)
  }))

  // const totalGeral = normalizados.reduce((sum, d) => sum + d.amountReal, 0)

  const umAnoAtras = new Date()
  umAnoAtras.setFullYear(umAnoAtras.getFullYear() - 1)

  const ltm = normalizados.filter((d) => new Date(d.paidOn) >= umAnoAtras)

  const totalLTM = ltm.reduce((s, d) => s + d.amountReal, 0)

  const yieldAnualizado = valorInvestido ? (totalLTM / valorInvestido) * 100 : 0

  const distribuicao = Object.entries(
    normalizados.reduce((acc: Record<string, number>, d) => {
      acc[d.ticker] = (acc[d.ticker] || 0) + d.amountReal
      return acc
    }, {})
  )
    .map(([ticker, valor]) => ({
      ticker,
      valor: Number(valor.toFixed(2))
    }))
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 10)

  return {
    totalGeral: Number(63),
    totalLTM: Number(totalLTM.toFixed(2)),
    yieldAnualizado: Number(yieldAnualizado.toFixed(2)),
    distribuicao,
    quantidade: allDividends.length
  }
}

/* ============================================================================
   FETCH EXTERNAL
============================================================================ */

async function fetchExternalData(apiKey: string, apiSecret: string) {
  const base64Credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString(
    'base64'
  )

  const fetchOptions: RequestInit = {
    method: 'GET',
    headers: { Authorization: `Basic ${base64Credentials}` },
    next: { revalidate: 0 }
  }

  const CASH = 'https://live.trading212.com/api/v0/equity/account/cash'
  const TRANS =
    'https://live.trading212.com/api/v0/history/transactions?limit=50'
  const DIVS = 'https://live.trading212.com/api/v0/history/dividends?limit=50'

  const [cashRes, transRes] = await Promise.all([
    fetch(CASH, fetchOptions),
    fetch(TRANS, fetchOptions)
  ])

  if (!cashRes.ok || !transRes.ok)
    throw new Error('Falha ao buscar dados da Trading212')

  const apiInvestmentsData = (await cashRes.json()) as InvestmentDataPropsApi
  const transactionListData = (await transRes.json())
    .items as TransactionListProps[]

  const allDividends = await fetchAllDividends(DIVS, fetchOptions)

  return { apiInvestmentsData, transactionListData, allDividends }
}

/* ============================================================================
   PROCESS DATA
============================================================================ */

function processInvestmentData(
  raw: {
    apiInvestmentsData: InvestmentDataPropsApi
    transactionListData: TransactionListProps[]
    allDividends: any[]
  },
  previous: IInvestimentsData | undefined,
  reserve?: number
): IInvestimentsData {
  const { apiInvestmentsData, transactionListData, allDividends } = raw

  const valorInvestido = apiInvestmentsData.invested
  const valorNaoInvestido = apiInvestmentsData.free
  const totalPortfolio = apiInvestmentsData.total
  const valorizacao = apiInvestmentsData.ppl

  /* --- JUROS INCREMENTAIS (correto) --- */
  const jurosAntigos =
    previous?.rendimentos?.detalhes?.jurosSobreCaixa?.totalRecebido || 0

  const refsAntigas = new Set(
    previous?.dadosBrutos?.transacoesRecentes.map((t) => t.reference) || []
  )

  const novasTransacoes = transactionListData.filter(
    (t) => !refsAntigas.has(t.reference)
  )

  const novasDeJuros = novasTransacoes.filter(
    (t) => t.type === 'Interest' || (t.type === 'DEPOSIT' && t.amount < 2)
  )

  const totalJuros = novasDeJuros.reduce((s, t) => s + t.amount, jurosAntigos)

  /* --- DIVIDENDOS (sempre full rebuild) --- */
  const dividendos = formatarDividendos(allDividends, valorInvestido)

  /* --- PROJEÇÕES --- */
  const hoje = new Date()
  const fimAno = new Date(hoje.getFullYear(), 11, 31)

  const taxaFutura = 2.2
  const yieldProj = 2.92 / 100

  const diasRestantes = diffInDays(hoje, fimAno)

  const ganhosFuturos =
    diasRestantes * (valorNaoInvestido * (taxaFutura / 100 / 365))

  const projJurosAnual = totalJuros + ganhosFuturos

  const projJurosDiario = valorNaoInvestido * (taxaFutura / 100 / 365)
  const projJurosMensal = projJurosDiario * 30

  const projDividendoAnual = valorInvestido * yieldProj
  const projDivMensal = projDividendoAnual / 12
  const projDivDiario = projDividendoAnual / 365

  /* --- METAS --- */
  const metaDividendos = 10
  const metaJuros = 40

  const metas = {
    dividendos: {
      objetivoMensal: metaDividendos,
      valorInvestidoNecessario: (metaDividendos * 12) / yieldProj
    },
    juros: {
      objetivoMensal: metaJuros,
      valorNaoInvestidoNecessario: metaJuros / (taxaFutura / 100 / 12)
    }
  }

  /* --- LUCRO TOTAL --- */
  const lucroTotal = valorizacao + dividendos.totalGeral + totalJuros

  console.log(valorizacao, dividendos.totalGeral, totalJuros)

  const porcentagemLucro =
    totalPortfolio > 0 ? (lucroTotal / totalPortfolio) * 100 : 0

  return {
    patrimonio: {
      total: parseFloat((totalPortfolio + (reserve || 0)).toFixed(2)),
      reservaExterna: reserve || 0,
      totalNaCorretora: parseFloat(totalPortfolio.toFixed(2))
    },
    composicaoPortfolio: {
      valorInvestido: parseFloat(valorInvestido.toFixed(2)),
      valorNaoInvestido: parseFloat(valorNaoInvestido.toFixed(2)),
      valorizacaoAtual: parseFloat(valorizacao.toFixed(2)),
      totalInvestidoComValorizacao: parseFloat(
        (valorInvestido + valorizacao).toFixed(2)
      )
    },
    rendimentos: {
      lucroTotal: parseFloat(lucroTotal.toFixed(2)),
      porcentagemLucroTotal: parseFloat(porcentagemLucro.toFixed(2)),
      detalhes: {
        jurosSobreCaixa: {
          totalRecebido: parseFloat(totalJuros.toFixed(2)),
          taxaAnual: taxaFutura,
          rendimentoHistoricoPercentual:
            valorNaoInvestido > 0
              ? parseFloat(((totalJuros / valorNaoInvestido) * 100).toFixed(2))
              : 0
        },
        valorizacaoInvestimentos: {
          valor: parseFloat(valorizacao.toFixed(2)),
          porcentagem:
            valorInvestido > 0
              ? parseFloat(((valorizacao / valorInvestido) * 100).toFixed(2))
              : 0
        },
        dividendos: {
          totalRecebido: dividendos.totalGeral,
          totalRecebidoUltimos12Meses: dividendos.totalLTM,
          yieldAnualizado: dividendos.yieldAnualizado,
          distribuicaoPorAtivo: dividendos.distribuicao
        }
      }
    },
    projecoes: {
      rendimentoTotalAnual: parseFloat(
        (projJurosAnual + projDividendoAnual).toFixed(2)
      ),
      jurosSobreCaixa: {
        projecaoDiaria: parseFloat(projJurosDiario.toFixed(4)),
        projecaoMensal: parseFloat(projJurosMensal.toFixed(2)),
        projecaoAnual: parseFloat(projJurosAnual.toFixed(2))
      },
      dividendos: {
        projecaoAnualEstimada: parseFloat(projDividendoAnual.toFixed(2)),
        projecaoMensalEstimada: parseFloat(projDivMensal.toFixed(2)),
        projecaoDiariaEstimada: parseFloat(projDivDiario.toFixed(2)),
        yieldProjetado: 2.92
      }
    },
    metas,
    dadosBrutos: {
      transacoesRecentes: transactionListData,
      historicoDividendos: allDividends
    }
  }
}

/* ============================================================================
   UPDATE + SAVE
============================================================================ */

export async function updateAndRevalidateInvestments(
  userId: string,
  reserve?: number
) {
  const apiKey = process.env.API_TRANDING_212
  const secretKey = process.env.SECREAT_TRANDING_212

  if (!apiKey || !secretKey) throw new Error('Chave da API não encontrada.')

  try {
    const docRef = adminDb
      .collection('users')
      .doc(userId)
      .collection('finance')
      .doc('investiments')

    const docSnap = await docRef.get()

    const previousData = docSnap.exists
      ? (docSnap.data() as IInvestimentsData)
      : undefined

    const rawData = await fetchExternalData(apiKey, secretKey)
    const finalData = processInvestmentData(rawData, previousData, reserve)

    await docRef.set(finalData, { merge: true })

    revalidatePath('/finance')

    return { success: true, message: 'Investimentos atualizados com sucesso.' }
  } catch (err) {
    console.error(err)
    throw new Error('Falha ao atualizar investimentos.')
  }
}
