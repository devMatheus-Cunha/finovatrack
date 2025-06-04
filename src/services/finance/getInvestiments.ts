import {
  IInvestimentsData,
  IGetAllPies,
  IInvestmentsProps,
  TransactionListProps
} from '@/hooks/finance/useFetchInvestiments'
import { doc, setDoc, getDoc } from '@firebase/firestore'
import { db } from '../firebase'
import { fakeInvestiments } from './fakeData'

export const getCombinedData = async (
  investimentsData: IInvestimentsData | undefined,
  reserve?: number
): Promise<any> => {
  const apiKey = process.env.NEXT_PUBLIC_KEY_API_TRANDING_212
  if (!apiKey) {
    throw new Error('Missing API key')
  }

  try {
    const [investmentsResponse, piesResponse, transactionListResponse] =
      await Promise.all([
        fetch(
          `https://cors.redoc.ly/https://live.trading212.com/api/v0/equity/account/cash`,
          {
            method: 'GET',
            headers: { Authorization: apiKey }
          }
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
          `https://cors.redoc.ly/https://live.trading212.com/api/v0/history/transactions?limit=20`,
          {
            method: 'GET',
            headers: { Authorization: apiKey }
          }
        )
      ])

    if (
      !investmentsResponse.ok ||
      !piesResponse.ok ||
      !transactionListResponse.ok
    ) {
      throw new Error('API request failed')
    }

    const investmentsData =
      (await investmentsResponse.json()) as IInvestmentsProps
    const piesData = (await piesResponse.json()) as IGetAllPies[]
    const apiTransactionList = await transactionListResponse.json()
    const transactionListData =
      apiTransactionList.items as TransactionListProps[]

    let previousTransactions: TransactionListProps[] = []
    let previousTotalInterest = { atual: 0, antigo: 0 }

    previousTransactions = investimentsData?.totalListaData || []
    previousTotalInterest = investimentsData?.totalJurosValorLivre || {
      atual: 0,
      antigo: 0
    }

    const previousTransactionDates = new Set(
      previousTransactions.map((t) => t.dateTime)
    )
    const newDeposits = transactionListData.filter(
      (t) => !previousTransactionDates.has(t.dateTime)
    )

    const newInterestTotal = newDeposits.reduce(
      (sum, transaction) => sum + transaction.amount,
      previousTotalInterest.atual
    )

    const pies = piesData[0]
    const totalPortifolioTranding = investmentsData?.total || 0
    const totalInvestido = investmentsData?.invested || 0
    const valorValorizacaoInvest = investmentsData?.ppl || 0
    const investEValorizacao = totalInvestido + valorValorizacaoInvest || 0
    const totalDividendos = (pies?.dividendDetails?.gained || 0) + 0.37

    const porcValorizacaoInv = totalInvestido
      ? (valorValorizacaoInvest / totalInvestido) * 100
      : 0
    const lucroTotal =
      valorValorizacaoInvest + totalDividendos + newInterestTotal || 0
    const porcLucroTotal = totalPortifolioTranding
      ? (lucroTotal / totalPortifolioTranding) * 100
      : 0

    return {
      totalNaoInvestido: investmentsData?.free || 0,
      totalValoriEJuros:
        newInterestTotal + valorValorizacaoInvest + totalDividendos || 0,
      totalListaData: transactionListData,
      totalJurosValorLivre: {
        atual: newInterestTotal || 0,
        antigo: previousTotalInterest.atual || 0
      },
      reserva: reserve || 0,
      totalPortifolioTranding: totalPortifolioTranding || 0,
      totalInvestido: totalInvestido || 0,
      investEValorizacao: investEValorizacao || 0,
      totalDividendos: totalDividendos || 0,
      porcValorizacaoInv: Number(porcValorizacaoInv.toFixed(2)) || 0,
      lucroTotal: lucroTotal || 0,
      porcLucroTotal: Number(porcLucroTotal.toFixed(2)) || 0,
      valorValorizacaoInvest: valorValorizacaoInvest || 0,
      patrimonioTotal: (totalPortifolioTranding || 0) + (reserve || 0)
    }
  } catch (error) {
    console.error('Error fetching data from API:', error)
    throw error
  }
}

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
  const mainUserId = process.env.NEXT_PUBLIC_USER_ID
  if (userId !== mainUserId) {
    return fakeInvestiments
  }

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
