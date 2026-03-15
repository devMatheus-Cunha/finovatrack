import { deleteDoc, doc } from '@firebase/firestore'
import { db } from '../firebase'
import { MarketItemData } from './getMarketItems'

export async function deleteMarketItem(
  item: MarketItemData,
  userId: string
): Promise<void> {
  if (!userId || !item?.id) {
    throw new Error('ID do usuário ou do item é inválido.')
  }

  const docRef = doc(db, 'users', userId, 'market', item.id)
  await deleteDoc(docRef)
}
