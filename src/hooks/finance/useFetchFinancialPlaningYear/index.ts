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
    data: financialPlanningYear,
    isLoading: isLoadingFinancialPlanningYear,
    status: statusFinancialPlanningYear,
    refetch: refetchFinancialPlanningYear
  } = useQuery({
    queryKey: ['financial_planning_year_data', userData.id],
    queryFn: async () => await getFinancialPlanningYear(userData.id),
    enabled: !!userData.id && userData.admin
  })
  const currentYear = new Date().getFullYear()

  const financialPlanningData = useMemo<
    IFinancialPlanningProps | undefined
  >(() => {
    return financialPlanningYear?.find((fp) => Number(fp.year) === currentYear)
  }, [currentYear, financialPlanningYear])

  return {
    financialPlanningYear,
    financialPlanningActualYear: financialPlanningData,
    isLoadingFinancialPlanningYear,
    statusFinancialPlanningYear,
    refetchFinancialPlanningYear
  }
}

export default useFetchFinancialPlaningYear
