import { Card, CardHeader, CardBody, Heading } from '@chakra-ui/react'
import React from 'react'
import { ExpenseData } from '@/services/expenses/getExpenses'
import { UserData } from '@/hooks/entrys/useDeletedEntry/auth/useAuth/types'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { ChartWithDescritions } from '../common'

interface Resultcategory {
  value: number
  label: string
}

interface IExpenseToCategory {
  expensesData: ExpenseData[]
  userData: UserData
  isVisibilityData: boolean
  totalExpenses: number
}

const ExpenseToCategory = ({
  expensesData,
  userData,
  isVisibilityData,
  totalExpenses
}: IExpenseToCategory) => {
  function sumToCategory(expenses: ExpenseData[]): Resultcategory[] {
    const result: { [category: string]: number } = {}

    for (const expense of expenses) {
      if (expense.category === 'Investimentos') {
        continue
      }

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

  const chartData = sumToCategory(expensesData).map((category, index) => {
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

  const chartConfig = formatarParaChartConfig(sumToCategory(expensesData))

  return (
    <Card h={{ base: 'auto', lg: 555 }}>
      <CardHeader>
        <Heading size="md">Gastos por Categoria</Heading>
      </CardHeader>
      <CardBody>
        <CardBody p={0}>
          <ChartWithDescritions.PieChart
            chartConfig={chartConfig}
            chartData={chartData}
            total={formatCurrencyMoney(
              totalExpenses,
              userData.primary_currency,
              isVisibilityData
            )}
          />

          <ChartWithDescritions.Descripitons
            dataStats={sumToCategory(expensesData)}
          />
        </CardBody>
      </CardBody>
    </Card>
  )
}

export default ExpenseToCategory
