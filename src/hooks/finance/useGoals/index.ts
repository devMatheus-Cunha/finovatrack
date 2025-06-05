import { useQuery } from '@tanstack/react-query'
import { getGoals } from '@/services/finance/goals'
import { useUserData } from '@/hooks/globalStates'

export const useGoals = () => {
 const { userData } = useUserData()

 const {
  data: goal,
  isFetching,
  isFetched,
  status: statusGoals,
  refetch: refetchGoals
 } = useQuery({
  queryKey: ['goals_data', userData.id],
  queryFn: async () => await getGoals(userData.id),
  enabled: !!userData.id
 })

 // Só libera os dados após o fetching acabar
 const isLoading = isFetching || !isFetched

 return {
  goal: isLoading ? undefined : goal,
  isLoadingGoals: isLoading,
  statusGoals,
  refetchGoals
 }
}

export default useGoals