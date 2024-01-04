import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

export async function getMonthlycontributionService(idUser: string) {
  const allGoalsDocRef = doc(
    db,
    'users',
    idUser,
    'investments',
    'monthly_contribution'
  )
  const allGoalsDocSnap = await getDoc(allGoalsDocRef)

  if (allGoalsDocSnap.exists()) {
    return allGoalsDocSnap.data()
  } else {
    throw new Error('Document "monthly_contribution" not found')
  }
}
