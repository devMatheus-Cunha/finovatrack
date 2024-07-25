import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

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

const fetchDividends = async (routerId: string | undefined) => {
  if (!routerId) return [] // Lidar com o caso em que routerId é undefined

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_URL_TRANDING_212}/api/v0/history/dividends?limit=50`,
    {
      method: 'GET',
      headers: {
        Authorization: process.env.NEXT_PUBLIC_KEY_API_TRANDING_212 || ''
      }
    }
  )

  const data = await resp.json()
  return data?.items.sort((a: IDividendProps, b: IDividendProps) =>
    b.paidOn.localeCompare(a.paidOn)
  ) as IDividendProps[]
}
export const useFetchDividends = () => {
  const router = useParams<any>()

  const {
    data: dividendsData,
    isFetching: isLoadingDividendsData,
    status: statusDividendsData,
    refetch: refetchDividendsData
  } = useQuery({
    queryKey: ['dividends_data', router.id],
    queryFn: () => fetchDividends(router.id),
    enabled: !!router.id
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
