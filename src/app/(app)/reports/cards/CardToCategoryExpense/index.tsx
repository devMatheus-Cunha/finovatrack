import React from 'react'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { useFetchReportsData } from '@/hooks/reports'
import { Card, Charts } from '@/components'
import { ExpenseData } from '@/services/expenses/getExpenses'
import { blueHexShades } from '@/utils/colors'

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

  // Usar as chaves do objeto blueHexShades para gerar as cores dinamicamente
  const blueHexKeys = Object.keys(blueHexShades)
  const chartData = sumToCategory(data).map((category, index) => ({
    label: category.label,
    value: category.value,
    color:
      blueHexShades[
        blueHexKeys[index % blueHexKeys.length] as keyof typeof blueHexShades
      ]
  }))

  return (
    <Card
      title="Gastos por Categoria"
      isLoading={isLoading}
      hasData={!!data}
      className="w-full h-full min-h-96"
    >
      <Charts.PieChartCircle
        data={chartData}
        total={chartData.reduce((acc, item) => acc + item.value, 0)}
        currency={userData.primary_currency}
        isVisibilityData={isVisibilityData}
        showTooltip
      />
      <Charts.DescriptionChart dataStats={sumToCategory(data)} />
    </Card>
  )
}

export default CardToCategoryExpense
