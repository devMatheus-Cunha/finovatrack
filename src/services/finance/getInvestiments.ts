import {
  IInvestimentsData,
  IGetAllPies,
  IInvestmentsProps,
  TransactionListProps
} from '@/hooks/finance/useFetchInvestiments'
import { doc, setDoc, getDoc } from '@firebase/firestore'
import { db } from '../firebase'

export const getCombinedData = async (
  userId: string,
  investimentsData: IInvestimentsData | undefined
): Promise<IInvestimentsData> => {
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
    let previousTotalInterest = { actual: 0, old: 0 }

    previousTransactions = investimentsData?.totalListaData || []
    previousTotalInterest = investimentsData?.totalInterest || {
      actual: 0,
      old: 0
    }

    const previousTransactionDates = new Set(
      previousTransactions.map((t) => t.dateTime)
    )
    const newDeposits = transactionListData.filter(
      (t) => !previousTransactionDates.has(t.dateTime)
    )

    const newInterestTotal = newDeposits.reduce(
      (sum, transaction) => sum + transaction.amount,
      previousTotalInterest.actual
    )

    return {
      ...investmentsData,
      totalListaData: transactionListData,
      totalInterest: {
        actual: newInterestTotal,
        old: previousTotalInterest.actual
      },
      pies: piesData[0]
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
): Promise<IInvestimentsData | undefined> => {
  const docRef = doc(db, 'users', userId, 'finance', 'investiments')
  try {
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data() as IInvestimentsData
    }
  } catch (error) {
    console.error('Error fetching document:', error)
    throw error
  }
  return undefined
}
