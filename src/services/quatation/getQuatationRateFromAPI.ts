import { convertEurToReal } from '@/utils/formatNumber'

export async function getQuatationRateFromAPI(
  valueToConvert: number,
  currency: {
    primary_currency: string
    secondary_currency: string
  }
) {
  const myHeaders = new Headers()
  myHeaders.append('apikey', process.env.API_KEY_EXCHANGE || '')

  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  }

  const response = await fetch(
    `https://api.apilayer.com/exchangerates_data/convert?to=${currency.primary_currency}&from=${currency.secondary_currency}&amount=${valueToConvert}`,
    requestOptions
  )

  const data = await response.json()

  return {
    result_calculation: convertEurToReal(data.info.rate, valueToConvert),
    current_quotation: data.info.rate,
    date: data?.date,
    status: data.success
  }
}
