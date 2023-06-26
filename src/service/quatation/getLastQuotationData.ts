/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import { doc, getDoc } from '@firebase/firestore'
import { db } from '../firebase'

export type CurrentQuotation = {
  current_quotation: number
  date: string
  result_calculation: number
  status: boolean
}

export async function getLastQuotationData(idUser: string) {
  const docRef = doc(db, 'users', idUser, 'quotation', 'last_quotation_data')
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data = docSnap.data()
    return data as CurrentQuotation
  }
  return undefined
}
