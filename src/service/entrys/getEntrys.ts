/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { IEntrysData } from '@/hooks/entrys/useFetchEntrysData'

export async function getEntrys(idUser: string) {
  const querySnapshot = await getDocs(collection(db, 'users', idUser, 'entrys'))
  const docsArray: IEntrysData[] = []
  querySnapshot.forEach((doc) => {
    docsArray.push({ id: doc.id, ...doc.data() } as IEntrysData)
  })
  return docsArray
}
