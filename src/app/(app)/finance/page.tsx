'use client'

import { Box } from '@chakra-ui/react'
import { useMemo } from 'react'

import FinanceYear from './parts/FinanceYaer'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import useFetchFinancialPlaningYear from '@/hooks/finance/useFetchFinancialPlaningYear'
import { useFetchDividends, useFetchInvestiments } from '@/hooks/finance'
import PatrimonioCard from './parts/PatrimonioCardProps'
import InvestmentsAndDividendsCard from './parts/InvestmentsAndDividendsCard'
import useFetchAllPies from '@/hooks/finance/useFetchAllPies'

const Finance = () => {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()
  const { dividendsData, isLoadingDividendsData, refetchDividendsData } =
    useFetchDividends()

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
    <Box display="flex" flexDirection="column" h="95vh" p={[2, 2, 0]}>
      <Box
        display="flex"
        flexDirection={['column', 'column', 'column', 'row']}
        gap={5}
        p={[2, 2, 0]}
      >
        <Box display="flex" w="100%" gap={6} flexDirection="column">
          <PatrimonioCard
            sumTotalCurrency={sumTotalCurrency}
            primaryCurrency={userData.primary_currency}
            isVisibilityData={isVisibilityData}
            isLoadingFinancialPlanningYear={isLoadingFinancialPlanningYear}
          />
          <InvestmentsAndDividendsCard
            userData={userData}
            investimentsData={investimentsData}
            dividendsData={dividendsData}
            isLoadingInvestimentsData={isLoadingInvestimentsData}
            isLoadingDividendsData={isLoadingDividendsData}
            refetchInvestimentsData={refetchInvestimentsData}
            refetchDividendsData={refetchDividendsData}
            totalsDividendsData={allPiesData[0]?.dividendDetails?.gained}
            isVisibilityData={isVisibilityData}
          />
        </Box>
        <FinanceYear
          investimentsData={investimentsData}
          userData={userData}
          isVisibilityData={isVisibilityData}
          financialPlanningYear={financialPlanningYear}
          isLoadingInvestimentsData={isLoadingFinancialPlanningYear}
        />
      </Box>
    </Box>
  )
}

export default Finance
