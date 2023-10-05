/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getInvestmentsTotalGoal } from '@/service/investments/getInvestmentsTotalGoal'

export const useFetchInvestmentsTotalGoal = () => {
  const router = useParams()

  const {
    data: investmentsAllGoalsData,
    isLoading: isLoadingInvestmentsAllGoalsData,
    status: statusInvestmentsAllGoalsData,
    refetch: refetchInvestmentsAllGoalsData,
  } = useQuery({
    queryKey: ['investments_data', router.id],
    queryFn: async () => await getInvestmentsTotalGoal(router.id),
    keepPreviousData: true,
    enabled: !!router.id,
  })

  return {
    investmentsAllGoalsData,
    isLoadingInvestmentsAllGoalsData,
    statusInvestmentsAllGoalsData,
    refetchInvestmentsAllGoalsData,
  }
}

export default useFetchInvestmentsTotalGoal
