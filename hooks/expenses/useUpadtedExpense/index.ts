/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '@/service/firebase';
import { doc, updateDoc } from '@firebase/firestore';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useFetchExpensesData } from '../useFetchExpensesData';

const useUpadtedExpense = (id?: string) => {
  const { refetchExpensesData } = useFetchExpensesData(id);

  const fetchUpadtedExpense = async (data: {
    id?: string;
    data: Record<string, any>;
  }) => {
    const docRef = doc(db, 'users', String(id), 'expenses', data?.id || '');
    try {
      await updateDoc(docRef, data.data);
    } catch (error) {
      throw new Error('mensagem de erro');
    }
  };

  const { mutate: upadtedExpense } = useMutation(fetchUpadtedExpense, {
    onSuccess: () => {
      refetchExpensesData();
      toast.success('Sucesso ao editar gasto');
    },
    onError: () => {
      toast.error('Erro ao editar gasto');
    },
  });

  return {
    upadtedExpense,
  };
};

export default useUpadtedExpense;
