import React from 'react'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { chartConfig, formattedDividendsData } from './utils'
import {
  BarChart as BarChartRecharts,
  CartesianGrid,
  XAxis,
  Bar,
  YAxis
} from 'recharts'
import { IDividendProps } from '@/hooks/finance/useFetchDividends'

export const BarChart = ({
  dividendsData,
  tickFormatter
}: {
  dividendsData: IDividendProps[]
  tickFormatter: (value: string) => string
}) => {
  return (
    <ChartContainer config={chartConfig}>
      <BarChartRecharts
        accessibilityLayer
        data={formattedDividendsData(dividendsData)}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => tickFormatter(value)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="value" fill="var(--color-desktop)" radius={8} />
      </BarChartRecharts>
    </ChartContainer>
  )
}
