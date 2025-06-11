import { collection, doc, setDoc } from '@firebase/firestore'
import { db } from '../firebase'
import { ExpenseData } from './getExpenses'

/**
 * Adiciona uma nova despesa e garante que o ID do documento seja salvo
 * como um campo ('id') dentro do próprio documento.
 */
export async function addExpenseService(
  expenseInput: Omit<ExpenseData, 'id'>, // Os dados da nova despesa, sem o id
  userId: string
): Promise<ExpenseData> {
  // Retorna a despesa completa
  if (!userId) {
    throw new Error('ID do usuário é inválido.')
  }

  // 1. Crie uma referência para a coleção de despesas do usuário.
  const expenseCollectionRef = collection(db, 'users', userId, 'expenses')

  // 2. Crie uma referência para um NOVO documento. Isso gera um ID automaticamente ANTES de salvar.
  const newDocRef = doc(expenseCollectionRef)

  // 3. Prepare o objeto de dados final, incluindo o ID gerado como um campo.
  const dataToSubmit: ExpenseData = {
    ...expenseInput,
    id: newDocRef.id
  }

  // 4. Use setDoc para salvar o objeto completo na referência que você criou.
  await setDoc(newDocRef, dataToSubmit)

  // 5. Retorne os dados completos para a sua aplicação poder usar imediatamente.
  return dataToSubmit
}
