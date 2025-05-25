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
import { blueHexShades } from '@/utils/colors'

interface BarChartProps {
  chartData: ChartDataProps[]
  tickFormatter: (value: string) => string
  chartConfig: ChartConfigProps
}

const BarChart = ({ chartData, tickFormatter, chartConfig }: BarChartProps) => {
  const blueHexKeys = [
    'blue900',
    'blue800',
    'blue700',
    'blue600',
    'blue500',
    'blue400',
    'blue300',
    'blue200',
    'blue100'
  ] as const
  const fillColor = chartData[0]?.fill || blueHexShades[blueHexKeys[0]]
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
        <Bar dataKey="value" fill={fillColor} radius={8} />
      </BarChartRecharts>
    </ChartContainer>
  )
}

export default BarChart
