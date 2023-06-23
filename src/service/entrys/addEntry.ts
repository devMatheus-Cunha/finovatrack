/* eslint-disable import/prefer-default-export */
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'

export interface IAddEntryServiceProps {
  value: string
}

export async function addEntryService(data: IAddEntryServiceProps, id: string) {
  const myCollection = collection(db, 'users', id, 'entrys')
  const docRef = await addDoc(myCollection, data)
  return docRef
}
