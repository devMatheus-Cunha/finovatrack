/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import {
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { IEntrysData } from './getEntrys';

export async function updatedEntry(idUser: string, data: IEntrysData) {
  const docRef = doc(db, 'users', idUser, 'entrys', data.id || '');
  await updateDoc(docRef, { data });
}
