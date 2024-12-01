'use client'

import { useMemo } from 'react'
import { Box } from '@chakra-ui/react'
import {
  useFetchDividends,
  useFetchInvestiments,
  useFetchAllPies,
  useFetchFinancialPlaningYear
} from '@/hooks/finance'
import {
  CardToDividends,
  CardToFinanceYaer,
  CardToGoals,
  CardToInvestments,
  CardToPatrimonio
} from './cards'

const Finance = () => {
  const {
    dividendsData,
    isLoadingDividendsData,
    refetchDividendsData,
    currentPage,
    setCurrentPage
  } = useFetchDividends()

  const {
    investimentsData,
    isLoadingInvestimentsData,
    refetchInvestimentsData
  } = useFetchInvestiments()

  const { allPiesData, refetchAllPies, isLoadingAllPies } = useFetchAllPies()

  const { financialPlanningYear, isLoadingFinancialPlanningYear } =
    useFetchFinancialPlaningYear()

  const sumTotalCurrency = useMemo(() => {
    return financialPlanningYear && financialPlanningYear.length > 0
      ? financialPlanningYear[0].reserve + investimentsData?.total
      : 0
  }, [financialPlanningYear, investimentsData?.total])

  const updatedData = () => {
    refetchAllPies()
    refetchInvestimentsData()
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      h="95vh"
      w="full"
      px={[2, 2, 0]}
    >
      <Box
        display="flex"
        flexDirection={['column', 'column', 'column', 'row']}
        gap={2}
      >
        <Box
          w={{ base: '100%', lg: '45%' }}
          display="flex"
          flexDir="column"
          gap={2}
        >
          <CardToPatrimonio
            sumTotalCurrency={sumTotalCurrency}
            isLoadingFinancialPlanningYear={isLoadingFinancialPlanningYear}
            isLoadingInvestimentsData={isLoadingInvestimentsData}
            isLoadingAllPies={isLoadingAllPies}
            investmentFree={investimentsData?.free}
            investmentValue={
              (allPiesData && allPiesData?.result.priceAvgValue) || 0
            }
            millenium={
              financialPlanningYear && Number(financialPlanningYear[0].reserve)
            }
          />
          <CardToFinanceYaer
            financialPlanningYear={financialPlanningYear}
            isLoadingInvestimentsData={isLoadingFinancialPlanningYear}
          />
        </Box>
        <Box
          display="flex"
          w={{ base: '100%', lg: '55%' }}
          gap={2}
          flexDirection={['column', 'column', 'row', 'column', 'row']}
        >
          <CardToInvestments
            investimentsData={investimentsData}
            isLoadingInvestimentsData={isLoadingInvestimentsData}
            isLoadingAllPies={isLoadingAllPies}
            refetchInvestimentsData={updatedData}
            allPiesData={allPiesData && allPiesData}
          />
          <CardToDividends
            dividendsData={dividendsData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isLoadingDividendsData={isLoadingDividendsData}
            refetchDividendsData={refetchDividendsData}
            allPiesData={allPiesData && allPiesData}
          />
        </Box>
      </Box>
      <Box>
        <CardToGoals
          isLoadingInvestimentsData={isLoadingInvestimentsData}
          refetchInvestimentsData={refetchInvestimentsData}
          allPiesData={allPiesData}
          investmentFree={investimentsData?.free}
          millenium={
            financialPlanningYear && Number(financialPlanningYear[0].reserve)
          }
        />
      </Box>
    </Box>
  )
}

export default Finance
