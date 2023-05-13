'use client';

import { deleteDoc, doc } from '@firebase/firestore';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { db } from '../../../service/firebase';
import useFetchExpensesData, { ExpenseData } from '../useFetchExpensesData';

const useDeletedExpense = () => {
  const router = useParams();

  const { refetchExpensesData } = useFetchExpensesData();

  const fetchDeletedExpense = async (data: ExpenseData) => {
    const docRef = doc(db, 'users', router.id, 'expenses', data?.id || '');
    try {
      await deleteDoc(docRef);
    } catch (error) {
      throw new Error('mensagem de erro');
    }
  };

  const { mutate: deletedExpense } = useMutation(
    async (data: ExpenseData) => fetchDeletedExpense(data),
    {
      onSuccess: () => {
        refetchExpensesData();
        toast.success('Sucesso ao deletar gasto');
      },
      onError: () => {
        toast.error('Erro ao deletar gasto');
      },
    },
  );

  return {
    deletedExpense,
  };
};

export default useDeletedExpense;