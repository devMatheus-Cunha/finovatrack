import React from 'react'
import { IReportData } from '@/services/reports/getReport'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import ExpenseToCategory from './ExpenseToCategory'

const CardToCategoryExpense = ({
  isLoading,
  reportData
}: {
  isLoading: boolean
  reportData: IReportData | null | undefined
}) => {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()

  if (isLoading) {
    return (
      <div className="w-full lg:max-w-xs rounded-md bg-gray-700 h-[214px] lg:h-[555px] animate-pulse" />
    )
  }

  return (
    <>
      {reportData?.data && reportData?.data.length > 0 ? (
        <div className="w-full lg:max-w-xs">
          <ExpenseToCategory
            expensesData={reportData.data}
            userData={userData}
            isVisibilityData={isVisibilityData}
            totalExpenses={reportData?.totalExpenses}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center overflow-y-auto w-full lg:max-w-xs h-[214px] lg:h-[555px] rounded-md bg-gray-700">
          <span className="mt-4 font-bold text-white text-xl lg:text-[23px]">
            Nenhum relatório gerado
          </span>
          <span className="mt-2 text-sm lg:text-md text-gray-300">
            Não há dados disponíveis para este período.
          </span>
        </div>
      )}
    </>
  )
}

export default CardToCategoryExpense
