import { collection, doc, setDoc } from '@firebase/firestore'
import { db } from '../firebase'
import { MarketItemData } from './getMarketItems'

export async function addMarketItem(
  input: Omit<MarketItemData, 'id'>,
  userId: string
): Promise<MarketItemData> {
  if (!userId) {
    throw new Error('ID do usuário é inválido.')
  }

  const collectionRef = collection(db, 'users', userId, 'market')
  const newDocRef = doc(collectionRef)

  const dataToSave: MarketItemData = {
    ...input,
    id: newDocRef.id
  }

  await setDoc(newDocRef, dataToSave)
  return dataToSave
}
