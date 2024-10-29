import { IInvestmentsProps } from '@/hooks/finance/useFetchInvestiments'

export const getInvestments = async () => {
  const resp = await fetch(
    `https://cors.redoc.ly/https://live.trading212.com/api/v0/equity/account/cash`,
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
