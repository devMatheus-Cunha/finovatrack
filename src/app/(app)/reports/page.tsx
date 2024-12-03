'use client'

import { useFetchReportsData } from '@/hooks/reports'
import { Box } from '@chakra-ui/react'
import {
  CardToCategoryExpense,
  CardToHeaderFilter,
  CardToStatsInMonth,
  CardToTableExpenses
} from './cards'

function Reports() {
  const { reportData, setSelectedDate, year, formattedDate, isLoading } =
    useFetchReportsData()

  return (
    <Box display="flex" flexDirection="column" width="100%" p={2} gap={2}>
      {/* <CardToStatsInYear reportData={reportData} isLoading={isLoading} /> */}
      <CardToHeaderFilter
        setSelectedDate={setSelectedDate}
        year={year}
        formattedDate={formattedDate}
      />

      <Box display="flex" flexDir={{ base: 'column', lg: 'row' }} gap={2}>
        <Box display="flex" flexDir="column" gap={2}>
          <CardToStatsInMonth reportData={reportData} isLoading={isLoading} />
          <CardToTableExpenses reportData={reportData} isLoading={isLoading} />
        </Box>
        <CardToCategoryExpense reportData={reportData} isLoading={isLoading} />
      </Box>
    </Box>
  )
}

export default Reports
