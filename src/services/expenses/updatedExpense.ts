import { doc, updateDoc, deleteField, FieldValue } from '@firebase/firestore'
import { db } from '../firebase'
import { ExpenseData } from './getExpenses'

export async function updatedExpenseService(data: ExpenseData, idUser: string) {
  const { id, subcategory, ...rest } = data
  const docRef = doc(db, 'users', idUser, 'expenses', id)

  const updatePayload: { [key: string]: any | FieldValue } = {
    ...rest
  }

  if (!subcategory || subcategory.value === 'Nenhuma') {
    updatePayload.subcategory = deleteField()
  } else {
    updatePayload.subcategory = subcategory
  }

  // Executa a atualização no Firestore
  await updateDoc(docRef, updatePayload)
}
