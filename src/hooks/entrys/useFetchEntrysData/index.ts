/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-return-await */
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getEntrys } from '@/service/entrys/getEntrys'

export interface IEntrysData {
  value: string
  id?: string
}

export const useFetchEntrysData = () => {
  const router = useParams()

  const {
    data: entrysData,
    isLoading: isLoadingEntrysData,
    status: statusEntrysData,
    refetch: refetchEntrysData,
  } = useQuery(
    ['entrys_data', router.id],
    async () => await getEntrys(router.id),
    {
      enabled: !!router.id,
    },
  )

  return {
    entrysData,
    isLoadingEntrysData,
    statusEntrysData,
    refetchEntrysData,
  }
}

export default useFetchEntrysData
