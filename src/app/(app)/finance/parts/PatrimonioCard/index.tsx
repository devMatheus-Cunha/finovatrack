import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { Card, CardBody, Heading, Skeleton } from '@chakra-ui/react'
import { RadialBarChart, PolarRadiusAxis, Label, RadialBar } from 'recharts'

interface PatrimonioCardProps {
  primaryCurrency: string
  isVisibilityData: boolean
  isLoadingFinancialPlanningYear: boolean
  isLoadingInvestimentsData: boolean
  isLoadingAllPies: boolean
  investmentFree?: number
  sumTotalCurrency?: number | string
  investmentValue?: number
  millenium?: number
}

const PatrimonioCard: React.FC<PatrimonioCardProps> = ({
  primaryCurrency,
  isVisibilityData,
  isLoadingFinancialPlanningYear,
  investmentFree,
  investmentValue,
  isLoadingInvestimentsData,
  isLoadingAllPies,
  sumTotalCurrency,
  millenium
}) => {
  const chartData = [
    {
      investmentFree: investmentFree,
      investmentValue: investmentValue,
      millenium: millenium
    }
  ]
  const chartConfig = {
    investmentFree: {
      label: 'Inv Free'
    },
    investmentValue: {
      label: 'Inv'
    },
    millenium: {
      label: 'Millenium'
    }
  } satisfies ChartConfig

  return (
    <>
      {isLoadingFinancialPlanningYear ||
      isLoadingInvestimentsData ||
      isLoadingAllPies ? (
        <Skeleton height="130px" rounded="md" />
      ) : (
        <Card width="100%" height="130px" p={2}>
          <CardBody
            display="flex"
            flexDir="row"
            justifyContent="space-around"
            p={0}
          >
            <Heading size={{ base: 'sm', lg: 'md' }} mt="50px">
              Patrimônio atual
            </Heading>
            <ChartContainer
              config={chartConfig}
              className="mx-auto h-[180px] w-[200px] p-0 m-0 "
            >
              <RadialBarChart
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
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) - 16}
                              className="fill-white text-lg lg:text-xl font-bold"
                            >
                              {formatCurrencyMoney(
                                Number(sumTotalCurrency) || 0,
                                primaryCurrency,
                                isVisibilityData
                              )}
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
              </RadialBarChart>
            </ChartContainer>
          </CardBody>
        </Card>
      )}
    </>
  )
}

export default PatrimonioCard
