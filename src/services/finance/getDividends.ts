import { fakeDividends } from './fakeData'
import {
  IDividendProps,
  IDividendsProps
} from '@/hooks/finance/useFetchDividends'
import { doc, setDoc, getDoc } from '@firebase/firestore'
import { db } from '../firebase'

export const updateOrCreateDoc = async (
  userId: string,
  data: IDividendsProps
) => {
  const docRef = doc(db, 'users', userId, 'finance', 'dividends')
  try {
    await setDoc(docRef, { data }, { merge: true })
  } catch (error) {
    console.error('Error updating/creating document:', error)
    throw error
  }
}

export const getDividendData = async (
  userId: string,
  size?: number
): Promise<IDividendsProps> => {
  const mainUserId = process.env.NEXT_PUBLIC_USER_ID
  if (userId !== mainUserId) {
    return size ? fakeDividends.slice(0, size) : fakeDividends
  }

  let query = doc(db, 'users', userId, 'finance', 'dividends')

  if (size) {
    query = query.withConverter({
      fromFirestore: (snapshot) => {
        const data = snapshot.data()
        return data?.data.slice(0, size) as IDividendProps[]
      },
      toFirestore: (value) => value
    })
  }

  const docSnap = await getDoc(query)

  if (docSnap.exists()) {
    const data = docSnap.data()
    return data as IDividendProps[]
  }
  return []
}

export async function fetchDividends(limit: string): Promise<IDividendProps[]> {
  const apiKey = process.env.NEXT_PUBLIC_KEY_API_TRANDING_212
  if (!apiKey) {
    throw new Error('Missing API key')
  }

  const response = await fetch(
    `https://cors.redoc.ly/https://live.trading212.com/api/v0/history/dividends?limit=${limit}`,
    {
      headers: {
        Authorization: apiKey
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
  return data?.items.sort((a: IDividendProps, b: IDividendProps) =>
    b.paidOn.localeCompare(a.paidOn)
  ) as IDividendProps[]
}
