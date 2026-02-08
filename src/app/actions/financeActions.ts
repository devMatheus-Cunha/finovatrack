'use server'

import { revalidatePath } from 'next/cache'
import { adminDb } from '@/services/firebaseAdmin'

/* ============================================================================
    1. INTERFACES (RESTAURADAS)
============================================================================ */

interface ApiResponseWrapper<T> {
  items: T[]
  nextPagePath: string | null
}

export interface IAccountSummaryApi {
  totalValue: number
  cash: { availableToTrade: number; inPies: number }
  investments: {
    currentValue: number
    totalCost: number
    unrealizedProfitLoss: number
  }
}

interface ITransactionApi {
  type: 'INTEREST' | 'TAX_ON_INTEREST' | 'DIVIDEND' | string
  amount: number
  reference: string
  dateTime: string
}

interface IDividendApi {
  ticker: string
  amount: number
  netAmount: number
  tax: number
  paidOn: string
}

export interface IPositionApi {
  quantity: number
  averagePricePaid: number
  currentPrice: number
  instrument: { ticker: string }
  walletImpact: {
    totalCost: number
    currentValue: number
    unrealizedProfitLoss: number
    fxImpact: number
  }
}

export interface IPositionItem {
  ticker: string
  nome: string
  tipo: string
  qtd: number
  precoMedio: number
  precoAtual: number
  investido: number
  saldoAtual: number
  lucro: number
  lucroPercentual: number
  impactoCambial: number
}

export interface IInvestimentsData {
  referenciaBase: {
    jurosBase: number
    dividendosBase: number
    corteJuros: string
    corteDividendos: string
  }
  resumoConta: {
    totalGeral: number
    reservaExterna: number
    corretora: {
      saldoTotal: number
      caixaLivre: number
      valorInvestido: number
      valorDeMercado: number
      lucroLatente: number
    }
  }
  carteira: {
    acoes: IPositionItem[]
    etfs: IPositionItem[]
    alocacao: { acoes: number; etfs: number }
    destaques: {
      maiorAlta: IPositionItem | null
      maiorBaixa: IPositionItem | null
    }
  }
  performance: {
    lucroTotalGeral: number
    porcentagemGeral: number
    detalhes: {
      valorizacao: { valor: number; porcentagem: number }
      dividendos: {
        recebidoTotal: number
        recebido12Meses: number
        yieldAtual: number
        topPagadores: { ticker: string; valor: number }[]
      }
      jurosCaixa: { recebidoTotal: number; taxaAtual: number }
    }
  }
  planejamento: {
    rendaAnualEstimada: number
    projecoes: {
      juros: { diario: number; mensal: number; anual: number }
      dividendos: { diario: number; mensal: number; anual: number }
    }
    metas: {
      progressoDividendos: number
      progressoJuros: number
      objetivos: { dividendosMensal: number; jurosMensal: number }
    }
  }
  extrato: { transacoes: any[]; dividendosHistorico: any[] }
}

/* ============================================================================
    2. HELPERS
============================================================================ */

async function fetchAllFromApi<T>(
  endpoint: string,
  fetchOptions: RequestInit
): Promise<T[]> {
  let allItems: T[] = []
  let url: string | null =
    `https://live.trading212.com/api/v0/equity${endpoint}`
  while (url) {
    const res: Response = await fetch(url, fetchOptions)
    if (!res.ok) break
    const data: ApiResponseWrapper<T> = await res.json()
    if (data.items) allItems = [...allItems, ...data.items]
    url = data.nextPagePath
      ? `https://live.trading212.com/api/v0/equity${data.nextPagePath}`
      : null
  }
  return allItems
}

/* ============================================================================
    3. PROCESSAMENTO
============================================================================ */

function processData(
  raw: {
    summary: IAccountSummaryApi
    transactions: ITransactionApi[]
    positions: IPositionApi[]
    metadata: any[]
    dividends: IDividendApi[]
  },
  baseConfig: {
    jurosBase: number
    dividendosBase: number
    corteJuros: string
    corteDividendos: string
  },
  reserve: number = 0
): IInvestimentsData {
  const { summary, transactions, positions, metadata, dividends } = raw

  const corteJuros = new Date(baseConfig.corteJuros)
  const corteDividendos = new Date(baseConfig.corteDividendos)

  let novaDataCorteJuros = corteJuros
  let novaDataCorteDividendos = corteDividendos

  // --- JUROS (Soma com precisão de milissegundos para evitar duplicidade) ---
  const novosJuros = transactions.reduce((acc, t) => {
    if (!t.dateTime) return acc
    const dataT = new Date(t.dateTime)

    // Comparação estrita por tempo para evitar somar o mesmo juro após ajuste manual
    if (dataT.getTime() > corteJuros.getTime()) {
      if (
        t.type === 'INTEREST' ||
        t.type === 'TAX_ON_INTEREST' ||
        t.type === 'DEPOSIT'
      ) {
        if (dataT.getTime() > novaDataCorteJuros.getTime())
          novaDataCorteJuros = dataT
        return acc + (Number(t.amount) || 0)
      }
    }
    return acc
  }, 0)
  const totalJurosFinal = Number((baseConfig.jurosBase + novosJuros).toFixed(2))

  // --- DIVIDENDOS (Acúmulo Total) ---
  const novosDivs = dividends.reduce((acc, d) => {
    const dataD = new Date(d.paidOn)
    if (dataD.getTime() > corteDividendos.getTime()) {
      if (dataD.getTime() > novaDataCorteDividendos.getTime())
        novaDataCorteDividendos = dataD
      return (
        acc + (Number(d.netAmount) || Number(d.amount) - Number(d.tax) || 0)
      )
    }
    return acc
  }, 0)
  const totalDivsGeralFinal = Number(
    (baseConfig.dividendosBase + novosDivs).toFixed(2)
  )

  // --- PROJEÇÕES ---
  const transacoesJurosValidas = transactions.filter(
    (t) => t.type === 'INTEREST' || t.type === 'DEPOSIT'
  )
  const ultimoJuroDiario = Number(transacoesJurosValidas[0]?.amount) || 0
  const jurosMensalProj = Number((ultimoJuroDiario * 31).toFixed(2))

  const yieldHistorico =
    summary.investments.currentValue > 0
      ? totalDivsGeralFinal / summary.investments.currentValue
      : 0
  const divMensalEstimado = Number(
    ((summary.investments.currentValue * yieldHistorico) / 12).toFixed(2)
  )

  // Mapeamento de Posições
  const metaMap = new Map(metadata.map((m: any) => [m.ticker, m]))
  const processedPos: IPositionItem[] = positions.map((pos) => {
    const meta = metaMap.get(pos.instrument.ticker)
    const cost = pos.walletImpact?.totalCost || 0
    return {
      ticker: pos.instrument.ticker,
      nome: meta?.name || pos.instrument.ticker,
      tipo: meta?.type || 'STOCK',
      qtd: pos.quantity,
      precoMedio: pos.averagePricePaid,
      precoAtual: pos.currentPrice,
      investido: Number(cost.toFixed(2)),
      saldoAtual: Number((pos.walletImpact?.currentValue || 0).toFixed(2)),
      lucro: Number((pos.walletImpact?.unrealizedProfitLoss || 0).toFixed(2)),
      lucroPercentual:
        cost > 0 ? (pos.walletImpact.unrealizedProfitLoss / cost) * 100 : 0,
      impactoCambial: Number((pos.walletImpact?.fxImpact || 0).toFixed(2))
    }
  })

  return {
    referenciaBase: {
      jurosBase: totalJurosFinal,
      dividendosBase: totalDivsGeralFinal,
      corteJuros: novaDataCorteJuros.toISOString(),
      corteDividendos: novaDataCorteDividendos.toISOString()
    },
    resumoConta: {
      totalGeral: Number((summary.totalValue + reserve).toFixed(2)),
      reservaExterna: reserve,
      corretora: {
        saldoTotal: summary.totalValue,
        caixaLivre: summary.cash.availableToTrade,
        valorInvestido: summary.investments.totalCost,
        valorDeMercado: summary.investments.currentValue,
        lucroLatente: summary.investments.unrealizedProfitLoss
      }
    },
    carteira: {
      acoes: processedPos.filter((p) => p.tipo !== 'ETF'),
      etfs: processedPos.filter((p) => p.tipo === 'ETF'),
      alocacao: {
        acoes: processedPos
          .filter((p) => p.tipo !== 'ETF')
          .reduce((a, b) => a + b.saldoAtual, 0),
        etfs: processedPos
          .filter((p) => p.tipo === 'ETF')
          .reduce((a, b) => a + b.saldoAtual, 0)
      },
      destaques: {
        maiorAlta:
          [...processedPos].sort(
            (a, b) => b.lucroPercentual - a.lucroPercentual
          )[0] || null,
        maiorBaixa:
          [...processedPos].sort(
            (a, b) => a.lucroPercentual - b.lucroPercentual
          )[0] || null
      }
    },
    performance: {
      lucroTotalGeral: Number(
        (
          (summary.investments.unrealizedProfitLoss || 0) +
          totalDivsGeralFinal +
          totalJurosFinal
        ).toFixed(2)
      ),
      porcentagemGeral:
        summary.totalValue > 0
          ? (((summary.investments.unrealizedProfitLoss || 0) +
              totalDivsGeralFinal +
              totalJurosFinal) /
              summary.totalValue) *
            100
          : 0,
      detalhes: {
        valorizacao: {
          valor: summary.investments.unrealizedProfitLoss,
          porcentagem:
            (summary.investments.unrealizedProfitLoss /
              summary.investments.totalCost) *
            100
        },
        dividendos: {
          recebidoTotal: totalDivsGeralFinal,
          recebido12Meses: 0,
          yieldAtual: yieldHistorico * 100,
          topPagadores: []
        },
        jurosCaixa: { recebidoTotal: totalJurosFinal, taxaAtual: 2.2 }
      }
    },
    planejamento: {
      rendaAnualEstimada: Number(
        (divMensalEstimado * 12 + jurosMensalProj * 12).toFixed(2)
      ),
      projecoes: {
        juros: {
          diario: ultimoJuroDiario,
          mensal: jurosMensalProj,
          anual: jurosMensalProj * 12
        },
        dividendos: {
          diario: Number((divMensalEstimado / 30).toFixed(2)),
          mensal: divMensalEstimado,
          anual: divMensalEstimado * 12
        }
      },
      metas: {
        progressoDividendos: 0,
        progressoJuros: 0,
        objetivos: { dividendosMensal: 10, jurosMensal: 40 }
      }
    },
    extrato: {
      transacoes: transactions.slice(0, 31),
      dividendosHistorico: dividends.slice(0, 31)
    }
  }
}

/* ============================================================================
    4. ACTION
============================================================================ */

export async function updateAndRevalidateInvestments(
  userId: string,
  reserve: number = 0
) {
  const apiKey = process.env.API_TRANDING_212
  const secretKey = process.env.SECREAT_TRANDING_212
  if (!apiKey || !secretKey) throw new Error('API Keys missing')

  const credentials = Buffer.from(
    `${apiKey.trim()}:${secretKey.trim()}`
  ).toString('base64')
  const fetchOptions: RequestInit = {
    method: 'GET',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json'
    },
    next: { revalidate: 0 }
  }

  try {
    const BASE_URL = 'https://live.trading212.com/api/v0/equity'
    const investDoc = await adminDb
      .collection('users')
      .doc(userId)
      .collection('finance')
      .doc('investiments')
      .get()
    const currentData = investDoc.data()
    const baseConfig = currentData?.referenciaBase || {
      jurosBase: 592.83,
      dividendosBase: 78.87,
      corteJuros: '2026-02-06T02:04:08.384Z',
      corteDividendos: '2026-02-06T02:04:08.384Z'
    }

    const [summaryRes, positionsRes, metaRes] = await Promise.all([
      fetch(`${BASE_URL}/account/summary`, fetchOptions),
      fetch(`${BASE_URL}/positions`, fetchOptions),
      fetch(`${BASE_URL}/metadata/instruments`, fetchOptions)
    ])

    const [allTransactions, allDividends] = await Promise.all([
      fetchAllFromApi<ITransactionApi>(
        '/history/transactions?limit=31',
        fetchOptions
      ),
      fetchAllFromApi<IDividendApi>('/history/dividends?limit=31', fetchOptions)
    ])

    const rawData = {
      summary: (await summaryRes.json()) as IAccountSummaryApi,
      positions: (await positionsRes.json()) as IPositionApi[],
      metadata: (await metaRes.json()) as any[],
      transactions: allTransactions,
      dividends: allDividends
    }

    const finalData = processData(rawData, baseConfig, reserve)
    await adminDb
      .collection('users')
      .doc(userId)
      .collection('finance')
      .doc('investiments')
      .set(finalData, { merge: true })

    revalidatePath('/finance')
    return { success: true }
  } catch (error: any) {
    console.error('ERRO:', error.message)
    return { success: false, error: error.message }
  }
}
