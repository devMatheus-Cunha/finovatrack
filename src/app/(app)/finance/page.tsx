'use client'

import { Box } from '@chakra-ui/react'
import { useMemo } from 'react'

import FinanceYear from './parts/FinanceYaer'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import useFetchFinancialPlaningYear from '@/hooks/finance/useFetchFinancialPlaningYear'
import { useFetchDividends, useFetchInvestiments } from '@/hooks/finance'
import PatrimonioCard from './parts/PatrimonioCard'
import useFetchAllPies from '@/hooks/finance/useFetchAllPies'
import { Dividends } from './parts/Dividends'
import { Investments } from './parts/Investments'
import { Goals } from './parts/Goals'

const Finance = () => {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()
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
          <PatrimonioCard
            primaryCurrency={userData.primary_currency}
            sumTotalCurrency={sumTotalCurrency}
            isVisibilityData={isVisibilityData}
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
          <FinanceYear
            userData={userData}
            isVisibilityData={isVisibilityData}
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
          <Investments
            userData={userData}
            investimentsData={investimentsData}
            isLoadingInvestimentsData={isLoadingInvestimentsData}
            isLoadingAllPies={isLoadingAllPies}
            refetchInvestimentsData={updatedData}
            allPiesData={allPiesData && allPiesData}
            isVisibilityData={isVisibilityData}
          />
          <Dividends
            userData={userData}
            dividendsData={dividendsData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isLoadingDividendsData={isLoadingDividendsData}
            refetchDividendsData={refetchDividendsData}
            isVisibilityData={isVisibilityData}
            allPiesData={allPiesData && allPiesData}
          />
        </Box>
      </Box>
      <Box>
        <Goals
          userData={userData}
          isLoadingInvestimentsData={isLoadingInvestimentsData}
          refetchInvestimentsData={refetchInvestimentsData}
          allPiesData={allPiesData}
          isVisibilityData={isVisibilityData}
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
