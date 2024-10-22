import { Flex, Box, Text, Tabs, TabList, Tab, Input } from '@chakra-ui/react'
import { useState } from 'react'
import DatePicker from 'react-datepicker'

interface CardHeader {
  onSubmit: any
  period: string
}

function HeaderFilter({ onSubmit, period }: CardHeader) {
  const [year, setYear] = useState(new Date())

  const months = [
    { month: 'Janeiro', value: '01/2024' },
    { month: 'Fevereiro', value: '02/2024' },
    { month: 'Março', value: '03/2024' },
    { month: 'Abril', value: '04/2024' },
    { month: 'Maio', value: '05/2024' },
    { month: 'Junho', value: '06/2024' },
    { month: 'Julho', value: '07/2024' },
    { month: 'Agosto', value: '08/2024' },
    { month: 'Setembro', value: '09/2024' },
    { month: 'Outubro', value: '10/2024' },
    { month: 'Novembro', value: '11/2024' },
    { month: 'Dezembro', value: '12/2024' }
  ]

  return (
    <Box bg="gray.700" px={4} py={6} w="full" rounded="md">
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Box>
            <Text color="gray.400" fontSize="sm">
              Relatorio
            </Text>
            <Text fontWeight="semibold">Veja todas informações</Text>
          </Box>
        </Flex>
        <Flex alignItems="center">
          <DatePicker
            selected={year}
            showYearPicker
            dateFormat="yyyy"
            onChange={(date: Date) => setYear(date)}
            customInput={
              <Input variant="flushed" w={100} _focus={{ boxShadow: 'none' }} />
            }
          />
        </Flex>
      </Flex>

      <Tabs
        mt="6"
        align="start"
        variant="unstyled"
        overflow="auto"
        defaultIndex={months.findIndex((month) => month.value === period)}
        onChange={(value) => onSubmit(months[value].value)}
        sx={{
          '.chakra-tabs__tab-list': {
            borderBottom: '2px solid',
            borderColor: 'gray.700'
          },
          '.chakra-tabs__tab': {
            px: 4,
            py: 2,
            borderBottom: '2px solid transparent',
            _selected: {
              color: 'blue.500',
              borderBottomColor: 'blue.500',
              fontWeight: 'bold'
            }
          }
        }}
      >
        <TabList>
          {months.map((month) => (
            <Tab key={month.value} value={month.value}>
              {month.month}
            </Tab>
          ))}
        </TabList>

        {/* <TabPanels mt="4">
          {months.map((month) => (
            <TabPanel key={month.value} onChange={() => onSubmit(month.value)}>
              <Text>Conteúdo da aba {month.value}</Text>
            </TabPanel>
          ))}
        </TabPanels> */}
      </Tabs>
    </Box>
  )
}

export default HeaderFilter
