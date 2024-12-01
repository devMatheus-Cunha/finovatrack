import React from 'react'
import TableToControl from './TableToControl'
import MobileTable from './MobileTable'
import { ShowAndHide } from '@/components'
import { useUserData } from '@/hooks/globalStates'

interface ITableMobileAndDesktopProps {
  calculationSumValues: any
  expensesData: any
  isVisibilityData: any
  isLoadingExpensesData: any
  handleControlModalExpense: any
  filter: any
}

const TableMobileAndDesktop = ({
  calculationSumValues,
  expensesData,
  isVisibilityData,
  isLoadingExpensesData,
  handleControlModalExpense,
  filter
}: ITableMobileAndDesktopProps) => {
  const { userData } = useUserData()

  return (
    <>
      <ShowAndHide displayLg="initial" displayBase="none">
        <TableToControl
          calculationSumValues={
            userData.typeAccount === 'hybrid'
              ? calculationSumValues
              : expensesData
          }
          userData={userData}
          handleOpenModal={handleControlModalExpense}
          isVisibilityData={isVisibilityData}
          filter={filter}
          isLoadingExpensesData={isLoadingExpensesData}
        />
      </ShowAndHide>

      <ShowAndHide displayLg="none" displayBase="initial">
        <MobileTable
          calculationSumValues={
            userData.typeAccount === 'hybrid'
              ? calculationSumValues
              : expensesData
          }
          userData={userData}
          handleOpenModal={handleControlModalExpense}
          isVisibilityData={isVisibilityData}
          filter={filter}
          isLoadingExpensesData={isLoadingExpensesData}
        />
      </ShowAndHide>
    </>
  )
}

export default TableMobileAndDesktop
