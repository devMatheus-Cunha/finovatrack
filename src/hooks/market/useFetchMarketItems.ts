import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getMarketItems } from '@/services/market/getMarketItems'
import { useUserId } from '@/hooks/globalStates'

export const useFetchMarketItems = () => {
  const { userId } = useUserId() as any

  const { data, isLoading, status, refetch } = useQuery({
    queryKey: ['market_items', userId],
    queryFn: async () => await getMarketItems(userId),
    enabled: !!userId,
    placeholderData: (prev) => prev
  })

  const marketItems = useMemo(() => data || [], [data])

  return {
    marketItems,
    isLoading,
    status,
    refetchMarketItems: refetch
  }
}

export default useFetchMarketItems
