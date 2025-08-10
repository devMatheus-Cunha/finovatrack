import { doc, getDoc } from '@firebase/firestore'
import { db } from '../firebase'

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
