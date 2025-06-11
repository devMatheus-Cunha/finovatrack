import { deleteDoc, doc } from '@firebase/firestore'
import { db } from '../firebase'
import { ExpenseData } from './getExpenses'

// (A sua interface IDeleteEntryServiceProps não é usada na função,
// então a removi deste exemplo para maior clareza)

export async function deleteExpense(userId: string, expenseData: ExpenseData) {
  const expenseId = expenseData?.id
  if (!expenseId) {
    console.error('ID da despesa não foi fornecido. Impossível deletar.')
    throw new Error('ID da despesa inválido.')
  }

  if (!userId) {
    console.error('ID do usuário não foi fornecido. Impossível deletar.')
    throw new Error('ID do usuário inválido.')
  }

  const docRef = doc(db, 'users', userId, 'expenses', expenseId)
  await deleteDoc(docRef)
}
