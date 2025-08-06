'use client'
import { SubmitHandler } from 'react-hook-form'

import {
  useAddEntrys,
  useDeletedEntry,
  useFetchEntrysData
} from '@/hooks/entrys'
import {
  useAddExpense,
  useFetchExpensesData,
  useDeletedExpense,
  useUpdatedExpense,
  useClearExpenses
} from '@/hooks/expenses'
import { useInvestmentMetrics } from './hooks/useInvestmentMetrics'

import { useSaveReport } from '@/hooks/reports'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { useControlModals } from './hooks/useControlModal'

import { formatToJavaScriptNumber } from '@/utils/formatNumber'
import { formattedValuesSubmitExpense } from './utils'

import { ExpenseData } from '@/services/expenses/getExpenses'
import HeaderDataTableToControl from '@/components/control/HeaderDataTableToControl'
import InfoCardsToControl from '@/components/control/InfoCardsToControl'
import TableMobileAndDesktop from '@/components/control/TableMobileAndDesktop'
import { ModalsControl } from '@/components/control/modals'

export default function Control() {
  const { isVisibilityData } = useIsVisibilityDatas()
  const { userData } = useUserData()

  const { addExpense, isLoadingAddExpense } = useAddExpense()
  const {
    expensesData,
    calculationSumValues,
    setFilter,
    filter,
    isLoadingExpensesData,
    getTotals
  } = useFetchExpensesData()
  const { deletedExpense } = useDeletedExpense()
  const { updatedExpense } = useUpdatedExpense()
  const { clearExpensesData } = useClearExpenses()

  const { entrysData = [], totalEntrys } = useFetchEntrysData()
  const { addEntry } = useAddEntrys()
  const { deletedEntry } = useDeletedEntry()

  const { saveReport } = useSaveReport()

  const { investments } = useInvestmentMetrics(
    calculationSumValues,
    totalEntrys
  )

  const {
    controlModalAddEntry,
    controlModalAddExpense,
    controlModalTotalEntrys,
    controlModalSaveReport,
    controlModalDeleteExpenses,
    controlModalInfoCard,
    handleControlModalExpense,
    configModalExpense
  } = useControlModals()

  const controlModals = {
    controlModalAddEntry,
    controlModalAddExpense,
    controlModalTotalEntrys,
    controlModalSaveReport,
    controlModalDeleteExpenses,
    controlModalInfoCard,
    handleControlModalExpense
  }

  const totalExpenses = getTotals?.value_primary_currency || 0

  const calculateTotalFree = () => {
    const entry = totalEntrys || 0
    const expenses = totalExpenses
    const investmentsTotal = investments.totalInvestments || 0

    return entry - expenses - investmentsTotal
  }

  const onAddExpense: SubmitHandler<ExpenseData> = async (data) => {
    const formattedData = formattedValuesSubmitExpense(data, userData)

    if (configModalExpense.type === 'edit') {
      await updatedExpense(formattedData)
    } else {
      addExpense(formattedData)
    }

    handleControlModalExpense('cancel')
    setFilter('')
  }

  const onAddEntrys: SubmitHandler<{ value: string }> = async ({ value }) => {
    addEntry({ value: formatToJavaScriptNumber(value) })
    controlModalAddEntry.onClose()
  }

  const onDelete = async () => {
    deletedExpense(configModalExpense.selectedData)
    setFilter('')
    handleControlModalExpense('cancel')
    controlModalDeleteExpenses.onClose()
  }

  const onFilter = (value: any) => {
    setFilter(value)
  }

  const onSaveReport = ({
    data,
    period
  }: {
    data: ExpenseData[]
    period: string
  }) => {
    saveReport({
      data,
      period,
      entrys: entrysData || [],
      totalFree: calculateTotalFree(),
      investments,
      totalEntrys,
      totalExpenses
    })
    controlModalSaveReport.onClose()
  }

  return (
    <div className="flex flex-col w-full gap-10 py-4 px-3 mx-auto">
      <div className="w-[93%] lg:w-[97%] mx-auto">
        <InfoCardsToControl
          infoAction={controlModalInfoCard.onOpen}
          totalEntrys={totalEntrys}
          totalExpenses={totalExpenses}
          onOpenTotalEntrys={controlModalTotalEntrys.onOpen}
          investments={investments}
          totalFree={calculateTotalFree()}
        />
      </div>

      <div className="flex flex-col gap-4 w-full">
        <HeaderDataTableToControl
          filter={filter}
          onFilter={onFilter}
          onOpenAddEntry={controlModalAddEntry.onOpen}
          onOpenSaveReport={controlModalSaveReport.onOpen}
          onOpenDeleteExpenses={controlModalDeleteExpenses.onOpen}
          handleControlModalExpense={handleControlModalExpense}
        />

        <TableMobileAndDesktop
          calculationSumValues={calculationSumValues}
          expensesData={expensesData}
          isVisibilityData={isVisibilityData}
          isLoadingExpensesData={isLoadingExpensesData}
          handleControlModalExpense={handleControlModalExpense}
          filter={filter}
        />
      </div>

      <ModalsControl
        controlModals={controlModals}
        configModalExpense={configModalExpense}
        expensesData={expensesData}
        clearExpensesData={clearExpensesData}
        isLoadingAddExpense={isLoadingAddExpense}
        onAddExpense={onAddExpense}
        onDelete={onDelete}
        onAddEntrys={onAddEntrys}
        onSaveReport={onSaveReport}
        entrysData={entrysData}
        deletedEntry={deletedEntry}
      />
    </div>
  )
}
