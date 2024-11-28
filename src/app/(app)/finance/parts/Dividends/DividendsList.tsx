import { IDividendProps } from '@/hooks/finance/useFetchDividends'
import { tickerToCompanyName } from '@/utils/namesCompanyByTicker'
import {
  GridItem,
  Stat,
  StatLabel,
  HStack,
  StatNumber,
  Grid
} from '@chakra-ui/react'

export const DividendsList = ({
  dividendsData,
  formatAmount
}: {
  dividendsData: IDividendProps[]
  formatAmount: (value: number) => string
}) => {
  const formatDividend = (amountInEuro: number) => formatAmount(amountInEuro)

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap={6}
      overflowY="auto"
      maxHeight="200px"
    >
      {dividendsData &&
        dividendsData?.map(({ amountInEuro, ticker }) => {
          return (
            <GridItem key={ticker}>
              <Stat>
                <StatLabel fontSize="xs">
                  {tickerToCompanyName[ticker]}
                </StatLabel>
                <HStack>
                  <StatNumber fontSize="md">
                    {formatDividend(amountInEuro)}
                  </StatNumber>
                </HStack>
              </Stat>
            </GridItem>
          )
        })}
    </Grid>
  )
}
