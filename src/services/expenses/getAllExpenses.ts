import { collection, getDocs } from '@firebase/firestore'
import { db } from '../firebase'
import { ExpenseData } from './getExpenses'

export async function getAllExpenses(idUser: string): Promise<ExpenseData[]> {
  const docsArray: ExpenseData[] = []
  const queryRef = collection(db, 'users', idUser, 'expenses')
  const querySnapshot = await getDocs(queryRef)
  querySnapshot.forEach((doc) => {
    docsArray.push({ id: doc.id, ...(doc.data() as any) } as any)
  })
  return docsArray
}
