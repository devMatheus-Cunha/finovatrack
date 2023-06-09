/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import { deleteDoc, doc } from 'firebase/firestore'
import { ExpenseData } from '@/hooks/expenses/useFetchExpensesData'
import { db } from '../firebase'

export interface IDeleteEntryServiceProps {
  value: string
  id?: string
}

export async function deleteExpense(itemId = '', data: ExpenseData) {
  const docRef = doc(db, 'users', itemId, 'expenses', data?.id || '')
  await deleteDoc(docRef)
}
