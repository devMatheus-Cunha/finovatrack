import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

export type MonthlyContribution = {
  date: string
  value: string
}

export async function addMonthlyContributionService(
  data: MonthlyContribution,
  idUser: string
) {
  try {
    const allGoalsDocRef = doc(
      db,
      'users',
      idUser,
      'investments',
      'monthly_contribution'
    )
    const allGoalsDocSnap = await getDoc(allGoalsDocRef)

    if (allGoalsDocSnap.exists()) {
      await updateDoc(allGoalsDocRef, data)
    } else {
      await setDoc(allGoalsDocRef, data)
    }

    return 'Monthly contribution added/updated successfully'
  } catch (error: any) {
    throw new Error(
      'Failed to add/update goal monthly contribution: ' + error.message
    )
  }
}
