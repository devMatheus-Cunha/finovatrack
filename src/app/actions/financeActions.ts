'use server'

import { revalidatePath } from 'next/cache'
import { adminDb } from '@/services/firebaseAdmin'
import {
  IInvestimentsData,
  InvestmentDataPropsApi,
  TransactionListProps
} from '@/hooks/finance/useFetchInvestiments/types'

interface DividendPageResponse {
  items: any[]
  nextPagePath?: string | null
}

function diffInDays(date1: Date, date2: Date): number {
  const diffTime = Math.abs(date2.getTime() - date1.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 1
}

async function fetchExternalData(apiKey: string) {
  const headers = { Authorization: apiKey }
  const fetchOptions = { method: 'GET', headers, next: { revalidate: 0 } }

  const [investmentsResponse, transactionListResponse] = await Promise.all([
    fetch(
      `https://live.trading212.com/api/v0/equity/account/cash`,
      fetchOptions
    ),
    fetch(
      `https://live.trading212.com/api/v0/history/transactions?limit=50`,
      fetchOptions
    )
  ])

  if (!investmentsResponse.ok || !transactionListResponse.ok) {
    throw new Error('Falha na requisição à API da Trading212')
  }

  const apiInvestmentsData =
    (await investmentsResponse.json()) as InvestmentDataPropsApi
  const transactionListData = (await transactionListResponse.json())
    .items as TransactionListProps[]

  const allDividends: any[] = []
  let nextCursor: string | null = null

  do {
    const dividendUrl: string = `https://live.trading212.com/api/v0/history/dividends?limit=50${nextCursor ? `&cursor=${nextCursor}` : ''}`

    const dividendResponse: Response = await fetch(dividendUrl, fetchOptions)
    if (!dividendResponse.ok) break

    const dividendPage = (await dividendResponse.json()) as DividendPageResponse

    allDividends.push(...dividendPage.items)
    nextCursor = dividendPage.nextPagePath?.split('cursor=')[1] || null
  } while (nextCursor)

  return { apiInvestmentsData, transactionListData, allDividends }
}

function processInvestmentData(
  rawData: {
    apiInvestmentsData: InvestmentDataPropsApi
    transactionListData: TransactionListProps[]
    allDividends: any[]
  },
  previousData: IInvestimentsData | undefined,
  reserve?: number
): IInvestimentsData {
  const { apiInvestmentsData, transactionListData, allDividends } = rawData

  const totalPortfolio = apiInvestmentsData?.total || 0
  const valorInvestido = apiInvestmentsData?.invested || 0
  const valorNaoInvestido = apiInvestmentsData?.free || 0
  const valorizacaoInvestimentos = apiInvestmentsData?.ppl || 0
  const totalDividendos = allDividends.reduce((sum, div) => sum + div.amount, 0)

  const jurosAnteriores =
    previousData?.rendimentos?.detalhes?.jurosSobreCaixa?.totalRecebido || 0

  const transacoesAnterioresRefs = new Set(
    previousData?.dadosBrutos?.transacoesRecentes.map((t) => t.reference) || []
  )
  const novasTransacoes = transactionListData.filter(
    (t) => !transacoesAnterioresRefs.has(t.reference)
  )
  const novasTransacoesDeJuros = novasTransacoes.filter(
    (t) => t.type === 'Interest' || (t.type === 'DEPOSIT' && t.amount < 2)
  )
  const totalJurosRecebidos = novasTransacoesDeJuros.reduce(
    (soma, transacao) => soma + transacao.amount,
    jurosAnteriores
  )

  const umAnoAtras = new Date()
  umAnoAtras.setFullYear(umAnoAtras.getFullYear() - 1)

  const dividendosUltimos12Meses = allDividends.filter(
    (div) => new Date(div.paidOn) >= umAnoAtras
  )
  const totalDividendosLTM = dividendosUltimos12Meses.reduce(
    (sum, div) => sum + div.amount,
    0
  )
  const yieldAnualizadoLTM = valorInvestido
    ? (totalDividendosLTM / valorInvestido) * 100
    : 0

  const distribuicaoPorAtivoMap = allDividends.reduce((acc, div) => {
    acc[div.ticker] = (acc[div.ticker] || 0) + div.amount
    return acc
  }, {})
  const distribuicaoPorAtivo = Object.entries(distribuicaoPorAtivoMap)
    .map(([ticker, valor]) => ({
      ticker,
      valor: parseFloat((valor as number).toFixed(2))
    }))
    .sort((a, b) => b.valor - a.valor)

  const lucroTotal =
    valorizacaoInvestimentos + totalDividendos + totalJurosRecebidos

  const porcLucroTotal = totalPortfolio
    ? (lucroTotal / totalPortfolio) * 100
    : 0
  const porcValorizacaoSobreInvestido = valorInvestido
    ? (valorizacaoInvestimentos / valorInvestido) * 100
    : 0
  const porcJurosSobreCaixaLivre = valorNaoInvestido
    ? (totalJurosRecebidos / valorNaoInvestido) * 100
    : 0

  const hoje = new Date()
  const fimDoAno = new Date(hoje.getFullYear(), 11, 31)
  const taxaAtual = 2.37
  const taxaFutura = 2.2
  const dataMudancaTaxa = new Date(hoje.getFullYear(), 5, 16)

  let ganhosFuturosDeJuros = 0
  if (hoje < dataMudancaTaxa) {
    // Lógica futura aqui
  } else {
    const diasRestantes = diffInDays(hoje, fimDoAno)
    ganhosFuturosDeJuros =
      diasRestantes * (valorNaoInvestido * (taxaFutura / 100 / 365))
  }
  const projecaoJurosFimDeAno = totalJurosRecebidos + ganhosFuturosDeJuros
  const projecaoDiariaDeJurosAtual =
    valorNaoInvestido *
    ((hoje < dataMudancaTaxa ? taxaAtual : taxaFutura) / 100 / 365)

  const yieldProjetado = 2.92 / 100
  const projecaoAnualDividendos = valorInvestido * yieldProjetado
  const projecaoMensalDividendos = projecaoAnualDividendos / 12
  const projecaoDiariaDividendos = projecaoAnualDividendos / 365

  const finalData: IInvestimentsData = {
    patrimonio: {
      total: parseFloat((totalPortfolio + (reserve || 0)).toFixed(2)),
      reservaExterna: reserve || 0,
      totalNaCorretora: parseFloat(totalPortfolio.toFixed(2))
    },
    composicaoPortfolio: {
      valorInvestido: parseFloat(valorInvestido.toFixed(2)),
      valorNaoInvestido: parseFloat(valorNaoInvestido.toFixed(2)),
      valorizacaoAtual: parseFloat(valorizacaoInvestimentos.toFixed(2)),
      totalInvestidoComValorizacao: parseFloat(
        (valorInvestido + valorizacaoInvestimentos).toFixed(2)
      )
    },
    rendimentos: {
      lucroTotal: parseFloat(lucroTotal.toFixed(2)),
      porcentagemLucroTotal: parseFloat(porcLucroTotal.toFixed(2)),
      detalhes: {
        jurosSobreCaixa: {
          totalRecebido: parseFloat(totalJurosRecebidos.toFixed(2)),
          taxaAnual: hoje < dataMudancaTaxa ? taxaAtual : taxaFutura,
          rendimentoHistoricoPercentual: parseFloat(
            porcJurosSobreCaixaLivre.toFixed(2)
          )
        },
        valorizacaoInvestimentos: {
          valor: parseFloat(valorizacaoInvestimentos.toFixed(2)),
          porcentagem: parseFloat(porcValorizacaoSobreInvestido.toFixed(2))
        },
        dividendos: {
          totalRecebido: parseFloat(totalDividendos.toFixed(2)),
          totalRecebidoUltimos12Meses: parseFloat(
            totalDividendosLTM.toFixed(2)
          ),
          yieldAnualizado: parseFloat(yieldAnualizadoLTM.toFixed(2)),
          distribuicaoPorAtivo: distribuicaoPorAtivo.slice(0, 10)
        }
      }
    },
    projecoes: {
      jurosSobreCaixa: {
        projecaoDiaria: parseFloat(projecaoDiariaDeJurosAtual.toFixed(4)),
        projecaoAnual: parseFloat(projecaoJurosFimDeAno.toFixed(2)),
        projecaoMensal: parseFloat((projecaoDiariaDeJurosAtual * 30).toFixed(2))
      },
      dividendos: {
        projecaoAnualEstimada: parseFloat(projecaoAnualDividendos.toFixed(2)),
        projecaoMensalEstimada: parseFloat(projecaoMensalDividendos.toFixed(2)),
        projecaoDiariaEstimada: parseFloat(projecaoDiariaDividendos.toFixed(2)),
        yieldProjetado: parseFloat((yieldProjetado * 100).toFixed(2))
      }
    },
    dadosBrutos: {
      transacoesRecentes: transactionListData,
      historicoDividendos: allDividends
    }
  }

  return finalData
}

export async function updateAndRevalidateInvestments(
  userId: string,
  reserve?: number
) {
  console.log(`[Server Action] Iniciando para o usuário: ${userId}`)

  const apiKey = process.env.API_TRANDING_212
  if (!apiKey) {
    throw new Error('Chave da API não encontrada no servidor.')
  }

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

    const rawData = await fetchExternalData(apiKey)

    const finalData = processInvestmentData(rawData, previousData, reserve)

    await docRef.set(finalData, { merge: true })
    console.log('[Server Action] Dados salvos no Firebase com sucesso.')

    revalidatePath('/finance')
    console.log('[Server Action] Cache da rota /finance invalidado.')

    return { success: true, message: 'Investimentos atualizados com sucesso.' }
  } catch (error) {
    console.error('[Server Action] Erro ao processar dados:', error)
    throw new Error(
      'Falha ao atualizar os investimentos. Tente novamente mais tarde.'
    )
  }
}
