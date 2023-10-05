/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

export async function getInvestmentsTotalGoal(idUser: string) {
  const allGoalsDocRef = doc(db, 'users', idUser, 'investments', 'allGoals')
  const allGoalsDocSnap = await getDoc(allGoalsDocRef)

  if (allGoalsDocSnap.exists()) {
    return allGoalsDocSnap.data()
  } else {
    throw new Error('Document "allGoals" not found')
  }
}
