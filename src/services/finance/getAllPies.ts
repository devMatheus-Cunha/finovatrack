import { IGetAllPies } from '@/hooks/finance/useFetchAllPies'
import { doc, setDoc, getDoc } from '@firebase/firestore'
import { db } from '../firebase'

export const updateOrCreateDoc = async (userId: string, data: any) => {
  if (!data[0]) return

  const docRef = doc(db, 'users', userId, 'finance', 'allPies')
  try {
    await setDoc(docRef, data[0], { merge: true })
  } catch (error) {
    console.error('Error updating/creating document:', error)
    throw error
  }
}

export const getPieData = async (
  userId: string
): Promise<IGetAllPies | undefined> => {
  const docRef = doc(db, 'users', userId, 'finance', 'allPies')
  try {
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data() as IGetAllPies
    }
  } catch (error) {
    console.error('Error fetching document:', error)
    throw error
  }
  return undefined
}

export async function getAllPies(): Promise<IGetAllPies[]> {
  const apiKey = process.env.NEXT_PUBLIC_KEY_API_TRANDING_212
  if (!apiKey) {
    throw new Error('Missing API key')
  }

  try {
    const response = await fetch(
      `https://cors.redoc.ly/https://live.trading212.com/api/v0/equity/pies`,
      {
        headers: {
          Authorization: apiKey,
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API Error: ${response.status} - ${errorText}`)
    }

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('API Error: Invalid response content type, expected JSON')
    }

    const data = await response.json()
    return data as IGetAllPies[]
  } catch (error) {
    console.error('Error fetching pies from API:', error)
    // Trate o erro de forma mais robusta, talvez lançando um erro para ser tratado no hook
    throw error
  }
}
