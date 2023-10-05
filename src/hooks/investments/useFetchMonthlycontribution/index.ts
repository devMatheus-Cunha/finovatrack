/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getMonthlycontributionService } from '@/service/investments/getMonthlycontribution'

export const useFetchMonthlycontribution = () => {
  const router = useParams()

  const {
    data: monthlycontributionData,
    isLoading: isLoadingMonthlycontribution,
    status: statusMonthlycontribution,
    refetch: refetchMonthlycontribution,
  } = useQuery({
    queryKey: ['monthly_contribution_data', router.id],
    queryFn: async () => await getMonthlycontributionService(router.id),
    keepPreviousData: true,
    enabled: !!router.id,
  })

  return {
    monthlycontributionData,
    isLoadingMonthlycontribution,
    statusMonthlycontribution,
    refetchMonthlycontribution,
  }
}

export default useFetchMonthlycontribution
