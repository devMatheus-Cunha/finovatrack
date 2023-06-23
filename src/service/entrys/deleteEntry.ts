/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

export interface IDeleteEntryServiceProps {
  value: string
  id?: string
}

export async function deleteEntry(itemId = '', idUser: string) {
  const docRef = doc(db, 'users', idUser, 'entrys', itemId)
  await deleteDoc(docRef)
}
