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
  useUpadtedExpense,
  useClearExpenses
} from '@/hooks/expenses'
import { useFetchQuatationEur } from '@/hooks/quatation'

import { useSaveReport } from '@/hooks/reports'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'

import { IEntrysData } from '@/hooks/entrys/useFetchEntrysData'
import {
  convertEurToReal,
  formatCurrencyMoney,
  formatToJavaScriptNumber
} from '@/utils/formatNumber'
import {
  formattedValuesSubmitExpense,
  useCalculationSumValues,
  useGetTotalsFree
} from './utils'

import HeaderDataTableToControl from './parts/HeaderDataTableToControl'
import InfoCardsToControl from './parts/InfoCardsToControl'

import { ExpenseData } from '@/services/expenses/getExpenses'
import { Modal as ModalChakra, Box } from '@chakra-ui/react'
import InfoCardContent from './modals/infoCardContent'
import {
  ConfirmSaveReportModal,
  ContentActionsTableModal,
  ContentAddEntryModal,
  ContentTotalEntrys,
  DeleteModalContent
} from './modals'
import TableMobileAndDesktop from './parts/TableMobileAndDesktop'
import useControlModals from './hooks/useControlModal'

export default function Control() {
  const { isVisibilityData } = useIsVisibilityDatas()
  const { userData } = useUserData()
  const { typeAccount } = userData

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

  const { addExpense, isLoadingAddExpense } = useAddExpense()
  const {
    expensesData = [],
    setFilter,
    filter,
    isLoadingExpensesData
  } = useFetchExpensesData()
  const { deletedExpense } = useDeletedExpense()
  const { upadtedExpense } = useUpadtedExpense()

  const { entrysData = [] } = useFetchEntrysData()
  const { addEntry } = useAddEntrys()
  const { deletedEntry } = useDeletedEntry()

  const { clearExpensesData } = useClearExpenses()

  const { saveReport } = useSaveReport()

  const { calculationSumValues } = useCalculationSumValues(expensesData)
  const { getTotals } = useGetTotalsFree(calculationSumValues)
  const { lastQuatationData, refetchQuationData } = useFetchQuatationEur(
    userData,
    getTotals?.value_secondary_currency
  )

  const calculationTotalExpensesEurSumRealToReal =
    convertEurToReal(
      lastQuatationData?.current_quotation,
      Number(getTotals?.value_secondary_currency)
    ) + (getTotals?.value_primary_currency || 0)

  const calculationTotalExpensesEurToReal = convertEurToReal(
    lastQuatationData?.current_quotation,
    Number(getTotals?.value_secondary_currency)
  )

  function SumValues(array: IEntrysData[]) {
    const total = useMemo(
      () =>
        array.reduce((accumulator, item) => {
          return accumulator + Number(item.value)
        }, 0),
      [array]
    )

    return total
  }

  const validateExpenseData: any = {
    hybrid: calculationTotalExpensesEurSumRealToReal,
    oneCurrency: getTotals?.value_primary_currency
  }

  const totalEntrys = SumValues(entrysData)

  const onAddExpense = async (data: ExpenseData) => {
    if (configModalExpense.type === 'edit') {
      await upadtedExpense(formattedValuesSubmitExpense(data, userData))
      handleControlModalExpense('cancel')
      return
    }
    addExpense(formattedValuesSubmitExpense(data, userData))
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

  function calculateInvestmentMetrics(
    transactions: any[],
    totalIncome: number
  ) {
    const totalInvestments = transactions.reduce((acc, transaction) => {
      if (transaction.category === 'Investimentos') {
        return acc + transaction.value_primary_currency
      } else {
        return acc
      }
    }, 0)

    const investmentPercentage = (
      (totalInvestments / totalIncome) *
      100
    ).toFixed(2)

    return {
      totalInvestments,
      investmentPercentageFormat: `${investmentPercentage}%`,
      investmentPercentage: investmentPercentage
    }
  }

  const investments = calculateInvestmentMetrics(
    calculationSumValues,
    totalEntrys
  )

  const onSaveReport = ({ data, period }: { data: any[]; period: string }) => {
    saveReport({
      data,
      period,
      totalFree: formatCurrencyMoney(
        totalEntrys - (validateExpenseData[typeAccount] || 0),
        userData.primary_currency
      ),
      investments: investments,
      totalEntrys: formatCurrencyMoney(totalEntrys, userData.primary_currency),
      totalExpenses: formatCurrencyMoney(
        validateExpenseData[typeAccount],
        userData.primary_currency
      ),
      totalExpenseEurToReal: formatCurrencyMoney(
        calculationTotalExpensesEurToReal,
        userData.primary_currency
      ),
      quatation: formatCurrencyMoney(
        lastQuatationData?.current_quotation,
        userData.primary_currency
      )
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
          totalEntrys={totalEntrys}
          entrysData={entrysData}
          totalExpensesEurSumRealToReal={
            calculationTotalExpensesEurSumRealToReal
          }
          totalExpensesEurToReal={calculationTotalExpensesEurToReal}
          userData={userData}
          onOpenTotalEntrys={controlModalTotalEntrys.onOpen}
          investments={investments}
        />
      </Box>

      <Box display="flex" flexDir="column" gap={4} w="100%">
        <HeaderDataTableToControl
          userData={userData}
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
          userData={userData}
          isVisibilityData={isVisibilityData}
          isLoadingExpensesData={isLoadingExpensesData}
          handleControlModalExpense={handleControlModalExpense}
          filter={filter}
        />
      </Box>

      <ModalChakra
        isOpen={controlModalAddExpense.isOpen}
        onClose={controlModalAddExpense.onClose}
        isCentered
        size="xl"
      >
        <ContentActionsTableModal
          typeModal={configModalExpense?.type}
          initialData={configModalExpense?.selectedData}
          handleOpenModal={handleControlModalExpense}
          onSubmit={onAddExpense}
          isLoadingAddExpense={isLoadingAddExpense}
          userData={userData}
          onDelete={onDelete}
        />
      </ModalChakra>

      <ModalChakra
        isOpen={controlModalDeleteExpenses.isOpen}
        onClose={controlModalDeleteExpenses.onClose}
        isCentered
      >
        <DeleteModalContent
          onCancel={controlModalDeleteExpenses.onClose}
          onSubmit={
            configModalExpense.type === 'deleteAllExpenses'
              ? clearExpensesData
              : onDelete
          }
        />
      </ModalChakra>

      <ModalChakra
        isOpen={controlModalSaveReport.isOpen}
        onClose={controlModalSaveReport.onOpen}
        isCentered
        size="xl"
      >
        <ConfirmSaveReportModal
          initialData={calculationSumValues}
          onCancel={controlModalSaveReport.onClose}
          onSubmit={({ data, period }: any) => onSaveReport({ data, period })}
        />
      </ModalChakra>

      <ModalChakra
        isOpen={controlModalAddEntry.isOpen}
        onClose={controlModalAddEntry.onClose}
        isCentered
        size="xl"
      >
        <ContentAddEntryModal
          handleOpenModal={controlModalAddEntry.onClose}
          onSubmit={onAddEntrys}
          userData={userData}
        />
      </ModalChakra>

      <ModalChakra
        isOpen={controlModalTotalEntrys.isOpen}
        onClose={controlModalTotalEntrys.onClose}
        isCentered
        size="xl"
      >
        <ContentTotalEntrys
          handleOpenModal={controlModalTotalEntrys.onClose}
          data={entrysData}
          onDelete={deletedEntry}
          userData={userData}
        />
      </ModalChakra>

      <ModalChakra
        isOpen={controlModalInfoCard.isOpen}
        onClose={controlModalInfoCard.onClose}
        isCentered
        size="xl"
      >
        <InfoCardContent handleInfoAction={controlModalInfoCard.onOpen} />
      </ModalChakra>
    </Box>
  )
}
