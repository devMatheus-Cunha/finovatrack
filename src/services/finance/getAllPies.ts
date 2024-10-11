'use server'

import { IGetAllPies } from '@/hooks/finance/useFetchAllPies'

export async function getAllPies(): Promise<IGetAllPies[]> {
  const apiKey = process.env.NEXT_PUBLIC_KEY_API_TRANDING_212
  if (!apiKey) {
    throw new Error('Missing API key')
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_TRANDING_212}/api/v0/equity/pies`,
    {
      headers: {
        Authorization: apiKey,
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`API Error: ${response.status} - ${errorText}`)
  }

  const contentType = response.headers.get('content-type')
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('API Error: Invalid response content type, expected JSON')
  }

  const data = await response.json()
  return data as IGetAllPies[]
}
