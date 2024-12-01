'use client'

import { Box } from '@chakra-ui/react'
import {
  useFetchDividends,
  useFetchInvestiments,
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

  const { financialPlanningYear, isLoadingFinancialPlanningYear } =
    useFetchFinancialPlaningYear()

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
            isLoadingInvestimentsData={isLoadingInvestimentsData}
            investments={investimentsData}
            investmentValue={
              (investimentsData?.pies &&
                investimentsData?.pies?.result?.priceAvgValue) ||
              0
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
            isLoadingAllPies={isLoadingInvestimentsData}
            refetchInvestimentsData={refetchInvestimentsData}
          />
          <CardToDividends
            dividendsData={dividendsData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isLoadingDividendsData={isLoadingDividendsData}
            refetchDividendsData={refetchDividendsData}
          />
        </Box>
      </Box>
      <Box>
        <CardToGoals
          isLoadingInvestimentsData={isLoadingInvestimentsData}
          refetchInvestimentsData={refetchInvestimentsData}
          investments={investimentsData}
          millenium={
            financialPlanningYear && Number(financialPlanningYear[0].reserve)
          }
        />
      </Box>
    </Box>
  )
}

export default Finance
