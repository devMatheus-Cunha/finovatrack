'use server'
import { IInvestmentsProps } from '@/hooks/finance/useFetchInvestiments'

export const getInvestments = async () => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_URL_TRANDING_212}/api/v0/equity/account/cash`,
    {
      method: 'GET',
      headers: {
        Authorization: process.env.NEXT_PUBLIC_KEY_API_TRANDING_212 || '',
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
  )

  const data = await resp.json()
  return data as IInvestmentsProps
}
