'use client'
import { useMemo } from 'react'
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
import { useFetchQuatationEur } from '@/hooks/quatation'

import { useSaveReport } from '@/hooks/reports'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { useControlModals } from './hooks/useControlModal'

import {
  convertEurToReal,
  formatToJavaScriptNumber
} from '@/utils/formatNumber'
import {
  formattedValuesSubmitExpense,
  useCalculationSumValues,
  useGetTotalsFree
} from './utils'

import HeaderDataTableToControl from './parts/HeaderDataTableToControl'
import InfoCardsToControl from './parts/InfoCardsToControl'
import TableMobileAndDesktop from './parts/TableMobileAndDesktop'

import { ExpenseData } from '@/services/expenses/getExpenses'
import { Box } from '@chakra-ui/react'
import { ModalsControl } from './modals'

export default function Control() {
  const { isVisibilityData } = useIsVisibilityDatas()
  const { userData } = useUserData()
  const { typeAccount } = userData

  const { addExpense, isLoadingAddExpense } = useAddExpense()
  const {
    expensesData = [],
    setFilter,
    filter,
    isLoadingExpensesData
  } = useFetchExpensesData()
  const { deletedExpense } = useDeletedExpense()
  const { updatedExpense } = useUpdatedExpense()

  const { entrysData = [], sumTotalEntry } = useFetchEntrysData()
  const { addEntry } = useAddEntrys()
  const { deletedEntry } = useDeletedEntry()

  const { clearExpensesData } = useClearExpenses()
  const { saveReport } = useSaveReport()

  const { calculationSumValues } = useCalculationSumValues(expensesData)
  const { investments } = useInvestmentMetrics(
    calculationSumValues,
    sumTotalEntry
  )
  const { getTotals } = useGetTotalsFree(calculationSumValues)
  const { lastQuatationData, refetchQuationData } = useFetchQuatationEur(
    userData,
    getTotals?.value_secondary_currency
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

  const calculationTotalExpensesEurSumRealToReal = useMemo(
    () =>
      convertEurToReal(
        lastQuatationData?.current_quotation,
        Number(getTotals?.value_secondary_currency)
      ) + (getTotals?.value_primary_currency || 0),
    [lastQuatationData, getTotals]
  )

  const calculationTotalExpensesEurToReal = useMemo(
    () =>
      convertEurToReal(
        lastQuatationData?.current_quotation,
        Number(getTotals?.value_secondary_currency)
      ),
    [lastQuatationData, getTotals]
  )

  const validateExpenseData: any = {
    hybrid: calculationTotalExpensesEurSumRealToReal,
    oneCurrency: getTotals?.value_primary_currency
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
      entrys: entrysData || [], // Adicionando array de entradas
      totalFree:
        sumTotalEntry -
        (validateExpenseData[typeAccount] || 0) -
        investments.totalInvestments,
      investments: investments,
      totalEntrys: sumTotalEntry,
      totalExpenses: validateExpenseData[typeAccount],
      totalExpenseEurToReal: calculationTotalExpensesEurToReal ?? 0,
      quatation: lastQuatationData?.current_quotation ?? 0
    })
    controlModalSaveReport.onClose()
  }

  return (
    <Box
      display="flex"
      flexDir="column"
      w="full"
      gap={10}
      py={4}
      px={3}
      margin="auto"
    >
      <Box w={{ base: '93%', lg: '97%' }} margin="auto">
        <InfoCardsToControl
          infoAction={controlModalInfoCard.onOpen}
          totalEntrys={sumTotalEntry}
          totalExpensesEurSumRealToReal={validateExpenseData[typeAccount]}
          totalExpensesEurToReal={calculationTotalExpensesEurToReal}
          onOpenTotalEntrys={controlModalTotalEntrys.onOpen}
          investments={investments}
        />
      </Box>

      <Box display="flex" flexDir="column" gap={4} w="100%">
        <HeaderDataTableToControl
          currentQuotation={lastQuatationData?.current_quotation}
          filter={filter}
          onFilter={onFilter}
          refetchQuationData={refetchQuationData}
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
      </Box>

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
    </Box>
  )
}
