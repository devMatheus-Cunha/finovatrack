import { useUserId } from '@/hooks/globalStates'
import {
  fetchDividends,
  getDividendData,
  updateOrCreateDoc
} from '@/services/finance/getDividends'
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
  const { userId } = useUserId()
  const [currentPage, setCurrentPage] = useState(10)

  const {
    data: dividendsData,
    isFetching: isLoadingDividendsData,
    refetch
  } = useQuery({
    queryKey: ['dividends_data', currentPage, userId],
    queryFn: () => getDividendData(userId!, currentPage),
    enabled: !!userId
  })

  const refetchDividendsData = async () => {
    try {
      const dividends = await fetchDividends('50')
      await updateOrCreateDoc(userId!, dividends)
      refetch()
    } catch (error) {
      console.error('Error refetching dividends:', error)
    }
  }

  return {
    dividendsData: dividendsData ?? [],
    isLoadingDividendsData,
    refetchDividendsData,
    currentPage,
    setCurrentPage
  }
}

export default useFetchDividends
