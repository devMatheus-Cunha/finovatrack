import { UserData } from '@/hooks/auth/useAuth/types'
import { ExpenseData } from '@/services/expenses/getExpenses'
import {
  formatCurrencyMoney,
  formatToJavaScriptNumber
} from '@/utils/formatNumber'
import React from 'react'
import { IHandleControlModalExpenseFunction } from '../../../hooks/useControlModal'
import { Box, Text, Flex, VStack } from '@chakra-ui/react' // Importe os componentes necessários do Chakra UI
import { ShowAndHide } from '@/components'

interface IMobileTableProps {
  expensesData: ExpenseData[]
  handleOpenModal: IHandleControlModalExpenseFunction
  userData: UserData
  isVisibilityData: boolean
}

const MobileTable: React.FC<IMobileTableProps> = ({
  expensesData,
  handleOpenModal,
  userData,
  isVisibilityData
}) => {
  return (
    <ShowAndHide displayLg="none" displayBase="initial">
      <Flex flexWrap="wrap" gap={4}>
        {expensesData.map((item) => (
          <Box
            key={item.id}
            onClick={() => handleOpenModal('edit', item)}
            height="85px"
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
              <Text fontSize="md" fontWeight="semibold" marginTop="-1">
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
                color={item.payment === 'A Pagar' ? 'red.500' : 'green.500'}
              >
                {item.payment}
              </Text>
              <Text fontSize="ms">{item.category}</Text>
            </VStack>
          </Box>
        ))}
      </Flex>
    </ShowAndHide>
  )
}

export default MobileTable
