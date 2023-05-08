/* eslint-disable no-useless-catch */
import {
  collection, addDoc, getDocs, query, updateDoc, where,
} from 'firebase/firestore';

import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { db } from '@/service/firebase';
import { toast } from 'react-toastify';
import { ExpenseData } from '@/hooks/expenses/useFetchExpensesData';

export interface IReportData {
  data: ExpenseData[];
  totalInvested: string;
  totalEntrys: string;
  totalExpenses: string;
  period?: string;
  quatation: string;
}

interface IUseSaveReportExportProps {
   saveReport: UseMutateFunction<void, unknown, IReportData, unknown>,
    isLoadingSaveReport: boolean,
    statusSaveReport: 'error' | 'idle' | 'loading' | 'success'
}

export default function useSaveReport(id?: string): IUseSaveReportExportProps {
  const saveReportData = async ({ data, ...rest }: IReportData) => {
    try {
      const today = new Date();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = String(today.getFullYear());
      const format = `${month}/${year}`;

      const myCollection = collection(db, 'users', String(id), 'reports');
      const querySnapshot = await getDocs(query(myCollection, where('period', '==', format)));

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, { data, period: format, ...rest });
        return docRef;
      }

      const docRef = await addDoc(myCollection, { data, period: format, ...rest });
      return docRef;
    } catch (error) {
      throw error;
    }
  };

  const {
    mutate: saveReport,
    isLoading: isLoadingSaveReport,
    status: statusSaveReport,
  } = useMutation(async ({ data, ...rest }: IReportData) => {
    await saveReportData({ data, ...rest });
  }, {
    onSuccess: () => {
      toast.success('Sucesso ao salvar relatório');
    },
    onError: () => {
      toast.error('Erro ao salvar relatório');
    },
  });

  return {
    saveReport,
    isLoadingSaveReport,
    statusSaveReport,
  };
}
