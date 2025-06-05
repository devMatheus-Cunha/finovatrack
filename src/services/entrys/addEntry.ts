import { addDoc, collection } from '@firebase/firestore'
import { db } from '../firebase'

export interface IAddEntryServiceProps {
  value: number
}

export async function addEntryService(data: IAddEntryServiceProps, id: string) {
  const myCollection = collection(db, 'users', id, 'entrys')
  const docRef = await addDoc(myCollection, data)
  return docRef
}
