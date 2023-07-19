/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { IAddExpenseData } from './addExpense'

export async function updatedExpenseService(
  data: IAddExpenseData,
  idUser: string,
) {
  const docRef = doc(db, 'users', idUser, 'expenses', data.id)
  await updateDoc(docRef, { ...data })
}
