import { collection, addDoc } from 'firebase/firestore';

import { useMutation } from '@tanstack/react-query';
import { db } from '@/service/firebase';
import { toast } from 'react-toastify';
import { useFetchExpensesData } from '../useFetchExpensesData';

interface IData {
  description: string;
  real_value: number;
  euro_value: number;
  type?: string;
  typeMoney: string;
}

const useAddExpense = (id?: string) => {
  const { refetchExpensesData } = useFetchExpensesData(id);

  const addDocument = async (data: IData) => {
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
