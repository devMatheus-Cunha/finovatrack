import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

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
  const router = useParams()

  const {
    data: investimentsData,
    isLoading: isLoadingInvestimentsData,
    status: statusInvestimentsData,
    refetch: refetchInvestimentsData
  } = useQuery(
    ['investiments_data', router.id],
    async () => {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_URL_TRANDING_212}/api/v0/equity/account/cash`,
        {
          method: 'GET',
          headers: {
            Authorization: process.env.NEXT_PUBLIC_KEY_API_TRANDING_212 || ''
          }
        }
      )

      const data = await resp.json()
      return data as IInvestmentsProps
    },
    {
      enabled: !!router.id
    }
  )

  return {
    investimentsData,
    isLoadingInvestimentsData,
    statusInvestimentsData,
    refetchInvestimentsData
  }
}

export default useFetchInvestiments
