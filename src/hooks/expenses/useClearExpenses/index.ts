/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { getDocs, collection, deleteDoc } from '@firebase/firestore';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify'; import { useParams } from 'next/navigation';
import { db } from '../../../service/firebase';
import { useFetchExpensesData } from '../useFetchExpensesData';

const useClearExpenses = () => {
  const router = useParams();

  const { refetchExpensesData } = useFetchExpensesData();

  const clearExpenses = async () => {
    const querySnapshot = await getDocs(collection(db, 'users', router.id, 'expenses'));
    const documents = querySnapshot.docs;

    const promises: any[] = [];
    documents.forEach((doc) => {
      promises.push(deleteDoc(doc.ref));
    });

    await Promise.all(promises);
  };

  const { mutate: clearExpensesData } = useMutation(clearExpenses, {
    onSuccess: () => {
      refetchExpensesData();
      toast.success('Sucesso ao limpar gastos');
    },
    onError: () => {
      toast.error('Erro ao limpar gastos');
    },
  });
  return {
    clearExpensesData,
  };
};

export default useClearExpenses;
