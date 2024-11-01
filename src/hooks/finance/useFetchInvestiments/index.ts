import { useUserId } from '@/hooks/globalStates'
import {
  getInvestmentData,
  getInvestments,
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

export const useFetchInvestiments = () => {
  const { userId } = useUserId()

  const {
    data: investimentsData,
    isFetching: isLoadingInvestimentsData,
    refetch
  } = useQuery({
    queryKey: ['investiments_data', userId],
    queryFn: () => getInvestmentData(userId!),
    enabled: !!userId,
    onError: (error) => {
      console.error('Erro na query:', error)
    }
  })

  const refetchInvestimentsData = async () => {
    try {
      const investiments = await getInvestments()
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
