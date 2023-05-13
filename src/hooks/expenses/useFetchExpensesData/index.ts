/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import {
  collection, getDocs, query, where,
} from 'firebase/firestore';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { db } from '../../../../service/firebase';

export interface ExpenseData {
  id: string;
  type: 'Essencial' | 'Não essencial' | 'Gasto Livre' | ''
  description: string;
  euro_value: number;
  real_value: number;
  typeMoney?: 'Real' | 'Euro' | ''
  value: string
}

export type Filter = 'Essencial' | 'Não essencial' | 'Gasto Livre' | ''

export const useFetchExpensesData = () => {
  const router = useParams();

  const [filter, setFilter] = useState<Filter>('');

  const fetchExpensesData = async (value: string) => {
    const docsArray: ExpenseData[] = [];
    let querySnapshot;

    if (value) {
      querySnapshot = query(
        collection(db, 'users', router.id, 'expenses'),
        where('type', '==', value),
      );
    } else {
      querySnapshot = collection(db, 'users', router.id, 'expenses');
    }

    const get = await getDocs(querySnapshot);

    get.forEach((doc) => {
      docsArray.push({ id: doc.id, ...doc.data() } as any);
    });

    return docsArray;
  };

  const {
    data: expensesData,
    isLoading: isLoadingExpensesData,
    status: statusExpensesData,
    refetch: refetchExpensesData,
  } = useQuery({
    queryKey: ['expenses_data', filter, router.id],
    queryFn: () => fetchExpensesData(filter),
    keepPreviousData: true,
    enabled: !!router.id,
  });

  return {
    expensesData,
    isLoadingExpensesData,
    statusExpensesData,
    refetchExpensesData,
    setFilter,
    filter,
  };
};

export default useFetchExpensesData;
