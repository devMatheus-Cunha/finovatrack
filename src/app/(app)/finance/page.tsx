'use client'

import { Box } from '@chakra-ui/react'
import {
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
import { useUserData } from '@/hooks/globalStates'
import { redirect } from 'next/navigation'

const Finance = () => {
  const {
    investimentsData,
    isLoadingInvestimentsData,
    refetchInvestimentsData
  } = useFetchInvestiments()

  const { financialPlanningYear, isLoadingFinancialPlanningYear } =
    useFetchFinancialPlaningYear()

  const { userData } = useUserData()

  if (userData.id) {
    if (!userData.admin) {
      redirect('/control')
    }
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
            isLoadingInvestimentsData={isLoadingInvestimentsData}
            investments={investimentsData}
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
          <CardToDividends />
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
