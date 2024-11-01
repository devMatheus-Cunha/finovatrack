import { IInvestmentsProps } from '@/hooks/finance/useFetchInvestiments'
import { doc, setDoc, getDoc } from '@firebase/firestore'
import { db } from '../firebase'

export const getInvestments = async () => {
  const resp = await fetch(
    `https://cors.redoc.ly/https://live.trading212.com/api/v0/equity/account/cash`,
    {
      method: 'GET',
      headers: {
        Authorization: process.env.NEXT_PUBLIC_KEY_API_TRANDING_212 || ''
      }
    }
  )

  const data = await resp.json()
  return data as IInvestmentsProps
}

export const updateOrCreateDoc = async (
  userId: string,
  data: IInvestmentsProps
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
): Promise<IInvestmentsProps | undefined> => {
  const docRef = doc(db, 'users', userId, 'finance', 'investiments')
  try {
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data() as IInvestmentsProps
    }
  } catch (error) {
    console.error('Error fetching document:', error)
    throw error
  }
  return undefined
}
