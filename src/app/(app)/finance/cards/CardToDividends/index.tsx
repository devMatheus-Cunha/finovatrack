import useFetchDividends from '@/hooks/finance/useFetchDividends'
import React from 'react'
import { Card, Charts } from '@/components'
import { tickerToCompanyName } from '@/utils/namesCompanyByTicker'
import { blueHexShades } from '@/utils/colors'
import { useUserData } from '@/hooks/globalStates'

const blueHexKeys = Object.keys(blueHexShades) as Array<
  keyof typeof blueHexShades
>

const CardToDividends = () => {
  const { dividendsData, isLoadingDividendsData, refetchDividendsData } =
    useFetchDividends()
  const { userData } = useUserData()

  return (
    <Card
      title="Dividendos"
      isLoading={isLoadingDividendsData}
      hasData={!!dividendsData}
      className="w-full lg:max-w-md min-h-[570px] max-h-[570px] flex flex-col"
      {...(userData.admin ? { action: refetchDividendsData } : {})}
    >
      <div className="pt-2 flex flex-col h-[450px]">
        <Charts.DescriptionChart
          dataStats={
            Array.isArray(dividendsData)
              ? dividendsData.map((item, idx) => ({
                  label: item.ticker,
                  value: item.amountInEuro ?? item.amount,
                  color: blueHexShades[blueHexKeys[idx % blueHexKeys.length]]
                }))
              : []
          }
          formatLabel={(value) => tickerToCompanyName[value]}
        />
      </div>
    </Card>
  )
}
export default CardToDividends
