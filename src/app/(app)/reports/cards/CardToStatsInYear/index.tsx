import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import useFetchReportsToYearData from '@/hooks/reports/useFetchReportsToYearData_'
import { useFetchReportsData } from '@/hooks/reports'
import { Card } from '@/components'

interface CardToStatsInYearProps {
  selectedDate: Date
}

const CardToStatsInYear = ({ selectedDate }: CardToStatsInYearProps) => {
  const { userData } = useUserData()
  const { year } = useFetchReportsData(selectedDate)
  const { isVisibilityData } = useIsVisibilityDatas()
  const { reportDataToYear, isLoading } = useFetchReportsToYearData(
    String(year)
  )

  const investmentPercentage =
    reportDataToYear &&
    (
      (reportDataToYear?.totalInvestments / reportDataToYear?.totalEntrys) *
      100
    ).toFixed(2)

  const summaryItems = [
    {
      label: 'Total Entradas',
      value: reportDataToYear?.totalEntrys
    },
    {
      label: 'Total Gastos',
      value: reportDataToYear?.totalExpenses
    },
    {
      label: 'Total Livre',
      value: reportDataToYear?.totalFree
    },
    {
      label: 'Total Investido',
      value: reportDataToYear?.totalInvestments,
      investments: `${investmentPercentage}%`
    }
  ]

  return (
    <Card
      title="Relatorio Anual"
      subtitle={`Ano ${year}`}
      isLoading={isLoading}
      hasData={!!reportDataToYear}
      className="h-50"
    >
      <div className="w-full flex gap-3 mt-3 overflow-x-auto no-scrollbar">
        {summaryItems.map((card, index) => (
          <div
            key={index}
            className="bg-gray-600 rounded-xl shadow-md p-4 w-full min-w-[260px] max-w-[4220px] flex flex-col items-center justify-center mx-auto "
          >
            <div className="text-xs text-gray-400 mb-2 tracking-wide uppercase font-semibold">
              {card.label}
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl lg:text-2xl underline text-white font-bold">
                {formatCurrencyMoney(
                  card.value,
                  userData.primary_currency,
                  isVisibilityData
                )}
              </span>
              {card.investments && (
                <span className="hidden md:flex items-center text-green-400 text-xs font-semibold mb-0">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  {card.investments}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default CardToStatsInYear
