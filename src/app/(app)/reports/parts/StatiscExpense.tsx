import { formatCurrencyMoney } from '@/utils/formatNumber'
import {
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  HStack,
  Skeleton,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber
} from '@chakra-ui/react'
import { ArrowsCounterClockwise } from '@phosphor-icons/react'
import React from 'react'

interface IStaticExpense {
  refetchInvestimentsData?: any
  isLoadingInvestimentsData?: any
  expensesData: any[]
  userData?: any
  isVisibilityData?: any
}

export default function StatiscExpense({
  refetchInvestimentsData,
  isLoadingInvestimentsData,
  expensesData,
  userData,
  isVisibilityData
}: IStaticExpense) {
  return (
    <>
      {isLoadingInvestimentsData ? (
        <Skeleton width="100%" h="max-content" minHeight="570px" rounded="md" />
      ) : (
        <Card width="100%" maxW={300} h="max-content" minHeight="300px">
          <CardHeader display="flex" justifyContent="space-between" pb={0}>
            <Heading size="md">Investimenos Tranding 212</Heading>
            <button
              type="button"
              onClick={() => refetchInvestimentsData()}
              className="hover:text-gray-400"
            >
              <ArrowsCounterClockwise
                size={20}
                color="#eee2e2"
                className="hover:opacity-75"
              />
            </button>
          </CardHeader>

          <CardBody>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={3.5}>
              {expensesData?.map((item: any) => (
                <GridItem key={item?.label}>
                  <Stat>
                    <StatLabel>{item?.label}</StatLabel>
                    <HStack>
                      <StatNumber fontSize={{ base: 'lg', lg: 'xl' }}>
                        {formatCurrencyMoney(
                          Number(item?.value),
                          userData.primary_currency,
                          isVisibilityData
                        )}
                      </StatNumber>
                      {item?.percentage && (
                        <StatHelpText>
                          <StatArrow
                            type={item?.value > 0 ? 'increase' : 'decrease'}
                          />
                          {item?.percentage}
                        </StatHelpText>
                      )}
                    </HStack>
                  </Stat>
                </GridItem>
              ))}
            </Grid>
          </CardBody>
        </Card>
      )}
    </>
  )
}
