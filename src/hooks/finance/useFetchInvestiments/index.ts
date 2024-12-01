import { useUserId } from '@/hooks/globalStates'
import {
  getCombinedData,
  getInvestmentData,
  updateOrCreateDoc
} from '@/services/finance/getInvestiments'
import { useQuery } from '@tanstack/react-query'

export interface IInvestmentsProps {
  blocked: number
  free: number
  invested: number
  pieCash: number
  ppl: number
  result: number
  total: number
}

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

export interface IInvestimentsData extends IInvestmentsProps {
  pies: IGetAllPies
}

export const useFetchInvestiments = () => {
  const { userId } = useUserId()

  const {
    data: investimentsData,
    isFetching: isLoadingInvestimentsData,
    refetch
  } = useQuery({
    queryKey: ['investiments_data', userId],
    queryFn: () => getInvestmentData(userId!),
    enabled: !!userId
  })

  const refetchInvestimentsData = async () => {
    try {
      const investiments = await getCombinedData()
      await updateOrCreateDoc(userId!, investiments)
      refetch()
    } catch (error) {
      console.error('Error refetching investments:', error)
    }
  }

  return {
    investimentsData,
    isLoadingInvestimentsData,
    refetchInvestimentsData
  }
}

export default useFetchInvestiments
