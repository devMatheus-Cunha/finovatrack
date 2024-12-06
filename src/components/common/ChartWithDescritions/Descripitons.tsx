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

interface DescripitonsProps {
  dataStats: IFormatDataToStats[]
  formatLabel?: (value: string) => string
}

const Descripitons = ({ dataStats, formatLabel }: DescripitonsProps) => {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap={3}
      overflowY="auto"
      maxHeight="235px"
    >
      {dataStats.map((item) => (
        <GridItem key={item.label} color="white">
          <Stat>
            <StatLabel fontSize="sm">
              {formatLabel ? formatLabel(item.label) : item.label}
            </StatLabel>
            <Box display="flex" alignItems="center" gap={1}>
              <StatNumber fontSize={{ base: 'lg', lg: 'lg' }}>
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

export default Descripitons
