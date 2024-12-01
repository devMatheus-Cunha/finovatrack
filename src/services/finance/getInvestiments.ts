import {
  IInvestimentsData,
  IGetAllPies,
  IInvestmentsProps
} from '@/hooks/finance/useFetchInvestiments'
import { doc, setDoc, getDoc } from '@firebase/firestore'
import { db } from '../firebase'

export const getCombinedData = async (): Promise<IInvestimentsData> => {
  const apiKey = process.env.NEXT_PUBLIC_KEY_API_TRANDING_212
  if (!apiKey) {
    throw new Error('Missing API key')
  }

  try {
    const [investmentsResponse, piesResponse] = await Promise.all([
      fetch(
        `https://cors.redoc.ly/https://live.trading212.com/api/v0/equity/account/cash`,
        {
          method: 'GET',
          headers: {
            Authorization: apiKey
          }
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
      )
    ])

    if (!investmentsResponse.ok) {
      const errorText = await investmentsResponse.text()
      throw new Error(`API Error: ${investmentsResponse.status} - ${errorText}`)
    }

    if (!piesResponse.ok) {
      const errorText = await piesResponse.text()
      throw new Error(`API Error: ${piesResponse.status} - ${errorText}`)
    }

    const investmentsData =
      (await investmentsResponse.json()) as IInvestmentsProps
    const piesData = (await piesResponse.json()) as IGetAllPies[]

    return { ...investmentsData, pies: piesData[0] }
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
