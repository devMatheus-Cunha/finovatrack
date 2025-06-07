import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where
} from '@firebase/firestore'
import { db } from '../firebase'
import { IReportData } from './getReport'
import { ExpenseData } from '../expenses/getExpenses'

export async function saveReportService(data: IReportData, idUser: string) {
  const cleanedExpensesArray = data.data.map((expense: ExpenseData) => {
    const { subcategory, ...restOfExpense } = expense

    const cleanExpense: Partial<ExpenseData> = { ...restOfExpense }

    if (subcategory && subcategory.value) {
      cleanExpense.subcategory = subcategory
    }

    return cleanExpense
  })

  const cleanReportData = {
    ...data,
    data: cleanedExpensesArray
  }

  const myCollection = collection(db, 'users', idUser, 'reports')
  const querySnapshot = await getDocs(
    query(myCollection, where('period', '==', data.period))
  )

  if (!querySnapshot.empty) {
    const docRef = querySnapshot.docs[0].ref
    await updateDoc(docRef, cleanReportData)
    return docRef
  } else {
    const docRef = await addDoc(myCollection, cleanReportData)
    return docRef
  }
}
