/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import {
  collection, getDocs, query, where,
} from 'firebase/firestore';

import {
  useQuery, QueryObserverResult, RefetchOptions, RefetchQueryFilters,
} from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '../../../../service/firebase';
import { IReportData } from '../useSaveReport';

interface UseFetchReportsDataReturnType {
  reportData: IReportData[] | undefined,
  isLoadingReportData: boolean,
  statusReportData: 'idle' | 'loading' | 'error' | 'success',
  refetchReportData: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<IReportData[], unknown>>,
  setPeriod: React.Dispatch<React.SetStateAction<string>>
}

export default function useFetchReportsData(): UseFetchReportsDataReturnType {
  const [period, setPeriod] = useState('');
  const router = useParams();

  const fetchExpensesData = async (value: string) => {
    const docsArray: IReportData[] = [];
    let querySnapshot;

    if (value) {
      querySnapshot = query(
        collection(db, 'users', String(router.id), 'reports'),
        where('period', '==', value),
      );
      const get = await getDocs(querySnapshot);
      get.forEach((doc) => {
        docsArray.push({ id: doc.id, ...doc.data() } as any);
      });
      return docsArray;
    }
    return [];
  };

  const {
    data: reportData,
    isLoading: isLoadingReportData,
    status: statusReportData,
    refetch: refetchReportData,
  } = useQuery<IReportData[], unknown>({
    queryKey: ['report_data', period, router.id],
    queryFn: () => fetchExpensesData(period),
    keepPreviousData: true,
    enabled: !!period && !!router.id,
  });

  return {
    reportData,
    isLoadingReportData,
    statusReportData,
    refetchReportData,
    setPeriod,
  };
}
