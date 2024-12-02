import React from 'react'
import {
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  HStack,
  StatHelpText,
  StatArrow
} from '@chakra-ui/react'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { UserData } from '@/hooks/entrys/useDeletedEntry/auth/useAuth/types'
import { IFormatDataToStats } from '../utils'

interface InvestmentStatsProps {
  dataStats: IFormatDataToStats[]
  userData: UserData
  isVisibilityData: boolean
}

const InvestmentStats = ({
  dataStats,
  userData,
  isVisibilityData
}: InvestmentStatsProps) => (
  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
    {dataStats.map((item) => (
      <GridItem key={item.label} color="white">
        <Stat>
          <StatLabel fontSize="sm">{item.label}</StatLabel>
          <HStack>
            <StatNumber fontSize={{ base: 'lg', lg: 'lg' }}>
              {formatCurrencyMoney(
                Number(item.value),
                userData.primary_currency,
                isVisibilityData
              )}
            </StatNumber>
            {item.percentage && (
              <StatHelpText fontSize="sm">
                <StatArrow
                  fontSize="sm"
                  type={item.value > 0 ? 'increase' : 'decrease'}
                />
                {item.percentage}
              </StatHelpText>
            )}
          </HStack>
        </Stat>
      </GridItem>
    ))}
  </Grid>
)

export default InvestmentStats
