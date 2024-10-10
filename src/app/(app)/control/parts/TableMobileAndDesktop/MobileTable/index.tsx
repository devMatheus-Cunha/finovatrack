import { UserData } from '@/hooks/auth/useAuth/types'
import { ExpenseData } from '@/services/expenses/getExpenses'
import {
  formatCurrencyMoney,
  formatToJavaScriptNumber
} from '@/utils/formatNumber'
import React from 'react'
import { ITypeModalExpense } from '../../../hooks/useControlModal'
import { Box, Text, Flex, VStack, Skeleton } from '@chakra-ui/react'
import { Filter } from '@/hooks/expenses/useFetchExpensesData'
import { Empty } from '@/components'

interface IMobileTableProps {
  calculationSumValues: ExpenseData[]
  isVisibilityData: boolean
  handleOpenModal: (type?: ITypeModalExpense, data?: ExpenseData) => void
  filter: Filter
  userData: UserData
  isLoadingExpensesData?: boolean
}

const MobileTable: React.FC<IMobileTableProps> = ({
  calculationSumValues,
  handleOpenModal,
  userData,
  isVisibilityData,
  isLoadingExpensesData,
  filter
}) => {
  const skeletons = Array(4).fill(0)
  return (
    <>
      {isLoadingExpensesData ? (
        <Flex flexWrap="wrap" gap={4}>
          {skeletons.map((_, index) => (
            <Skeleton
              key={index}
              height="85px"
              rounded="lg"
              width={{ base: '100%', md: '45%' }}
            />
          ))}
        </Flex>
      ) : (
        <>
          {calculationSumValues?.length > 0 ? (
            <Flex flexWrap="wrap" gap={4}>
              {calculationSumValues.map((item) => (
                <Box
                  key={item.id}
                  onClick={() => handleOpenModal('edit', item)}
                  height="95px"
                  width={{ base: '100%', md: '45%' }}
                  bg="gray.700"
                  rounded="lg"
                  p={4}
                  color="white"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <VStack alignItems="flex-start" spacing={4}>
                    <Text fontSize="ms">{item.description}</Text>
                    <Text fontSize="ms" fontWeight="semibold" marginTop="-1">
                      {formatCurrencyMoney(
                        formatToJavaScriptNumber(item?.value),
                        userData.typeAccount === 'oneCurrency'
                          ? userData.primary_currency
                          : item.typeMoney,
                        isVisibilityData
                      )}
                    </Text>
                  </VStack>
                  <VStack alignItems="flex-start" spacing={4} width="33%">
                    <Text
                      fontSize="ms"
                      fontWeight="medium"
                      color={
                        item.payment === 'A Pagar' ? 'red.500' : 'green.500'
                      }
                    >
                      {item.payment}
                    </Text>
                    <Text fontSize="ms">{item.category}</Text>
                  </VStack>
                </Box>
              ))}
            </Flex>
          ) : (
            <Empty<Filter> filter={filter} />
          )}
        </>
      )}
    </>
  )
}

export default MobileTable
