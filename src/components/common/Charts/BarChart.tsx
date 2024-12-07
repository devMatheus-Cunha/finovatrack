import React from 'react'
import {
  ChartConfigProps,
  ChartContainer,
  ChartDataProps,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import {
  BarChart as BarChartRecharts,
  CartesianGrid,
  XAxis,
  Bar,
  YAxis
} from 'recharts'

interface BarChartProps {
  chartData: ChartDataProps[]
  tickFormatter: (value: string) => string
  chartConfig: ChartConfigProps
}

const BarChart = ({ chartData, tickFormatter, chartConfig }: BarChartProps) => {
  return (
    <ChartContainer config={chartConfig} className="h-[35%]">
      <BarChartRecharts accessibilityLayer data={chartData}>
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

export default BarChart
