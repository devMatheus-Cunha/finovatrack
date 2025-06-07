import { addDoc, collection } from '@firebase/firestore'
import { db } from '../firebase'
import { ExpenseData } from './getExpenses'

export async function addExpenseService(
  { id, ...rest }: ExpenseData,
  idUser: string
) {
  const dataToSubmit = { ...rest }

  if (!dataToSubmit.subcategory) {
    delete dataToSubmit.subcategory
  }

  const myCollection = collection(db, 'users', idUser, 'expenses')

  const docRef = await addDoc(myCollection, dataToSubmit)
  return docRef
}
