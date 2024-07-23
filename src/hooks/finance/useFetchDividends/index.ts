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

type IDividendsProps = IDividendProps[]

function sumTotalsDividends(array: IDividendsProps = []) {
  let total = 0
  for (let i = 0; i < array.length; i++) {
    total += array[i].amountInEuro
  }
  return total
}

export const useFetchDividends = () => {
  const router = useParams()

  const {
    data: dividendsData,
    isFetching: isLoadingDividendsData,
    status: statusDividendsData,
    refetch: refetchDividendsData
  } = useQuery(
    ['dividends_data', router.id],
    async () => {
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

      if (data?.items) {
        data.items.sort((a: IDividendProps, b: IDividendProps) =>
          b.paidOn.localeCompare(a.paidOn)
        )
      }

      return data?.items as IDividendsProps
    },
    {
      enabled: !!router.id
    }
  )

  return {
    dividendsData,
    totalsDividendsData: sumTotalsDividends(dividendsData),
    isLoadingDividendsData,
    statusDividendsData,
    refetchDividendsData
  }
}

export default useFetchDividends
