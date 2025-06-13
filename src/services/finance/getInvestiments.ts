import {
  IInvestimentsData,
  IGetAllPies,
  IInvestmentsProps,
  TransactionListProps
} from '@/hooks/finance/useFetchInvestiments'
import { doc, setDoc, getDoc } from '@firebase/firestore'
import { db } from '../firebase'

export const getCombinedData = async (
  investimentsData: IInvestimentsData | any, // Usando 'any' para aceitar o formato antigo e novo durante a transição
  reserve?: number
): Promise<any> => {
  const apiKey = process.env.NEXT_PUBLIC_KEY_API_TRANDING_212
  if (!apiKey) {
    throw new Error('Missing API key')
  }

  try {
    // --- 1. BUSCA DE DADOS NA API ---
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

    // --- 2. CÁLCULOS PRINCIPAIS ---

    const totalPortfolio = apiInvestmentsData?.total || 0
    const valorInvestido = apiInvestmentsData?.invested || 0
    const valorNaoInvestido = apiInvestmentsData?.free || 0
    const valorizacaoInvestimentos = apiInvestmentsData?.ppl || 0
    const totalDividendos = (piesData[0]?.dividendDetails?.gained || 0) + 0.37

    // --- CÁLCULO DE JUROS CORRIGIDO E SEGURO ---
    const jurosAnteriores =
      investimentsData?.rendimentos?.detalhes?.jurosSobreCaixa?.totalRecebido ||
      investimentsData?.totalJurosValorLivre?.atual ||
      0

    const transacoesAnteriores = new Set(
      investimentsData?.dadosBrutos?.transacoesRecentes.map(
        (t: any) => t.dateTime
      ) || []
    )

    const novasTransacoes = transactionListData.filter(
      (t) => !transacoesAnteriores.has(t.dateTime)
    )

    // Filtra as novas transações para pegar APENAS as que são de juros.
    const novasTransacoesDeJuros = novasTransacoes.filter(
      (t) => t.type === 'Interest'
    )

    // A soma agora usa a lista filtrada, contendo apenas os juros.
    const totalJurosRecebidos = novasTransacoesDeJuros.reduce(
      (soma, transacao) => soma + transacao.amount,
      jurosAnteriores
    )

    const lucroTotal =
      valorizacaoInvestimentos + totalDividendos + totalJurosRecebidos

    console.log(lucroTotal)
    const porcLucroTotal = totalPortfolio
      ? (lucroTotal / totalPortfolio) * 100
      : 0
    const porcValorizacaoInv = valorInvestido
      ? (valorizacaoInvestimentos / valorInvestido) * 100
      : 0
    const rendimentoHistoricoJuros = totalPortfolio
      ? (totalJurosRecebidos / totalPortfolio) * 100
      : 0

    // --- 4. CÁLCULOS PARA PROJEÇÕES ---
    const taxaJurosAnual = 2.2
    const projecaoAnualJuros = valorNaoInvestido * (taxaJurosAnual / 100)
    const dividendYieldHistorico = valorInvestido
      ? totalDividendos / valorInvestido
      : 0
    const projecaoAnualDividendos = valorInvestido * dividendYieldHistorico

    // --- 5. MONTAGEM DO OBJETO DE RETORNO FINAL ---
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
            taxaAnual: taxaJurosAnual,
            rendimentoHistoricoPercentual: parseFloat(
              rendimentoHistoricoJuros.toFixed(2)
            )
          },
          valorizacaoInvestimentos: {
            valor: parseFloat(valorizacaoInvestimentos.toFixed(2)),
            porcentagem: parseFloat(porcValorizacaoInv.toFixed(2))
          },
          dividendos: {
            totalRecebido: parseFloat(totalDividendos.toFixed(2)),
            reinvestidos: parseFloat(
              (piesData[0]?.dividendDetails?.reinvested || 0).toFixed(2)
            ),
            recebidosEmCaixa: parseFloat(
              (piesData[0]?.dividendDetails?.inCash || 0).toFixed(2)
            )
          }
        }
      },
      projecoes: {
        jurosSobreCaixa: {
          projecaoDiaria: parseFloat((projecaoAnualJuros / 365).toFixed(4)),
          projecaoMensal: parseFloat((projecaoAnualJuros / 12).toFixed(2)),
          projecaoAnual: parseFloat(projecaoAnualJuros.toFixed(2))
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
