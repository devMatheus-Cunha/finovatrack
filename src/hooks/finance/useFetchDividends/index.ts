import { useUserId } from '@/hooks/globalStates'
import { fetchDividends } from '@/services/finance/getDividends'
import { useQuery } from '@tanstack/react-query'

export interface IDividendProps {
  ticker: string
  reference: string
  quantity: number
  amount: number
  grossAmountPerShare: number
  amountInEuro: number
  paidOn: string
  type: string
}

export type IDividendsProps = IDividendProps[]

function sumTotalsDividends(array: IDividendsProps = []) {
  let total = 0
  for (let i = 0; i < array.length; i++) {
    total += array[i].amountInEuro
  }
  return total
}

export const useFetchDividends = () => {
  const { userId } = useUserId() as any

  const {
    data: dividendsData,
    isFetching: isLoadingDividendsData,
    status: statusDividendsData,
    refetch: refetchDividendsData
  } = useQuery({
    queryKey: ['dividends_data', userId],
    queryFn: () => fetchDividends(),
    enabled: !!userId
  })

  return {
    dividendsData,
    totalsDividendsData: sumTotalsDividends(dividendsData),
    isLoadingDividendsData,
    statusDividendsData,
    refetchDividendsData
  }
}

export default useFetchDividends
