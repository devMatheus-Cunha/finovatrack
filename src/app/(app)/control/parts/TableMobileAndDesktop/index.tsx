import React from 'react'
import TableToControl from './TableToControl'
import MobileTable from './MobileTable'
import { Show } from '@chakra-ui/react'

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
      <Show above="lg">
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
      </Show>

      <Show below="lg">
        <MobileTable
          expensesData={expensesData}
          handleOpenModal={handleControlModalExpense}
          userData={userData}
          isVisibilityData={isVisibilityData}
        />
      </Show>
    </>
  )
}

export default TableMobileAndDesktop
