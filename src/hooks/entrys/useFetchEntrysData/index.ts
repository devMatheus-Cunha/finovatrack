import { useQuery } from '@tanstack/react-query'
import { getEntrys } from '@/services/entrys/getEntrys'
import { useUserId } from '@/hooks/globalStates'

export interface IEntrysData {
  value: number
  id?: string
}

export const useFetchEntrysData = () => {
  const { userId } = useUserId() as any

  const {
    data: entrysData,
    isLoading: isLoadingEntrysData,
    status: statusEntrysData,
    refetch: refetchEntrysData
  } = useQuery({
    queryKey: ['entrys_data', userId],
    queryFn: async () => await getEntrys(userId),
    enabled: !!userId,
    placeholderData: (previous) => previous
  })

  const totalEntrys =
    entrysData && entrysData.reduce((acc, item) => acc + Number(item.value), 0)

  return {
    entrysData,
    totalEntrys: totalEntrys || 0,
    isLoadingEntrysData,
    statusEntrysData,
    refetchEntrysData
  }
}

export default useFetchEntrysData
