/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

export interface IEntrysData {
  value: string
  id?: string
}

export async function getEntrys(idUser: string) {
  const querySnapshot = await getDocs(collection(db, 'users', idUser, 'entrys'))
  const docsArray: IEntrysData[] = []
  querySnapshot.forEach((doc) => {
    docsArray.push({ id: doc.id, ...doc.data() } as IEntrysData)
  })
  return docsArray
}
