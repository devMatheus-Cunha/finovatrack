import { useQuery } from '@tanstack/react-query'
import {
  getFinancialPlanningYear,
  IFinancialPlanningProps
} from '@/services/finance/getFinancialPlanningYear'
import { useUserData } from '@/hooks/globalStates'
import { useMemo } from 'react'

export const useFetchFinancialPlaningYear = () => {
  const { userData } = useUserData()

  const {
    data: financialPlanningYearRequestRaw,
    isFetching,
    isFetched,
    status: statusFinancialPlanningYear,
    refetch: refetchFinancialPlanningYear
  } = useQuery({
    queryKey: ['financial_planning_year_data', userData.id],
    queryFn: async () => await getFinancialPlanningYear(userData.id),
    enabled: !!userData.id,
    placeholderData: (previous) => previous // permite para qualquer usuário logado
  })
  const currentYear = new Date().getFullYear()

  // Só libera os dados após o fetching acabar
  const isLoading = isFetching || !isFetched
  const financialPlanningYearRequest = isLoading
    ? undefined
    : financialPlanningYearRequestRaw

  const financialPlanningData = useMemo<
    IFinancialPlanningProps | undefined
  >(() => {
    return financialPlanningYearRequest?.find(
      (fp) => Number(fp.year) === currentYear
    )
  }, [currentYear, financialPlanningYearRequest])

  return {
    financialPlanningYear: financialPlanningYearRequest,
    financialPlanningActualYear: financialPlanningData,
    isLoadingFinancialPlanningYear: isLoading,
    statusFinancialPlanningYear,
    refetchFinancialPlanningYear
  }
}

export default useFetchFinancialPlaningYear
