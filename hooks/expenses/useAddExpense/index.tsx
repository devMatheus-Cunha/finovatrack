import { collection, addDoc } from 'firebase/firestore';

import { useMutation } from '@tanstack/react-query';
import { db } from '@/service/firebase';
import { toast } from 'react-toastify';
import { useFetchExpensesData } from '../useFetchExpensesData';

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

const useAddExpense = (id?: string) => {
  const { refetchExpensesData } = useFetchExpensesData(id);

  const addDocument = async (data: IAddExpenseData) => {
    try {
      const myCollection = collection(db, 'users', String(id), 'expenses');
      const docRef = await addDoc(myCollection, data);
      return docRef;
    } catch (error) {
      throw new Error('mensagem de erro');
    }
  };

  const {
    mutate: addExpense,
    isLoading: isLoadingAddExpense,
    status: statusAddExpense,
  } = useMutation(addDocument, {
    onSuccess: () => {
      refetchExpensesData();
      toast.success('Sucesso ao adicionar gasto');
    },
    onError: () => {
      toast.error('Erro ao adicionar gasto');
    },
  });

  return { addExpense, isLoadingAddExpense, statusAddExpense };
};

export default useAddExpense;
