import { useQuery } from '@tanstack/react-query'
import { getFinancialPlanningYear } from '@/services/finance/getFinancialPlanningYear'
import { useUserId } from '@/hooks/globalStates'

export const useFetchFinancialPlaningYear = () => {
  const { userId } = useUserId() as any

  const {
    data: financialPlanningYear,
    isLoading: isLoadingFinancialPlanningYear,
    status: statusFinancialPlanningYear,
    refetch: refetchFinancialPlanningYear
  } = useQuery({
    queryKey: ['financial_planning_year_data', userId],
    queryFn: async () => await getFinancialPlanningYear(userId),
    enabled: !!userId
  })

  return {
    financialPlanningYear,
    isLoadingFinancialPlanningYear,
    statusFinancialPlanningYear,
    refetchFinancialPlanningYear
  }
}

export default useFetchFinancialPlaningYear
