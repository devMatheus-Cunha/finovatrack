import React from 'react'
import TableToControl from './TableToControl'
import MobileTable from './MobileTable'
import { ShowAndHide } from '@/components'

interface ITableMobileAndDesktopProps {
  calculationSumValues: any
  expensesData: any
  userData: any
  isVisibilityData: any
  isLoadingExpensesData: any
  handleControlModalExpense: any
  filter: any
}

const TableMobileAndDesktop = ({
  calculationSumValues,
  expensesData,
  userData,
  isVisibilityData,
  isLoadingExpensesData,
  handleControlModalExpense,
  filter
}: ITableMobileAndDesktopProps) => {
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
