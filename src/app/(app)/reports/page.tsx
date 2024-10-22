'use client'

import { formatCurrencyMoney } from '@/utils/formatNumber'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { useFetchReportsData } from '@/hooks/reports'
import { optionsCurrencyKeyAndValue } from '@/utils/configCurrency'
import { TableColumn } from '@/components/Table'
import { Box, Heading, Skeleton, VStack, Text } from '@chakra-ui/react'
import InfoCardsToReport from './parts/InfoCardsToReport'
import EmptyWithoutReport from './parts/EmptyWithoutReport'
import HeaderFilter from './parts/HeaderFilter'
import TableDesktopReports from './parts/TableDesktopReports'
import TableMobileReports from './parts/TableMobileReports'
import ExpenseToCategory from './parts/ExpenseToCategory'

function Reports() {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()

  const { reportData, setPeriod, period, isLoading } = useFetchReportsData()

  const [data] = reportData ?? []

  const expensesData = data?.data ?? []

  const columsHeadProps = (): TableColumn[] => {
    const columns = [
      {
        header: 'Descrição',
        field: 'description'
      },
      {
        header: optionsCurrencyKeyAndValue[userData.primary_currency],
        field: 'value_primary_currency',
        modifier: (value: number) =>
          formatCurrencyMoney(
            value,
            userData?.primary_currency,
            isVisibilityData
          )
      },
      {
        header: 'category',
        field: 'category',
        modifier: (value: string) => value ?? '-'
      },
      {
        header: 'Status',
        field: 'payment',
        styles: (value: string) => ({
          color: value === 'A Pagar' ? 'red' : 'green'
        })
      }
    ]

    if (userData.typeAccount === 'hybrid') {
      columns.splice(2, 0, {
        header: optionsCurrencyKeyAndValue[userData.secondary_currency],
        field: 'value_secondary_currency',
        modifier: (value: number) =>
          formatCurrencyMoney(
            value,
            userData.secondary_currency,
            isVisibilityData
          )
      })
    }

    return columns
  }

  const summaryItems = [
    { label: 'Total Entradas', value: data?.totalEntrys },
    { label: 'Total Gastos', value: data?.totalExpenses },
    { label: 'Total Livre', value: data?.totalFree },
    {
      label: 'Total Investido',
      value: formatCurrencyMoney(
        data?.investments?.totalInvestments,
        userData?.primary_currency
      ),
      investments: `${data?.investments?.investmentPercentageFormat}`
    }
  ]

  if (userData?.typeAccount === 'hybrid') {
    summaryItems.push(
      {
        label: `Total gastos em ${userData?.secondary_currency}`,
        value: data?.totalExpenseEurToReal
      },
      { label: 'Cotação Usada', value: data?.quatation }
    )
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      p={2}
      gap={{ base: '4', md: '5' }}
    >
      <HeaderFilter onSubmit={setPeriod} period={period} />

      {/* <StatiscExpense expensesData={[]} /> */}

      <Box
        display="flex"
        flexDir={{ base: 'column', lg: 'row' }}
        gap={{ base: 2, lg: 3 }}
      >
        <Box
          display="flex"
          w={{ base: '100%', lg: '50%' }}
          flexDir="column"
          gap={2}
        >
          {isLoading ? (
            <Skeleton
              height={{ base: 214, lg: 227 }}
              w={{ base: 374, lg: 797.03 }}
              rounded="lg"
            />
          ) : (
            <>
              {expensesData && expensesData.length > 0 ? (
                <InfoCardsToReport
                  data={data}
                  userData={userData}
                  isLoading={isLoading}
                />
              ) : (
                <VStack
                  h="full"
                  alignItems="center"
                  justifyContent="center"
                  overflowY="auto"
                  minH={{ base: 'auto', md: '18.3vh' }}
                  rounded="md"
                  w="100%"
                  bg={{ lg: 'gray.700' }}
                >
                  <Text mt={4} fontWeight="bold" fontSize={30} color="white">
                    Nenhum relatório gerado
                  </Text>
                  <Text mt={2} fontSize="md" color="gray.300">
                    Não há dados disponíveis para este período.
                  </Text>
                </VStack>
              )}
            </>
          )}
          {isLoading ? (
            <Skeleton
              height={{ base: 278, lg: 518 }}
              w={{ base: 374, lg: 797.03 }}
              rounded="lg"
            />
          ) : (
            <Box>
              {expensesData && expensesData.length > 0 ? (
                <>
                  <TableDesktopReports
                    data={expensesData}
                    colums={columsHeadProps()}
                    userData={userData}
                    isVisibilityData={isVisibilityData}
                  />
                  <TableMobileReports
                    data={expensesData}
                    colums={columsHeadProps()}
                    userData={userData}
                    isVisibilityData={isVisibilityData}
                  />
                </>
              ) : (
                <EmptyWithoutReport />
              )}
            </Box>
          )}
        </Box>

        <Box flex={1}>
          {isLoading ? (
            <Skeleton
              w={{ base: 374, lg: 353.25 }}
              h={{ base: 551, lg: 573.5 }}
              rounded="md"
            />
          ) : (
            <>
              {expensesData && expensesData.length > 0 ? (
                <ExpenseToCategory
                  expensesData={expensesData}
                  userData={userData}
                  isVisibilityData={isVisibilityData}
                  totalExpenses={data?.totalExpenses}
                />
              ) : (
                <VStack
                  alignItems="center"
                  justifyContent="center"
                  overflowY="auto"
                  w={{ base: 374, lg: 353.25 }}
                  h={{ base: 551, lg: 573.5 }}
                  rounded="md"
                  bg={{ lg: 'gray.700' }}
                >
                  <Text mt={4} fontWeight="bold" fontSize={23} color="white">
                    Nenhum relatório gerado
                  </Text>
                  <Text mt={2} fontSize="sm" color="gray.300">
                    Não há dados disponíveis para este período.
                  </Text>
                </VStack>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Reports
