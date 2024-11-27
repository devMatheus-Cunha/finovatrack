import { useUserId } from '@/hooks/globalStates'
import {
  getAllPies,
  getPieData,
  updateOrCreateDoc
} from '@/services/finance/getAllPies'
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
    priceAvgInvestedValue: number
    priceAvgResult: number
    priceAvgResultCoef: number
    priceAvgValue: number
  }
  progress: number
  status: null
}

export const useFetchAllPies = () => {
  const { userId } = useUserId()

  const {
    data: allPiesData,
    isFetching: isLoadingAllPies,
    refetch
  } = useQuery({
    queryKey: ['all_pies_data', userId],
    queryFn: () => getPieData(userId!),
    enabled: !!userId
  })

  const refetchAllPies = async () => {
    try {
      const allpies = await getAllPies()
      await updateOrCreateDoc(userId!, allpies)
      refetch()
    } catch (error) {
      console.error('Error refetching pies:', error)
    }
  }

  return {
    allPiesData,
    isLoadingAllPies,
    refetchAllPies
  }
}

export default useFetchAllPies
