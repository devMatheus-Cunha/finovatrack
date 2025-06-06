import { useQuery } from '@tanstack/react-query'
import { getAllExpenses } from '@/services/expenses/getAllExpenses'
import { useUserId } from '@/hooks/globalStates'

export default function useFetchAllExpenses() {
  const { userId } = useUserId() as any

  const {
    data: allExpenses,
    isFetching,
    isFetched
  } = useQuery({
    queryKey: ['all_expenses', userId],
    queryFn: () => getAllExpenses(userId),
    enabled: !!userId
  })

  const isLoading = isFetching || !isFetched

  return {
    allExpenses: isLoading ? undefined : allExpenses,
    isLoading
  }
}
