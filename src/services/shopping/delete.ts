// Serviço para deletar item da lista de compras no Firebase
import { db } from '../firebase'
import { doc, deleteDoc } from 'firebase/firestore'

const SHOPPING_COLLECTION = 'shoppingItems'

export async function deleteShoppingItem(
  userId: string,
  id: string
): Promise<void> {
  const itemRef = doc(db, 'users', userId, SHOPPING_COLLECTION, id)
  await deleteDoc(itemRef)
}
