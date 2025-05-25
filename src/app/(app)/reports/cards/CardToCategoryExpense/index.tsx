import React from 'react'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { useFetchReportsData } from '@/hooks/reports'
import { Card, Charts } from '@/components'
import { ExpenseData } from '@/services/expenses/getExpenses'
import { formatCurrencyMoney } from '@/utils/formatNumber'

interface Resultcategory {
  value: number
  label: string
}

interface CardToCategoryExpenseProps {
  selectedDate: Date
}

const CardToCategoryExpense = ({
  selectedDate
}: CardToCategoryExpenseProps) => {
  const { reportData, isLoading } = useFetchReportsData(selectedDate)
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()

  const data = reportData?.data ?? []

  function sumToCategory(expenses: ExpenseData[]): Resultcategory[] {
    const result: { [category: string]: number } = {}
    for (const expense of expenses) {
      if (expense.category === 'Investimentos') continue
      const { category, value_primary_currency } = expense
      if (result[category]) {
        result[category] += value_primary_currency
      } else {
        result[category] = value_primary_currency
      }
    }
    return Object.keys(result).map((category) => ({
      value: result[category],
      label: category
    }))
  }

  const chartData = sumToCategory(data).map((category, index) => {
    const colorIndex = index + 1
    return {
      label: category.label,
      value: category.value,
      fill: `hsl(var(--chart-${colorIndex}))`
    }
  })

  const formatarParaChartConfig = (data: any) => {
    return data.reduce((config: any, item: any, index: any) => {
      const colorIndex = index + 1
      config[item.label] = {
        label: item.label,
        color: `hsl(var(--chart-${colorIndex}))`
      }
      return config
    }, {})
  }

  const chartConfig = formatarParaChartConfig(
    sumToCategory(reportData?.data ?? [])
  )

  return (
    <Card
      title="Gastos por Categoria"
      isLoading={isLoading}
      hasData={!!data}
      className="w-full lg:max-w-xs h-full min-h-96"
    >
      <Charts.PieChart
        chartConfig={chartConfig}
        chartData={chartData}
        total={formatCurrencyMoney(
          reportData?.totalExpenses,
          userData.primary_currency,
          isVisibilityData
        )}
      />
      <Charts.DescriptionChart dataStats={sumToCategory(data)} />
    </Card>
  )
}

export default CardToCategoryExpense
