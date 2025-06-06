import { useUserData } from '@/hooks/globalStates'
import {
  fetchDividends,
  getDividendData,
  updateOrCreateDoc
} from '@/services/finance/getDividends'
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

export const useFetchDividends = () => {
  const { userData } = useUserData()

  const {
    data: dividendsDataRaw,
    isFetching,
    isFetched,
    refetch
  } = useQuery({
    queryKey: ['dividends_data', 50, userData.id],
    queryFn: () => getDividendData(userData.id!, 50),
    enabled: !!userData.id && userData.admin,
    placeholderData: (previous) => previous
  })

  const refetchDividendsData = async () => {
    try {
      const dividends = await fetchDividends('50')
      await updateOrCreateDoc(userData.id!, dividends)
      refetch()
    } catch (error) {
      console.error('Error refetching dividends:', error)
    }
  }

  const isLoadingDividendsData = isFetching || !isFetched
  const dividendsData = isLoadingDividendsData ? [] : (dividendsDataRaw ?? [])

  return {
    dividendsData,
    isLoadingDividendsData,
    refetchDividendsData
  }
}

export default useFetchDividends
