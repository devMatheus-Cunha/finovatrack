/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { Filter } from '@/hooks/expenses/useFetchExpensesData'
import { db } from '../firebase'

export interface ExpenseData {
  id: string
  type: 'Essencial' | 'Não essencial' | 'Gasto Livre' | ''
  category?: string
  description: string
  value_primary_currency?: number
  value_secondary_currency?: number
  typeMoney?: string
  value: string
  payment: 'Pago' | 'A Pagar' | ''
}
export async function getExpenses(idUser: string, filter: any) {
  const docsArray: ExpenseData[] = []
  let queryRef = collection(db, 'users', idUser, 'expenses') as any
  if (filter.value !== '') {
    console.log(filter)
    if (filter.type === 'type') {
      queryRef = query(queryRef, where('type', '==', filter.value))
    }
    if (filter.type === 'category') {
      queryRef = query(queryRef, where('category', '==', filter.value))
    }
  }

  queryRef = query(queryRef, orderBy(filter.type || 'type'))

  const querySnapshot = await getDocs(queryRef)

  querySnapshot.forEach((doc) => {
    docsArray.push({ id: doc.id, ...(doc.data() as any) } as any)
  })

  return docsArray
}
