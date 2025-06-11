import { doc, updateDoc, deleteField, FieldValue } from '@firebase/firestore'
import { db } from '../firebase'
import { ExpenseData } from './getExpenses'

/**
 * Atualiza uma despesa existente no Firestore.
 */
export async function updatedExpenseService(
  expenseData: ExpenseData,
  userId: string
): Promise<void> {
  if (!userId || !expenseData.id) {
    throw new Error('ID do usuário ou da despesa é inválido.')
  }

  const { id, ...dataToUpdate } = expenseData
  const docRef = doc(db, 'users', userId, 'expenses', id)

  const updatePayload: { [key: string]: any | FieldValue } = {
    ...dataToUpdate
  }

  if (
    !dataToUpdate.subcategory ||
    dataToUpdate.subcategory.value === 'Nenhuma'
  ) {
    updatePayload.subcategory = deleteField()
  }

  await updateDoc(docRef, updatePayload)
}
