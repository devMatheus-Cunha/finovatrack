import {
  ChartConfigProps,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import React from 'react'
import {
  RadialBarChart as RadialBarChartRechart,
  PolarRadiusAxis,
  Label,
  RadialBar
} from 'recharts'

interface RadialBarChartProps {
  chartConfig: ChartConfigProps
  chartData: any
  total: string | number
}

const RadialBarChart = ({
  chartConfig,
  chartData,
  total
}: RadialBarChartProps) => {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto h-[180px] w-[200px] p-0 m-0 "
    >
      <RadialBarChartRechart
        data={chartData}
        endAngle={180}
        innerRadius={80}
        outerRadius={110}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 16}
                      className="fill-white text-lg lg:text-xl font-bold"
                    >
                      {total}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 4}
                      className="fill-slate-300"
                    >
                      Patrimônio
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>
        <RadialBar
          dataKey="investmentValue"
          fill="hsl(var(--chart-1))"
          stackId="a"
          cornerRadius={5}
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="investmentFree"
          stackId="a"
          cornerRadius={5}
          fill="hsl(var(--chart-2))"
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="millenium"
          fill="hsl(var(--chart-3))"
          stackId="a"
          cornerRadius={5}
          className="stroke-transparent stroke-2"
        />
      </RadialBarChartRechart>
    </ChartContainer>
  )
}

export default RadialBarChart
