/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { Filter } from '@/hooks/expenses/useFetchExpensesData';
import { db } from '../firebase';

export interface ExpenseData {
  id: string;
  type: 'Essencial' | 'Não essencial' | 'Gasto Livre' | ''
  description: string;
  value_primary_currency?: number;
  value_secondary_currency?: number;
  typeMoney?: 'Real' | 'Euro' | ''
  value: string
}

export async function getExpenses(idUser: string, filter: Filter) {
  const docsArray: ExpenseData[] = [];
  let querySnapshot;

  if (filter) {
    querySnapshot = query(
      collection(db, 'users', idUser, 'expenses'),
      where('type', '==', filter),
    );
  } else {
    querySnapshot = collection(db, 'users', idUser, 'expenses');
  }

  const get = await getDocs(querySnapshot);

  get.forEach((doc) => {
    docsArray.push({ id: doc.id, ...doc.data() } as any);
  });

  return docsArray;
}
