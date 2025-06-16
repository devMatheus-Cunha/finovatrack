import {
  IInvestimentsData,
  IGetAllPies,
  IInvestmentsProps,
  TransactionListProps
} from '@/hooks/finance/useFetchInvestiments'
import { doc, setDoc, getDoc } from '@firebase/firestore'
import { db } from '../firebase'

// Função auxiliar para calcular a diferença de dias entre duas datas
const diffInDays = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 1
}

export const getCombinedData = async (
  investimentsData: IInvestimentsData | any,
  reserve?: number
): Promise<IInvestimentsData | undefined> => {
  const apiKey = process.env.NEXT_PUBLIC_KEY_API_TRANDING_212
  if (!apiKey) {
    throw new Error('Missing API key')
  }

  try {
    // ============================================================================
    // == 1. BUSCA E VALIDAÇÃO DOS DADOS DA API
    // ============================================================================
    const [investmentsResponse, piesResponse, transactionListResponse] =
      await Promise.all([
        fetch(
          `https://cors.redoc.ly/https://live.trading212.com/api/v0/equity/account/cash`,
          { method: 'GET', headers: { Authorization: apiKey } }
        ),
        fetch(
          `https://cors.redoc.ly/https://live.trading212.com/api/v0/equity/pies`,
          {
            headers: {
              Authorization: apiKey,
              'X-Requested-With': 'XMLHttpRequest'
            }
          }
        ),
        fetch(
          `https://cors.redoc.ly/https://live.trading212.com/api/v0/history/transactions?limit=50`,
          { method: 'GET', headers: { Authorization: apiKey } }
        )
      ])

    if (
      !investmentsResponse.ok ||
      !piesResponse.ok ||
      !transactionListResponse.ok
    ) {
      throw new Error('API request failed')
    }

    const apiInvestmentsData =
      (await investmentsResponse.json()) as IInvestmentsProps
    const piesData = (await piesResponse.json()) as IGetAllPies[]
    const apiTransactionList = await transactionListResponse.json()
    const transactionListData =
      apiTransactionList.items as TransactionListProps[]

    // ============================================================================
    // == 2. EXTRAÇÃO E DEFINIÇÃO DAS VARIÁVEIS BASE
    // ============================================================================
    const totalPortfolio = apiInvestmentsData?.total || 0
    const valorInvestido = apiInvestmentsData?.invested || 0
    const valorNaoInvestido = apiInvestmentsData?.free || 0
    const valorizacaoInvestimentos = apiInvestmentsData?.ppl || 0
    const totalDividendos = (piesData[0]?.dividendDetails?.gained || 0) + 0.65

    // ============================================================================
    // == 3. CÁLCULO DE NOVOS JUROS ACUMULADOS (LÓGICA FINAL)
    // ============================================================================
    const jurosAnteriores =
      investimentsData?.rendimentos?.detalhes?.jurosSobreCaixa?.totalRecebido ||
      0

    const transacoesAnterioresRefs = new Set(
      investimentsData?.dadosBrutos?.transacoesRecentes.map(
        (t: TransactionListProps) => t.reference
      ) || []
    )

    const novasTransacoes = transactionListData.filter(
      (t) => !transacoesAnterioresRefs.has(t.reference)
    )

    // Filtra as novas transações para pegar APENAS as que são de juros,
    // seguindo as suas novas regras.
    const novasTransacoesDeJuros = novasTransacoes.filter(
      (t) => t.type === 'Interest' || (t.type === 'DEPOSIT' && t.amount < 2)
    )

    // A soma agora usa a lista filtrada corretamente.
    const totalJurosRecebidos = novasTransacoesDeJuros.reduce(
      (soma, transacao) => soma + transacao.amount,
      jurosAnteriores
    )

    // ============================================================================
    // == 4. CÁLCULO DE RENDIMENTOS E PERFORMANCE HISTÓRICA
    // ============================================================================
    const lucroTotal =
      valorizacaoInvestimentos + totalDividendos + totalJurosRecebidos

    const porcLucroTotal = totalPortfolio
      ? (lucroTotal / totalPortfolio) * 100
      : 0
    const porcValorizacaoSobreInvestido = valorInvestido
      ? (valorizacaoInvestimentos / valorInvestido) * 100
      : 0
    const porcDividendosSobreInvestido = valorInvestido
      ? (totalDividendos / valorInvestido) * 100
      : 0
    const porcJurosSobreCaixaLivre = valorNaoInvestido
      ? (totalJurosRecebidos / valorNaoInvestido) * 100
      : 0

    // ============================================================================
    // == 5. CÁLCULO DE PROJEÇÕES FUTURAS
    // ============================================================================
    const hoje = new Date()
    const fimDoAno = new Date(hoje.getFullYear(), 11, 31)
    // Taxas ajustadas para a realidade
    const taxaAtual = 2.37
    const taxaFutura = 2.2
    const dataMudancaTaxa = new Date(hoje.getFullYear(), 5, 16) // 16 de Junho

    let ganhosFuturosDeJuros = 0
    if (hoje < dataMudancaTaxa) {
      const diasComTaxaAtual = diffInDays(hoje, dataMudancaTaxa)
      ganhosFuturosDeJuros +=
        diasComTaxaAtual * (valorNaoInvestido * (taxaAtual / 100 / 365))
      const diasComTaxaFutura = diffInDays(dataMudancaTaxa, fimDoAno)
      ganhosFuturosDeJuros +=
        diasComTaxaFutura * (valorNaoInvestido * (taxaFutura / 100 / 365))
    } else {
      const diasRestantes = diffInDays(hoje, fimDoAno)
      ganhosFuturosDeJuros =
        diasRestantes * (valorNaoInvestido * (taxaFutura / 100 / 365))
    }

    // Projeção final usa o novo 'totalJurosRecebidos' como base
    const projecaoJurosFimDeAno = totalJurosRecebidos + ganhosFuturosDeJuros
    const projecaoDiariaDeJurosAtual =
      valorNaoInvestido *
      ((hoje < dataMudancaTaxa ? taxaAtual : taxaFutura) / 100 / 365)

    const dividendYieldHistorico = valorInvestido
      ? totalDividendos / valorInvestido
      : 0
    const projecaoAnualDividendos = valorInvestido * dividendYieldHistorico

    // ============================================================================
    // == 6. MONTAGEM DO OBJETO DE RETORNO FINAL
    // ============================================================================
    return {
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
            reinvestidos: parseFloat(
              (piesData[0]?.dividendDetails?.reinvested || 0).toFixed(2)
            ),
            recebidosEmCaixa: parseFloat(
              (piesData[0]?.dividendDetails?.inCash || 0).toFixed(2)
            ),
            porcentagemSobreTotal: parseFloat(
              porcDividendosSobreInvestido.toFixed(2)
            )
          }
        }
      },
      projecoes: {
        jurosSobreCaixa: {
          projecaoDiaria: parseFloat(projecaoDiariaDeJurosAtual.toFixed(4)),
          projecaoAnual: parseFloat(projecaoJurosFimDeAno.toFixed(2)),
          projecaoMensal: parseFloat(
            (projecaoDiariaDeJurosAtual * 30).toFixed(2)
          )
        },
        dividendos: {
          projecaoAnualEstimada: parseFloat(projecaoAnualDividendos.toFixed(2)),
          yieldHistorico: parseFloat((dividendYieldHistorico * 100).toFixed(2))
        }
      },
      dadosBrutos: {
        transacoesRecentes: transactionListData
      }
    }
  } catch (error) {
    console.error('Error fetching and processing data:', error)
    return investimentsData || undefined
  }
}

// Suas outras funções (updateOrCreateDoc, getInvestmentData) permanecem as mesmas.
export const updateOrCreateDoc = async (
  userId: string,
  data: IInvestimentsData
) => {
  const docRef = doc(db, 'users', userId, 'finance', 'investiments')
  try {
    await setDoc(docRef, data, { merge: true })
  } catch (error) {
    console.error('Error updating/creating document:', error)
    throw error
  }
}

export const getInvestmentData = async (
  userId: string
): Promise<any | undefined> => {
  const docRef = doc(db, 'users', userId, 'finance', 'investiments')
  try {
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data()
    }
  } catch (error) {
    console.error('Error fetching document:', error)
    throw error
  }
  return undefined
}
