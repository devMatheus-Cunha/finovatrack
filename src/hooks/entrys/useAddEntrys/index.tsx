'use client';

import { collection, addDoc } from 'firebase/firestore';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { db } from '../../../../service/firebase';
import { useFetchEntrysData } from '../useFetchEntrysData';

interface IData {
  value: string;
}

export default function useAddEntrys() {
  const router = useParams();

  const { refetchEntrysData } = useFetchEntrysData();
  const addDocument = async (data: IData) => {
    try {
      const myCollection = collection(db, 'users', String(router.id), 'entrys');
      const docRef = await addDoc(myCollection, data);
      return docRef;
    } catch (error) {
      throw new Error('mensagem de erro');
    }
  };

  const {
    mutate: addEntrys,
    isLoading: isLoadingAddEntrys,
    status: statusAddEntrys,
  } = useMutation(addDocument, {
    onSuccess: () => {
      refetchEntrysData();
      toast.success('Sucesso ao adicionar entrada');
    },
    onError: () => {
      toast.error('Erro ao adicionar entrada');
    },
  });

  return { addEntrys, isLoadingAddEntrys, statusAddEntrys };
}
