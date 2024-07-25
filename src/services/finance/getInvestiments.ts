import { IInvestmentsProps } from '@/hooks/finance/useFetchInvestiments'

export const fetchDividends = async () => {
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
}
