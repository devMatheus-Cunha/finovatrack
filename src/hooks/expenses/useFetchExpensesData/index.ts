/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getExpenses } from '@/service/expenses/getExpenses';

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

  const {
    data: expensesData,
    isLoading: isLoadingExpensesData,
    status: statusExpensesData,
    refetch: refetchExpensesData,
  } = useQuery({
    queryKey: ['expenses_data', filter, router.id],
    queryFn: () => getExpenses(router.id, filter),
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
