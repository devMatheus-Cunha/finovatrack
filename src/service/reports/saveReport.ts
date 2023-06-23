/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../firebase'
import { IReportData } from './getReport'

export async function saveReportService(data: IReportData, idUser: string) {
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = String(today.getFullYear())
  const format = `${month}/${year}`

  const myCollection = collection(db, 'users', idUser, 'reports')
  const querySnapshot = await getDocs(
    query(myCollection, where('period', '==', format)),
  )

  if (!querySnapshot.empty) {
    const docRef = querySnapshot.docs[0].ref
    await updateDoc(docRef, { ...data, period: format })
    return docRef
  }

  const docRef = await addDoc(myCollection, { ...data, period: format })
  return docRef
}
