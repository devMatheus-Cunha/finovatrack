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
  CardToEmergencyReserveMonths,
  CardProjecao
} from './cards'
import useFetchReportsToYearData from '@/hooks/reports/useFetchReportsToYearData'

const Finance = () => {
  const currentYear = new Date().getFullYear().toString()
  const { reportDataToYear, isLoading: isLoadingReportDataToYear } =
    useFetchReportsToYearData(currentYear)

  const {
    investimentsData,
    isLoadingInvestimentsData,
    refetchInvestimentsData,
    isUpdatingInvestments
  } = useFetchInvestiments()

  const { financialPlanningYear, isLoadingFinancialPlanningYear } =
    useFetchFinancialPlaningYear()

  return (
    <div className="flex flex-col gap-2 h-[95vh] w-full px-2 lg:px-0 ">
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="w-full lg:w-[55%] flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="w-full sm:w-[65%]">
              <CardToPatrimony
                isLoadingInvestimentsData={isLoadingInvestimentsData}
                investments={investimentsData}
              />
            </div>
            <div className="w-full sm:w-[35%]">
              <CardToEmergencyReserveMonths
                isLoading={
                  isLoadingInvestimentsData || isLoadingReportDataToYear
                }
                valorReservaEmergencia={
                  investimentsData?.patrimonio?.reservaExterna
                }
                mediaGastoMensalTotal={reportDataToYear?.mediaExpenses}
              />
            </div>
          </div>

          <div className="hidden lg:block">
            <CardToFinanceYaer
              financialPlanningYear={financialPlanningYear}
              isLoadingInvestimentsData={isLoadingFinancialPlanningYear}
            />
          </div>
        </div>

        <div className="flex w-full lg:w-[55%] gap-2 flex-col md:flex-row lg:flex-col xl:flex-row">
          <CardToInvestments
            investimentsData={investimentsData}
            isLoadingInvestimentsData={isLoadingInvestimentsData}
            refetchInvestimentsData={refetchInvestimentsData}
            isLoadingIcon={isUpdatingInvestments}
          />
        </div>
      </div>
      <div className="flex w-full gap-2 flex-col md:flex-row lg:flex-col xl:flex-row">
        <CardProjecao
          financialPlanningYear={financialPlanningYear}
          investimentsData={investimentsData}
          isLoadingInvestimentsData={isLoadingInvestimentsData}
        />
        <CardToGoals
          investimentsData={investimentsData}
          financialPlanningYear={financialPlanningYear}
        />
      </div>
      <div className="block lg:hidden">
        <CardToFinanceYaer
          financialPlanningYear={financialPlanningYear}
          isLoadingInvestimentsData={isLoadingFinancialPlanningYear}
        />
      </div>
    </div>
  )
}

export default Finance
