import { useUserId } from '@/hooks/globalStates'
import { getInvestments } from '@/services/finance/getInvestiments'
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
  const { userId } = useUserId() as any

  const {
    data: investimentsData,
    isFetching: isLoadingInvestimentsData,
    status: statusInvestimentsData,
    refetch: refetchInvestimentsData
  } = useQuery(['investiments_data', userId], async () => getInvestments(), {
    enabled: !!userId
  })

  return {
    investimentsData,
    isLoadingInvestimentsData,
    statusInvestimentsData,
    refetchInvestimentsData
  }
}

export default useFetchInvestiments
