import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import useFetchReportsToYearData from '@/hooks/reports/useFetchReportsToYearData_'
import { useFetchReportsData } from '@/hooks/reports'
import { Card, InfoCardMoney } from '@/components'
import {
  ArrowCircleUp,
  ArrowCircleDown,
  MoneyWavy,
  Bank
} from '@phosphor-icons/react'

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
      percentageInfo: `${investmentPercentage}%`
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
          />
        ))}
      </div>
    </Card>
  )
}

export default CardToStatsInYear
