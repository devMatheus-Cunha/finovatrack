'use client'

import React from 'react'
import {
  useFetchInvestiments,
  useFetchFinancialPlaningYear
} from '@/hooks/finance'
import {
  CardToDividends,
  CardToFinanceYaer,
  CardToGoals,
  CardToInvestments,
  CardToPatrimony
} from './cards'
import { useUserData } from '@/hooks/globalStates'
import { redirect } from 'next/navigation'

const Finance = () => {
  const { userData } = useUserData()

  const {
    investimentsData,
    isLoadingInvestimentsData,
    refetchInvestimentsData
  } = useFetchInvestiments()

  const { financialPlanningYear, isLoadingFinancialPlanningYear } =
    useFetchFinancialPlaningYear()

  if (userData.id) {
    if (!userData.admin) {
      redirect('/control')
    }
  }

  return (
    <div className="flex flex-col gap-2 h-[95vh] w-full px-2 md:px-2 lg:px-0 ">
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="w-full lg:w-[45%] flex flex-col gap-2">
          <CardToPatrimony
            isLoadingInvestimentsData={isLoadingInvestimentsData}
            investments={investimentsData}
          />
          <CardToFinanceYaer
            financialPlanningYear={financialPlanningYear}
            isLoadingInvestimentsData={isLoadingFinancialPlanningYear}
          />
        </div>
        <div className="flex w-full lg:w-[55%] gap-2 flex-col md:flex-row lg:flex-col xl:flex-row">
          <CardToInvestments
            investimentsData={investimentsData}
            isLoadingInvestimentsData={isLoadingInvestimentsData}
            isLoadingAllPies={isLoadingInvestimentsData}
            refetchInvestimentsData={refetchInvestimentsData}
          />
          <CardToDividends />
        </div>
      </div>
      <div>
        <CardToGoals investimentsData={investimentsData} />
      </div>
    </div>
  )
}

export default Finance
