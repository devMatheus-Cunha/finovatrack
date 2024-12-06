import { useQuery } from '@tanstack/react-query'
import { getFinancialPlanningYear } from '@/services/finance/getFinancialPlanningYear'
import { useUserData } from '@/hooks/globalStates'

export const useFetchFinancialPlaningYear = () => {
  const { userData } = useUserData()

  const {
    data: financialPlanningYear,
    isLoading: isLoadingFinancialPlanningYear,
    status: statusFinancialPlanningYear,
    refetch: refetchFinancialPlanningYear
  } = useQuery({
    queryKey: ['financial_planning_year_data', userData.id],
    queryFn: async () => await getFinancialPlanningYear(userData.id),
    enabled: !!userData.id && userData.admin
  })

  return {
    financialPlanningYear,
    isLoadingFinancialPlanningYear,
    statusFinancialPlanningYear,
    refetchFinancialPlanningYear
  }
}

export default useFetchFinancialPlaningYear
