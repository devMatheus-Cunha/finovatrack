import useFetchDividends from '@/hooks/finance/useFetchDividends'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import React from 'react'
import Filter from './Filter'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { chartConfig, formattedDividendsData } from './utils'
import { Charts } from '@/components'
import { tickerToCompanyName } from '@/utils/namesCompanyByTicker'
import { FormatChartData } from '@/components/ui/chart'
import { ArrowsCounterClockwise } from '@phosphor-icons/react'

const CardToDividends = () => {
  const { isVisibilityData } = useIsVisibilityDatas()
  const { userData } = useUserData()

  const {
    dividendsData,
    isLoadingDividendsData,
    refetchDividendsData,
    currentPage,
    setCurrentPage
  } = useFetchDividends()

  if (isLoadingDividendsData || dividendsData.length <= 0) {
    return (
      <div className="w-full lg:max-w-md min-h-[570px] rounded-md bg-gray-700 animate-pulse flex items-center justify-center">
        <div className="w-2/3 h-10 bg-gray-600 rounded mb-4" />
      </div>
    )
  }

  return (
    <div className="w-full lg:max-w-md min-h-[570px] max-h-[570px] bg-gray-700 rounded-md shadow flex flex-col">
      <div className="flex items-center justify-between px-6 pt-6 pb-0">
        <h2 className="text-lg font-semibold text-white">Dividendos</h2>
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
      <div className="flex-1 px-6 pb-6 pt-2 flex flex-col">
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
        <Filter
          currentPage={currentPage}
          onChange={(event) => setCurrentPage(Number(event.target.value))}
        />
        <Charts.DescriptionChart
          dataStats={FormatChartData(dividendsData, 'ticker', 'amount')}
          formatLabel={(value) => tickerToCompanyName[value]}
        />
      </div>
    </div>
  )
}
export default CardToDividends
