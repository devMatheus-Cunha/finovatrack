import { collection, getDocs, orderBy, query, where } from '@firebase/firestore'
import { db } from '../firebase'

export interface SubcategoryData {
  value: string
  label: string
  category: string
}

export interface ExpenseData {
  id: string
  category: string
  subcategory?: SubcategoryData
  description: string
  value_primary_currency: number
  value_secondary_currency?: number
  typeMoney?: string
  value: string
  payment: 'Pago' | 'A Pagar' | ''
}
export async function getExpenses(idUser: string, filter: any) {
  const docsArray: ExpenseData[] = []
  let queryRef = collection(db, 'users', idUser, 'expenses') as any
  if (filter.value !== '') {
    if (filter.type === 'category') {
      queryRef = query(queryRef, where('category', '==', filter.value))
    }
  }

  queryRef = query(queryRef, orderBy(filter.type || 'category'))

  const querySnapshot = await getDocs(queryRef)

  querySnapshot.forEach((doc) => {
    docsArray.push({ id: doc.id, ...(doc.data() as any) } as any)
  })
  console.log(docsArray)
  return docsArray
}
