import React from 'react'
import {
  ChartConfigProps,
  ChartContainer,
  ChartDataProps,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { PieChart as PieChartRecharts, Pie, Label } from 'recharts'

interface ChartPieProps {
  chartConfig: ChartConfigProps
  chartData: ChartDataProps[]
  total: string | number
}

const PieChart = ({ chartConfig, chartData, total }: ChartPieProps) => {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChartRecharts>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="category"
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
                      className="fill-white text-lg  font-bold "
                    >
                      {total}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-slate-200"
                    >
                      Total Conta
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </Pie>
      </PieChartRecharts>
    </ChartContainer>
  )
}

export default PieChart
