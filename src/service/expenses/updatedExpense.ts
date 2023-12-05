/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { ExpenseData } from './getExpenses'

export async function updatedExpenseService(data: ExpenseData, idUser: string) {
  const docRef = doc(db, 'users', idUser, 'expenses', data.id)
  await updateDoc(docRef, { ...data })
}
