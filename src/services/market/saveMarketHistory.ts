import { doc, setDoc, serverTimestamp } from '@firebase/firestore'
import { db } from '../firebase'

export async function saveMarketHistory(
  input: any,
  userId: string
): Promise<void> {
  if (!userId) throw new Error('ID do usuário é inválido.')
  const now = new Date()
  const month = now.getMonth() + 1
  const year = now.getFullYear()
  const docId = `${year}-${String(month).padStart(2, '0')}`
  const historyRef = doc(db, 'users', userId, 'market_history', docId)
  const historyData = {
    id: docId,
    lastUpdate: serverTimestamp(),
    month,
    year,
    items: input.items,
    budget: input.totals.budget,
    totalEstimated: Number(input.totals.estimated).toFixed(2),
    totalSpent: Number(input.totals.boughtTotal.toFixed(2)),
    balance: Number(input.totals.remaining.toFixed(2)),
    status: input.totals.remaining < 0 ? 'OVER_BUDGET' : 'WITHIN_BUDGET'
  }
  await setDoc(historyRef, historyData)
}
