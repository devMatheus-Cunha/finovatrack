import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore'
import { db } from '../firebase'
import { IReportData } from './getReport'

export async function saveReportService(data: IReportData, idUser: string) {
  const myCollection = collection(db, 'users', idUser, 'reports')
  const querySnapshot = await getDocs(
    query(myCollection, where('period', '==', data.period))
  )

  if (!querySnapshot.empty) {
    const docRef = querySnapshot.docs[0].ref
    await updateDoc(docRef, { ...data })
    return docRef
  }

  const docRef = await addDoc(myCollection, { ...data })
  return docRef
}
