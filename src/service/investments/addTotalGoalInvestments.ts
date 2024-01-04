import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

export type ExpenseFormData = {
  id?: string
  date: string
  value: string
}

export async function addTotalGoalInvestments(data: any, idUser: string) {
  try {
    const allGoalsDocRef = doc(db, 'users', idUser, 'investments', 'allGoals')
    const allGoalsDocSnap = await getDoc(allGoalsDocRef)

    if (allGoalsDocSnap.exists()) {
      await updateDoc(allGoalsDocRef, data)
    } else {
      await setDoc(allGoalsDocRef, data)
    }

    return 'Goal investment added/updated successfully'
  } catch (error: any) {
    throw new Error('Failed to add/update goal investment: ' + error.message)
  }
}
