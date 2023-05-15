/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import {
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

export async function updatedExpenseService(idUser: string, data: Record<string, any>) {
  const docRef = doc(db, 'users', idUser, 'expenses', data?.id || '');
  await updateDoc(docRef, data);
}
