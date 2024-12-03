import { Flex, Box, Text, Tabs, TabList, Tab, Input } from '@chakra-ui/react'
import { useMemo } from 'react'
import DatePicker from 'react-datepicker'

interface CardHeader {
  setSelectedDate: (date: Date) => void
  year: number
  formattedDate: string
}

const CardToHeaderFilter = ({
  setSelectedDate,
  year,
  formattedDate
}: CardHeader) => {
  const months = useMemo(() => {
    return [
      { month: 'Janeiro', monthNumber: '01', value: `01/${year}` },
      { month: 'Fevereiro', monthNumber: '02', value: `02/${year}` },
      { month: 'Março', monthNumber: '03', value: `03/${year}` },
      { month: 'Abril', monthNumber: '04', value: `04/${year}` },
      { month: 'Maio', monthNumber: '05', value: `05/${year}` },
      { month: 'Junho', monthNumber: '06', value: `06/${year}` },
      { month: 'Julho', monthNumber: '07', value: `07/${year}` },
      { month: 'Agosto', monthNumber: '08', value: `08/${year}` },
      { month: 'Setembro', monthNumber: '09', value: `09/${year}` },
      { month: 'Outubro', monthNumber: '10', value: `10/${year}` },
      { month: 'Novembro', monthNumber: '11', value: `11/${year}` },
      { month: 'Dezembro', monthNumber: '12', value: `12/${year}` }
    ]
  }, [year])

  return (
    <Box bg="gray.700" px={4} py={6} w="full" rounded="md" color="white">
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Box>
            <Text color="gray.400" fontSize="sm">
              Relatorio Mensal
            </Text>
            <Text fontWeight="semibold">Veja todas os dados por mês</Text>
          </Box>
        </Flex>
        <Flex alignItems="center">
          <DatePicker
            selected={new Date(year, parseInt(formattedDate.split('/')[0]) - 1)}
            showYearPicker
            dateFormat="yyyy"
            onChange={(date: Date) => setSelectedDate(date)}
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
        defaultIndex={months.findIndex((data) => data.value === formattedDate)}
        index={months.findIndex((data) => data.value === formattedDate)}
        onChange={(index) => {
          const selectedMonth = parseInt(months[index].monthNumber) - 1
          setSelectedDate(new Date(year, selectedMonth))
        }}
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

export default CardToHeaderFilter
