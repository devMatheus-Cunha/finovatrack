/* eslint-disable import/prefer-default-export */
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

export interface IAddExpenseData {
  id?: string;
  type: 'Essencial' | 'Não essencial' | 'Gasto Livre' | ''
  description: string;
  euro_value?: number;
  real_value?: number;
  typeMoney?: 'Real' | 'Euro' | ''
  value: string
}

export type ExpenseFormData = {
  id?: string;
  description: string;
  value: string;
  type: 'Essencial' | 'Não essencial' | 'Gasto Livre' | ''
  typeMoney?: 'Real' | 'Euro' | ''
};

export async function addExpenseService(data: IAddExpenseData, id: string) {
  const myCollection = collection(db, 'users', id, 'expenses');
  const docRef = await addDoc(myCollection, data);
  return docRef;
}
