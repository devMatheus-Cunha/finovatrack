import { ShowAndHide } from '@/components'
import { ExpenseData } from '@/services/expenses/getExpenses'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { SimpleGrid, VStack, Box, Text } from '@chakra-ui/react'
import { TableColumn } from '@/components/common/Table'
import { UserData } from '@/hooks/entrys/useDeletedEntry/auth/useAuth/types'
import React from 'react'

interface ITableReportsProps {
  data: ExpenseData[]
  colums: TableColumn[]
  userData: UserData
  isVisibilityData: boolean
}

const TableReports: React.FC<ITableReportsProps> = ({
  data,
  userData,
  isVisibilityData
}) => {
  return (
    <ShowAndHide displayLg="none" displayBase="initial">
      <SimpleGrid columns={1} spacing={2} maxH={278} overflow="auto">
        {data?.map((item) => (
          <React.Fragment key={item.id}>
            {item.value_primary_currency && (
              <Box
                key={item.id}
                bg="gray.700"
                borderRadius="lg"
                p={4}
                h="85px"
                w="full"
                justifyContent="space-between"
                display="flex"
                alignItems="center"
              >
                <VStack spacing={4} align="start">
                  <Text fontSize="ms">{item?.description}</Text>
                  <Text fontSize="m" fontWeight="semibold">
                    {formatCurrencyMoney(
                      Number(item?.value_primary_currency),
                      userData.typeAccount === 'oneCurrency'
                        ? userData.primary_currency
                        : item?.typeMoney,
                      isVisibilityData
                    )}
                  </Text>
                </VStack>
                <VStack spacing={4} align="start" w="33%">
                  <Text
                    fontSize="ms"
                    fontWeight="medium"
                    color={
                      item?.payment === 'A Pagar' ? 'red.500' : 'green.500'
                    }
                  >
                    {item?.payment}
                  </Text>
                </VStack>
              </Box>
            )}
          </React.Fragment>
        ))}
      </SimpleGrid>
    </ShowAndHide>
  )
}

export default TableReports
