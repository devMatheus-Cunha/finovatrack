// PieChartComponent.tsx
import { Pie, PieChart, Label } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { chartConfig, chartData } from './chartConfig'

interface PieChartComponentProps {
  totalValue: number
  currency: string
  isVisibilityData: boolean
}

export const PieChartComponent = ({
  totalValue,
  currency,
  isVisibilityData
}: PieChartComponentProps) => (
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
        nameKey="apps"
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
                    className="fill-white text-lg font-bold"
                  >
                    {formatCurrencyMoney(
                      totalValue,
                      currency,
                      isVisibilityData
                    )}
                  </tspan>
                  <tspan
                    x={viewBox.cx}
                    y={(viewBox.cy || 0) + 24}
                    className="fill-slate-200"
                  >
                    Meta
                  </tspan>
                </text>
              )
            }
          }}
        />
      </Pie>
    </PieChart>
  </ChartContainer>
)
