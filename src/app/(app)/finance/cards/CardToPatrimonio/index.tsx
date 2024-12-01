import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { useFetchFinancialPlaningYear } from '@/hooks/finance'
import { IInvestimentsData } from '@/hooks/finance/useFetchInvestiments'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { Card, CardBody, Heading, Skeleton } from '@chakra-ui/react'
import { useMemo } from 'react'
import { RadialBarChart, PolarRadiusAxis, Label, RadialBar } from 'recharts'
import { chartConfig, chartData } from './utilts'

interface CardToPatrimonioProps {
  isLoadingInvestimentsData: boolean
  investments?: IInvestimentsData
  investmentValue?: number
  millenium?: number
}

const CardToPatrimonio = ({
  investments,
  investmentValue,
  isLoadingInvestimentsData,
  millenium
}: CardToPatrimonioProps) => {
  const { isVisibilityData } = useIsVisibilityDatas()
  const {
    userData: { primary_currency }
  } = useUserData()

  const { financialPlanningYear, isLoadingFinancialPlanningYear } =
    useFetchFinancialPlaningYear()

  const sumTotalCurrency = useMemo(() => {
    return financialPlanningYear && financialPlanningYear.length > 0
      ? financialPlanningYear[0].reserve + investments?.total
      : 0
  }, [financialPlanningYear, investments?.total])

  return (
    <>
      {isLoadingFinancialPlanningYear || isLoadingInvestimentsData ? (
        <Skeleton height="130px" rounded="md" />
      ) : (
        <Card width="100%" height="130px" p={2} bg="gray.700">
          <CardBody
            display="flex"
            flexDir="row"
            justifyContent="space-around"
            p={0}
          >
            <Heading size={{ base: 'sm', lg: 'md' }} mt="50px" color="white">
              Patrimônio atual
            </Heading>
            <ChartContainer
              config={chartConfig}
              className="mx-auto h-[180px] w-[200px] p-0 m-0 "
            >
              <RadialBarChart
                data={chartData(investments?.free, investmentValue, millenium)}
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
                                primary_currency,
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

export default CardToPatrimonio
