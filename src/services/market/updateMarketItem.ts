import { doc, updateDoc } from '@firebase/firestore'
import { db } from '../firebase'
import { MarketItemData } from './getMarketItems'

export async function updateMarketItem(
  item: MarketItemData,
  userId: string
): Promise<void> {
  if (!userId || !item?.id) {
    throw new Error('ID do usuário ou do item é inválido.')
  }

  const { id, ...rest } = item
  const docRef = doc(db, 'users', userId, 'market', id)
  await updateDoc(docRef, rest)
}
