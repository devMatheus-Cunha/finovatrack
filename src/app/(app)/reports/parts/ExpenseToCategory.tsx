import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import {
  Card,
  CardHeader,
  CardBody,
  GridItem,
  Stat,
  StatLabel,
  HStack,
  StatNumber,
  Heading,
  Grid
} from '@chakra-ui/react'
import React from 'react'
import { PieChart, Pie, Label } from 'recharts'
import { ExpenseData } from '@/services/expenses/getExpenses'
import { UserData } from '@/hooks/auth/useAuth/types'

interface Resultcategory {
  value: number
  label: string
}

interface IExpenseToCategory {
  expensesData: ExpenseData[]
  userData: UserData
  isVisibilityData: boolean
  totalExpenses: string
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
      console.log(expense)
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

  function formatarParaChartConfig(data: any) {
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
    <Card>
      <CardHeader>
        <Heading size="md">Gastos por Categoria</Heading>
      </CardHeader>
      <CardBody>
        <CardBody p={0}>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="label"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-white text-lg lg:text-xl font-bold "
                          >
                            {isVisibilityData ? totalExpenses : '****'}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-slate-200"
                          >
                            Total
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>

          <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={3.5}>
            <>
              {sumToCategory(expensesData).map((card, index) => (
                <GridItem key={card.label}>
                  <Stat key={index}>
                    <StatLabel fontSize="xs" color="gray.500">
                      {card.label}
                    </StatLabel>
                    <HStack>
                      <StatNumber fontSize={{ base: 'lg', lg: '23' }}>
                        {formatCurrencyMoney(
                          card.value,
                          userData.primary_currency,
                          isVisibilityData
                        )}
                      </StatNumber>
                    </HStack>
                  </Stat>
                </GridItem>
              ))}
            </>
          </Grid>
        </CardBody>
      </CardBody>
    </Card>
  )
}

export default ExpenseToCategory
