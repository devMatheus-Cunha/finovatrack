import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getExpenses } from '@/services/expenses/getExpenses'
import { useUserId } from '@/hooks/globalStates'

export type Filter =
  | 'Essencial'
  | 'Não essencial'
  | 'Gasto Livre'
  | 'Clear'
  | ''

export const useFetchExpensesData = () => {
  const { userId } = useUserId() as any
  const [filter, setFilter] = useState<Filter>('')

  const {
    data: expensesData,
    isLoading: isLoadingExpensesData,
    status: statusExpensesData,
    refetch: refetchExpensesData
  } = useQuery({
    queryKey: ['expenses_data', filter, userId],
    queryFn: async () => await getExpenses(userId, filter),
    enabled: !!userId
  })

  return {
    expensesData,
    isLoadingExpensesData,
    statusExpensesData,
    refetchExpensesData,
    setFilter,
    filter
  }
}

export default useFetchExpensesData
