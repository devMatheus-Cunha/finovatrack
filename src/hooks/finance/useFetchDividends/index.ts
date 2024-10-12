import { useUserId } from '@/hooks/globalStates'
import { fetchDividends } from '@/services/finance/getDividends'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

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

export const useFetchDividends = () => {
  const { userId } = useUserId() as any
  const [currentPage, setCurrentPage] = useState('10')

  const {
    data: dividendsData,
    isFetching: isLoadingDividendsData,
    status: statusDividendsData,
    refetch: refetchDividendsData
  } = useQuery({
    queryKey: ['dividends_data', currentPage, userId],
    queryFn: () => fetchDividends(currentPage),
    enabled: !!userId
  })

  return {
    dividendsData: dividendsData && dividendsData,
    isLoadingDividendsData,
    statusDividendsData,
    refetchDividendsData,
    currentPage,
    setCurrentPage
  }
}

export default useFetchDividends
