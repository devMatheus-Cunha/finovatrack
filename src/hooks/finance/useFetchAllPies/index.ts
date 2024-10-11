import { useUserId } from '@/hooks/globalStates'
import { getAllPies } from '@/services/finance/getAllPies'
import { useQuery } from '@tanstack/react-query'

export interface IGetAllPies {
  id: number
  cash: number
  dividendDetails: {
    gained: number
    reinvested: number
    inCash: number
  }
  result: {
    investedValue: number
    value: number
    result: number
    resultCoef: number
  }
  progress: number
  status: null
}

export const useFetchAllPies = () => {
  const { userId } = useUserId()

  const {
    data: allPiesData,
    isFetching: isLoadingAllPiesData,
    status: statusAllPiesData,
    refetch: refetchAllPiesData
  } = useQuery({
    queryKey: ['all_pies_data', userId],
    queryFn: () => getAllPies(),
    enabled: !!userId
  })

  return {
    allPiesData: allPiesData ?? [],
    isLoadingAllPiesData,
    statusAllPiesData,
    refetchAllPiesData
  }
}

export default useFetchAllPies
