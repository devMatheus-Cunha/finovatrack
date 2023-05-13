/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-return-await */
import { collection, getDocs } from 'firebase/firestore';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { db } from '../../../../service/firebase';

export interface IEntrysData {
  value: string;
  id?: string;
}

export const useFetchEntrysData = () => {
  const router = useParams();

  const fetchEntrysData = async () => {
    const querySnapshot = await getDocs(collection(db, 'users', router.id, 'entrys'));
    const docsArray: IEntrysData[] = [];
    querySnapshot.forEach((doc) => {
      docsArray.push({ id: doc.id, ...doc.data() } as any);
    });
    return docsArray;
  };
  const {
    data: entrysData,
    isLoading: isLoadingEntrysData,
    status: statusEntrysData,
    refetch: refetchEntrysData,
  } = useQuery(['entrys_data', router.id], async () => await fetchEntrysData(), {
    enabled: !!router.id,
  });

  return {
    entrysData,
    isLoadingEntrysData,
    statusEntrysData,
    refetchEntrysData,
  };
};

export default useFetchEntrysData;
