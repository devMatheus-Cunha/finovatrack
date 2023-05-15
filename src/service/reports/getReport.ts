/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { ExpenseData } from '../expenses/getExpenses';

export interface IReportData {
  data: ExpenseData[];
  totalInvested: string;
  totalEntrys: string;
  totalExpenses: string;
  totalExpenseEurToReal: string;
  period?: string;
  quatation: string;
}

export async function getReport(idUser: string, period: string) {
  const docsArray: IReportData[] = [];
  let querySnapshot;

  if (period) {
    querySnapshot = query(
      collection(db, 'users', String(idUser), 'reports'),
      where('period', '==', period),
    );
    const get = await getDocs(querySnapshot);
    get.forEach((doc) => {
      docsArray.push({ id: doc.id, ...doc.data() } as any);
    });
    return docsArray;
  }
  return [];
}
