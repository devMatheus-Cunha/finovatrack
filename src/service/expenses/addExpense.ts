/* eslint-disable import/prefer-default-export */
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'

export interface IAddExpenseData {
  id: string
  type: 'Essencial' | 'Não essencial' | 'Gasto Livre' | ''
  description: string
  value_primary_currency?: number
  value_secondary_currency?: number
  typeMoney?: string
  value: string
}

export type ExpenseFormData = {
  id?: string
  description: string
  value: string
  type: 'Essencial' | 'Não essencial' | 'Gasto Livre' | ''
  typeMoney?: string
}

export async function addExpenseService(
  { id, ...rest }: IAddExpenseData,
  idUser: string,
) {
  const myCollection = collection(db, 'users', idUser, 'expenses')
  const docRef = await addDoc(myCollection, rest)
  return docRef
}
