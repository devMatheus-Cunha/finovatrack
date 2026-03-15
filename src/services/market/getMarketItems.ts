import { collection, getDocs, orderBy, query } from '@firebase/firestore'
import { db } from '../firebase'

export interface MarketItemData {
  id: string
  name: string
  qty: number
  measure?: string
  lastPrice: number
  currentPrice: number
  store: string
  bought: boolean
  category: string
}

export async function getMarketItems(userId: string) {
  if (!userId) {
    throw new Error('ID do usuário é inválido.')
  }

  const docsArray: MarketItemData[] = []
  const collectionRef = collection(db, 'users', userId, 'market')
  const q = query(collectionRef, orderBy('name'))

  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    docsArray.push({ id: doc.id, ...(doc.data() as any) } as any)
  })

  return docsArray
}
