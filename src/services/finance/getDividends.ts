import { IDividendProps } from '@/hooks/finance/useFetchDividends'

export async function fetchDividends(): Promise<IDividendProps[]> {
  const apiKey = process.env.NEXT_PUBLIC_KEY_API_TRANDING_212
  if (!apiKey) {
    throw new Error('Missing API key')
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_TRANDING_212}/api/v0/history/dividends?limit=50`,
    {
      headers: {
        Authorization: apiKey
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
  return data?.items.sort((a: IDividendProps, b: IDividendProps) =>
    b.paidOn.localeCompare(a.paidOn)
  ) as IDividendProps[]
}
