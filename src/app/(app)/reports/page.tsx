'use client'

import { FolderOpen } from '@phosphor-icons/react'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
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
  FormControl,
  Button,
  Icon,
  Input
} from '@chakra-ui/react'
import InfoCardsToReport from './parts/InfoCardsToReport'

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

  const summaryItems = [
    { label: 'Total Entradas', value: data?.totalEntrys },
    { label: 'Total Gastos', value: data?.totalExpenses },
    { label: 'Total Livre', value: data?.totalFree },
    {
      label: 'Total Investido',
      value: formatCurrencyMoney(
        data?.investments?.totalInvestments,
        userData?.primary_currency
      )
    },
    {
      label: 'Foi investido',
      value: `${data?.investments?.investmentPercentageFormat}`
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
    <>
      <Box width="100%">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
          p="3"
          gap={{ base: '4', md: '10' }}
        >
          <Box
            p={6}
            bg="gray.700"
            borderRadius="lg"
            flexDirection="column"
            maxW={{ base: 'full', md: '40%' }}
          >
            <Heading size="sm" mb="2">
              Escolha um período para solicitar um relatório:
            </Heading>

            <Box display="flex" p={2} gap={2}>
              <FormControl flex={2}>
                <DatePicker
                  selected={selectedPeriod}
                  onChange={(date: Date) => onChangeDate(date)}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  customInput={
                    <Input variant="filled" _focus={{ boxShadow: 'none' }} />
                  }
                />
              </FormControl>

              <Button
                onClick={() => onSubmit(selectedPeriod)}
                leftIcon={<Icon as={FolderOpen} />}
                flex={1}
              >
                Solicitar
              </Button>
            </Box>
          </Box>

          <Box w="97%">
            {data ? (
              <Box className="flex flex-col gap-7">
                <InfoCardsToReport data={data} userData={userData} />
                <Box
                  overflowY="auto"
                  maxH="62vh"
                  minH={{ base: 'auto', md: '62vh' }}
                  borderRadius={{ sm: 'lg' }}
                  w="100%"
                  bg={{ lg: 'gray.700' }}
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
                                    <Text fontSize="ms">
                                      {item?.description}
                                    </Text>
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
              </Box>
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
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Reports
