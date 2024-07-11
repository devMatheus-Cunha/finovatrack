import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { IEntrysData } from '@/hooks/entrys/useFetchEntrysData'

export async function updatedEntry(idUser: string, data: IEntrysData) {
  const docRef = doc(db, 'users', idUser, 'entrys', data.id || '')
  await updateDoc(docRef, { data })
}
