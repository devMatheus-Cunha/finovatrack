'use client'

import { FolderOpen } from '@phosphor-icons/react'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { Button } from '@/components'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { useFetchReportsData } from '@/hooks/reports'
import { optionsCurrencyKeyAndValue } from '@/utils/configCurrency'
import Table, { TableColumn } from '@/components/Table'
import {
  Box,
  Show,
  VStack,
  Text,
  SimpleGrid,
  Heading,
  WrapItem,
  Wrap
} from '@chakra-ui/react'

function Reports() {
  const { userData } = useUserData()
  const [selectedPeriod, setSelectedPeriod] = useState(new Date())
  const { isVisibilityData } = useIsVisibilityDatas()

  const { reportData, setPeriod } = useFetchReportsData()

  const [data] = reportData ?? []

  function onChangeDate(date: Date) {
    setSelectedPeriod(date)
  }

  const onSubmit = (date: Date) => {
    const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
      month: '2-digit',
      year: 'numeric'
    })

    setPeriod(formattedDate)
  }

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
        header: 'Categoria',
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
  const renderSummaryItem = (label: string, value: string) => (
    <WrapItem>
      <Text color="gray.300">
        {label}:{' '}
        <Text as="span" color="white" fontStyle="italic">
          {isVisibilityData ? value : '****'}
        </Text>
      </Text>
    </WrapItem>
  )

  return (
    <div className=" w-[100%]">
      <div className="flex items-center flex-col w-[100%] gap-4 md:gap-10 p-3">
        <div className="p-4 flex h-auto gap-4 bg-gray-800 rounded-lg flex-col md:w-[40%]">
          <h2>Escolha um período para solicitar um relatório:</h2>
          <div className="flex gap-2 md:gap-4 bg-gray-800 rounded-lg justify-center items-center">
            <DatePicker
              selected={selectedPeriod}
              onChange={(date: Date) => onChangeDate(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              className="border text-sm rounded-lg w-full p-1.5 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            />

            <Button
              onClick={() => onSubmit(selectedPeriod)}
              leftIcon={<FolderOpen size={20} color="white" />}
              size="md"
              fontSize="md"
              variant="default700"
            >
              Solicitar Relatório
            </Button>
          </div>
        </div>
        <div className="w-[95%]">
          {data ? (
            <div className="flex flex-col gap-4">
              {data && (
                <VStack align="stretch" spacing={4}>
                  <Heading size="md">
                    Relatório referente ao período{' '}
                    <Text as="span" fontStyle="italic">
                      {data.period}
                    </Text>
                  </Heading>
                  <Wrap spacing={2} spacingY={4}>
                    {renderSummaryItem('Total Entradas', data.totalEntrys)}

                    {userData.typeAccount === 'hybrid' &&
                      renderSummaryItem(
                        `Total gastos em ${userData.secondary_currency}`,
                        data.totalExpenseEurToReal
                      )}

                    {renderSummaryItem('Total Gastos', data.totalExpenses)}
                    {renderSummaryItem('Total Livre', data.totalInvested)}

                    {userData.typeAccount === 'hybrid' &&
                      renderSummaryItem('Cotação Usada', data.quatation)}
                  </Wrap>
                </VStack>
              )}

              <Box
                overflowY="auto"
                maxH="62vh"
                borderRadius={{ sm: 'lg' }}
                w="100%"
                bg={{ lg: 'gray.800' }}
              >
                {data?.data?.length > 0 ? (
                  <>
                    <Show above="lg">
                      <Table columns={columsHeadProps()} data={data?.data} />
                    </Show>
                    <Show below="lg">
                      <SimpleGrid columns={1} spacing={4}>
                        {data?.data.map((item) => (
                          <>
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
                                      item?.payment === 'A Pagar'
                                        ? 'red.500'
                                        : 'green.500'
                                    }
                                  >
                                    {item?.payment}
                                  </Text>
                                </VStack>
                              </Box>
                            )}
                          </>
                        ))}
                      </SimpleGrid>
                    </Show>
                  </>
                ) : (
                  <Text align="center" fontSize="2xl">
                    Não há nenhum dado na tabela!
                  </Text>
                )}
              </Box>
            </div>
          ) : (
            <VStack h="full" alignItems="center" justifyContent="center">
              <Heading
                mt={4}
                size={{ base: 'md', md: 'xl' }}
                fontWeight="bold"
                color="white"
              >
                Nenhum relatório gerado
              </Heading>
              <Text mt={2} fontSize="md" color="gray.300">
                Não há dados disponíveis para este período.
              </Text>
            </VStack>
          )}
        </div>
      </div>
    </div>
  )
}

export default Reports
