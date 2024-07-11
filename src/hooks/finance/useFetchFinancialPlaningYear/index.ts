import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getFinancialPlanningYear } from '@/services/finance/getFinancialPlanningYear'

export const useFetchFinancialPlaningYear = () => {
  const router = useParams()

  const {
    data: financialPlanningYear,
    isLoading: isLoadingFinancialPlanningYear,
    status: statusFinancialPlanningYear,
    refetch: refetchFinancialPlanningYear
  } = useQuery(
    ['financial_planning_year_data', router.id],
    async () => await getFinancialPlanningYear(router.id),
    {
      enabled: !!router.id
    }
  )

  return {
    financialPlanningYear,
    isLoadingFinancialPlanningYear,
    statusFinancialPlanningYear,
    refetchFinancialPlanningYear
  }
}

export default useFetchFinancialPlaningYear
