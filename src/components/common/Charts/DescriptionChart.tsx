import React from 'react'
import {
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Grid,
  Box
} from '@chakra-ui/react'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'

export interface IFormatDataToStats {
  label: string
  value: number
  percentage?: string
}

interface DescriptionChartProps {
  dataStats: IFormatDataToStats[]
  formatLabel?: (value: string) => string
}

const DescriptionChart = ({
  dataStats,
  formatLabel
}: DescriptionChartProps) => {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap={4}
      overflowY="auto"
      maxHeight={{ base: '230px' }}
    >
      {dataStats.map((item) => (
        <GridItem key={item.label} color="white">
          <Stat>
            <StatLabel fontSize={{ base: 'xs' }} opacity={0.7}>
              {formatLabel ? formatLabel(item.label) : item.label}
            </StatLabel>
            <Box display="flex" alignItems="center" gap={1}>
              <StatNumber fontSize={{ base: 'md', lg: 'lg' }}>
                {formatCurrencyMoney(
                  Number(item.value),
                  userData.primary_currency,
                  isVisibilityData
                )}
              </StatNumber>
              {item.percentage && (
                <StatHelpText fontSize="sm" mb={0}>
                  <StatArrow
                    fontSize="sm"
                    type={item.value > 0 ? 'increase' : 'decrease'}
                  />
                  {item.percentage}
                </StatHelpText>
              )}
            </Box>
          </Stat>
        </GridItem>
      ))}
    </Grid>
  )
}

export default DescriptionChart
