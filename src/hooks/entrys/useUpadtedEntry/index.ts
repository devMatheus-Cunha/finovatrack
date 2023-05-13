/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { doc, updateDoc } from '@firebase/firestore';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { useFetchEntrysData } from '../useFetchEntrysData';
import { db } from '../../../service/firebase';

const useUpadtedEntry = () => {
  const router = useParams();

  const { refetchEntrysData } = useFetchEntrysData();

  const fetchUpadtedExpense = async (data: {
    id?: string;
    data: Record<string, any>;
  }) => {
    const docRef = doc(db, 'users', router.id, 'entrys', data?.id || '');
    try {
      await updateDoc(docRef, data.data);
    } catch (error) {
      throw new Error('mensagem de erro');
    }
  };

  const { mutate: upadtedEntry } = useMutation(fetchUpadtedExpense, {
    onSuccess: () => {
      refetchEntrysData();
      toast.success('Sucesso ao editar entrada');
    },
    onError: () => {
      toast.error('Erro ao editar entrada');
    },
  });

  return {
    upadtedEntry,
  };
};

export default useUpadtedEntry;
