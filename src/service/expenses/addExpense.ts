import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { ExpenseData } from './getExpenses'

export type ExpenseFormData = {
  id?: string
  description: string
  value: string
  type: 'Essencial' | 'Não essencial' | 'Gasto Livre' | ''
  typeMoney?: string
  payment?: string
}

export async function addExpenseService(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { id, ...rest }: ExpenseData,
  idUser: string
) {
  const myCollection = collection(db, 'users', idUser, 'expenses')
  const docRef = await addDoc(myCollection, rest)
  return docRef
}
