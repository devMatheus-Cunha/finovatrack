import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getEntrys } from '@/services/entrys/getEntrys'

export interface IEntrysData {
  value: number
  id?: string
}

export const useFetchEntrysData = () => {
  const router = useParams<any>()

  const {
    data: entrysData,
    isLoading: isLoadingEntrysData,
    status: statusEntrysData,
    refetch: refetchEntrysData
  } = useQuery(
    ['entrys_data', router.id],
    async () => await getEntrys(router.id),
    {
      enabled: !!router.id
    }
  )

  return {
    entrysData,
    isLoadingEntrysData,
    statusEntrysData,
    refetchEntrysData
  }
}

export default useFetchEntrysData
