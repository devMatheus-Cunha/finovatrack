'use client'

import { Box } from '@chakra-ui/react'
import { useMemo } from 'react'

import FinanceYear from './parts/FinanceYaer'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import useFetchFinancialPlaningYear from '@/hooks/finance/useFetchFinancialPlaningYear'
import { useFetchDividends, useFetchInvestiments } from '@/hooks/finance'
import PatrimonioCard from './parts/PatrimonioCard'
import useFetchAllPies from '@/hooks/finance/useFetchAllPies'
import { Dividendos } from './parts/Dividendos'
import { Investments } from './parts/Investments'

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

  const { allPiesData } = useFetchAllPies()

  const { financialPlanningYear, isLoadingFinancialPlanningYear } =
    useFetchFinancialPlaningYear()

  const sumTotalCurrency = useMemo(() => {
    return financialPlanningYear && financialPlanningYear.length > 0
      ? financialPlanningYear[0].reserve + investimentsData?.total
      : 0
  }, [financialPlanningYear, investimentsData?.total])

  return (
    <Box display="flex" flexDirection="column" gap={5} h="95vh" p={[2, 2, 0]}>
      <Box
        display="flex"
        flexDirection={['column', 'column', 'column', 'row']}
        gap={5}
        p={[2, 2, 0]}
      >
        <Box
          w={{ base: '100%', lg: '45%' }}
          display="flex"
          flexDir="column"
          gap={4}
        >
          <PatrimonioCard
            primaryCurrency={userData.primary_currency}
            sumTotalCurrency={sumTotalCurrency}
            isVisibilityData={isVisibilityData}
            isLoadingFinancialPlanningYear={isLoadingFinancialPlanningYear}
            investmentFree={investimentsData?.free}
            investmentValue={
              (allPiesData && allPiesData[0]?.result.investedValue) || 0
            }
            wise={
              financialPlanningYear && Number(financialPlanningYear[0].reserve)
            }
          />
          <FinanceYear
            investimentsData={investimentsData}
            userData={userData}
            isVisibilityData={isVisibilityData}
            financialPlanningYear={financialPlanningYear}
            isLoadingInvestimentsData={isLoadingFinancialPlanningYear}
          />
        </Box>
        <Box
          display="flex"
          w={{ base: '100%', lg: '55%' }}
          gap={4}
          flexDirection={['column', 'column', 'row', 'column', 'row']}
        >
          <Investments
            userData={userData}
            investimentsData={investimentsData}
            isLoadingInvestimentsData={isLoadingInvestimentsData}
            refetchInvestimentsData={refetchInvestimentsData}
            allPiesData={allPiesData && allPiesData[0]}
            isVisibilityData={isVisibilityData}
          />
          <Dividendos
            userData={userData}
            dividendsData={dividendsData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isLoadingDividendsData={isLoadingDividendsData}
            refetchDividendsData={refetchDividendsData}
            isVisibilityData={isVisibilityData}
            allPiesData={allPiesData && allPiesData[0]}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Finance
