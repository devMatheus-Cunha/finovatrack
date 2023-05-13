'use client';

import { deleteDoc, doc } from '@firebase/firestore';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import useFetchEntrysData from '../useFetchEntrysData';
import { db } from '../../../service/firebase';

interface IData {
  value: string;
  id?: string;
}

const useDeletedEntry = () => {
  const router = useParams();

  const { refetchEntrysData } = useFetchEntrysData();

  const fetchDeletedEntry = async (data: { data: IData }) => {
    const docRef = doc(db, 'users', router.id, 'entrys', data.data.id || '');
    try {
      await deleteDoc(docRef);
    } catch (error) {
      throw new Error('mensagem de erro');
    }
  };

  const { mutate: deletedEntry } = useMutation(
    async ({ data }: { data: IData }) => fetchDeletedEntry({ data }),
    {
      onSuccess: () => {
        refetchEntrysData();
        toast.success('Sucesso ao deletar entrada');
      },
      onError: () => {
        toast.error('Erro ao deletar entrada');
      },
    },
  );

  return {
    deletedEntry,
  };
};

export default useDeletedEntry;
