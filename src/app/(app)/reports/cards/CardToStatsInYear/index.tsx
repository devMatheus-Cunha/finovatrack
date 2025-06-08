import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import useFetchReportsToYearData from '@/hooks/reports/useFetchReportsToYearData'
import { useFetchReportsData } from '@/hooks/reports'
import { Card, InfoCardMoney, YearPicker } from '@/components'
import {
  ArrowCircleUp,
  ArrowCircleDown,
  MoneyWavy,
  Bank
} from '@phosphor-icons/react'
import { useFetchFinancialPlaningYear, useGoals } from '@/hooks/finance'
import {
  calcularValorGuardadoMes,
  GOAL_DEADLINE
} from '@/app/(app)/finance/cards/CardToGoals/utils'

interface CardToStatsInYearProps {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}

const CardToStatsInYear = ({
  selectedDate,
  setSelectedDate
}: CardToStatsInYearProps) => {
  const { userData } = useUserData()
  const { year } = useFetchReportsData(selectedDate)
  const { isVisibilityData } = useIsVisibilityDatas()
  const { reportDataToYear, isLoading } = useFetchReportsToYearData(
    String(year)
  )
  const { goal } = useGoals()
  const { financialPlanningYear } = useFetchFinancialPlaningYear()
  const goalDeadline = goal?.meta_year || GOAL_DEADLINE
  const valorGuardadoMes = calcularValorGuardadoMes(
    financialPlanningYear,
    goalDeadline
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
      value: reportDataToYear?.totalEntrys,
      icon: ArrowCircleUp,
      iconColor: 'green',
      showEyeIcon: false // não mostra olhinho
    },
    {
      label: 'Total Gastos',
      value: reportDataToYear?.totalExpenses,
      icon: ArrowCircleDown,
      iconColor: 'red'
    },
    {
      label: 'Total Livre',
      value: reportDataToYear?.totalFree,
      icon: MoneyWavy,
      iconColor: 'cyan'
    },
    {
      label: 'Total Investido',
      value: reportDataToYear?.totalInvestments,
      icon: Bank,
      iconColor: 'cyan',
      percentageInfo: `${investmentPercentage}%`,
      valorGuardadoMes: valorGuardadoMes
    }
  ]

  return (
    <Card
      title={
        <div className="flex justify-between items-center w-full">
          <h1 className="text-lg font-semibold text-white">Relatório Anual</h1>
          <div className="ml-4">
            <YearPicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              maxYear={new Date().getFullYear()}
              className="bg-transparent px-2"
            />
          </div>
        </div>
      }
      isLoading={isLoading}
      hasData={!!reportDataToYear}
      className="h-50 bg-transparent border-none"
    >
      <div className="w-full flex gap-3 mt-3 overflow-x-auto no-scrollbar">
        {summaryItems.map((card, index) => (
          <InfoCardMoney
            key={index}
            infoData={card.value}
            title={card.label}
            currency={userData.primary_currency}
            icon={card.icon}
            iconColor={card.iconColor}
            isVisibilityData={isVisibilityData}
            showEyeIcon={card.showEyeIcon}
            percentageInfo={card.percentageInfo}
            valorGuardadoMes={card.valorGuardadoMes}
          />
        ))}
      </div>
    </Card>
  )
}

export default CardToStatsInYear
