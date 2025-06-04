'use client'

import React from 'react'
import {
  useFetchInvestiments,
  useFetchFinancialPlaningYear
} from '@/hooks/finance'
import {
  CardToFinanceYaer,
  CardToGoals,
  CardToInvestments,
  CardToPatrimony,
  CardToEmergencyReserveMonths
} from './cards'
import { useUserData } from '@/hooks/globalStates'
import { redirect } from 'next/navigation'
import useFetchReportsToYearData from '@/hooks/reports/useFetchReportsToYearData_'

const Finance = () => {
  const { userData } = useUserData()
  const currentYear = new Date().getFullYear().toString()
  const { reportDataToYear, isLoading: isLoadingReportDataToYear } =
    useFetchReportsToYearData(currentYear)

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

  const currentMonth = new Date().getMonth() + 1 // Janeiro = 0, então soma 1
  const totalExpensesAjustado = reportDataToYear?.totalExpenses
    ? reportDataToYear.totalExpenses - 1000
    : 0
  const mediaGastoMensalTotal =
    totalExpensesAjustado && currentMonth > 0
      ? totalExpensesAjustado / currentMonth
      : 0

  return (
    <div className="flex flex-col gap-2 h-[95vh] w-full px-2 lg:px-0 ">
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="w-full lg:w-[45%] flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="w-full sm:w-[65%]">
              <CardToPatrimony
                isLoadingInvestimentsData={isLoadingInvestimentsData}
                investments={investimentsData}
              />
            </div>
            <div className="w-full sm:w-[35%]">
              <CardToEmergencyReserveMonths
                isLoading={isLoadingInvestimentsData || isLoadingReportDataToYear}
                valorReservaEmergencia={investimentsData?.reserva}
                mediaGastoMensalTotal={mediaGastoMensalTotal}
              />
            </div>
          </div>
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
          <CardToGoals
            investimentsData={investimentsData}
            financialPlanningYear={financialPlanningYear}
          />
        </div>
      </div>
    </div>
  )
}

export default Finance
