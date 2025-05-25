import useFetchDividends from '@/hooks/finance/useFetchDividends'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import React from 'react'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { chartConfig, formattedDividendsData } from './utils'
import { Card, Charts } from '@/components'
import { tickerToCompanyName } from '@/utils/namesCompanyByTicker'
import { ArrowsCounterClockwise } from '@phosphor-icons/react'
import { blueHexShades } from '@/utils/colors'

const blueHexKeys = Object.keys(blueHexShades) as Array<
  keyof typeof blueHexShades
>

const CardToDividends = () => {
  const { isVisibilityData } = useIsVisibilityDatas()
  const { userData } = useUserData()

  const { dividendsData, isLoadingDividendsData, refetchDividendsData } =
    useFetchDividends()

  return (
    <Card
      title="Dividendos"
      isLoading={isLoadingDividendsData}
      hasData={!!dividendsData}
      className="w-full lg:max-w-md min-h-[570px] max-h-[570px] flex flex-col"
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => refetchDividendsData()}
          className="hover:text-gray-400 p-1 rounded transition-colors"
        >
          <ArrowsCounterClockwise
            size={20}
            color="#eee2e2"
            className="hover:opacity-75"
          />
        </button>
      </div>
      <div className="pt-2 flex flex-col">
        <Charts.BarChart
          chartData={formattedDividendsData(dividendsData)}
          chartConfig={chartConfig}
          tickFormatter={(value: string) =>
            formatCurrencyMoney(
              Number(value),
              userData.primary_currency,
              isVisibilityData
            )
          }
        />
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
