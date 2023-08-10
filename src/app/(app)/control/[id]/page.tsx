/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-unsafe-optional-chaining */

'use client'

import { ChangeEvent, useMemo, useState } from 'react'

import { SubmitHandler } from 'react-hook-form'

import {
  useAddEntrys,
  useDeletedEntry,
  useFetchEntrysData,
} from '@/hooks/entrys'
import {
  useAddExpense,
  useFetchExpensesData,
  useDeletedExpense,
  useUpadtedExpense,
  useClearExpenses,
} from '@/hooks/expenses'
import { Filter } from '@/hooks/expenses/useFetchExpensesData'
import { useFetchQuatationEur } from '@/hooks/quatation'

import { useSaveReport } from '@/hooks/reports'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'

import { IEntrysData } from '@/hooks/entrys/useFetchEntrysData'
import { convertEurToReal, formatCurrencyMoney } from '@/utils/formatNumber'
import { Button, Modal } from '@/components'
import {
  formattedValuesSubmitExpense,
  initialDataSelectedData,
  useCalculationSumValues,
  useGetTotalsFree,
} from './utils'

import { ITypeModal } from './types'

import HeaderDataTableToControl from './parts/HeaderDataTableToControl'
import InfoCardsToControl from './parts/InfoCardsToControl'
import TableToControl from './parts/TableToControl'
import ContentActionsTableModal from './modals/actionsTableModal'
import ContentAddEntryModal from './modals/addEntryModal'
import DeleteModalContent from './modals/deleteModal'
import ContentTotalEntrys from './modals/totalEntrysModal'
import ConfirmSaveReportModal from './modals/confirmSaveReportModal'
import { ExpenseData } from '@/service/expenses/getExpenses'

export default function Control() {
  const { isVisibilityData } = useIsVisibilityDatas()
  const { userData } = useUserData()
  const { typeAccount } = userData

  const { addExpense, isLoadingAddExpense } = useAddExpense()
  const { expensesData = [], setFilter, filter } = useFetchExpensesData()
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
    getTotals?.value_secondary_currency,
  )

  const calculationTotalExpensesEurSumRealToReal =
    convertEurToReal(
      lastQuatationData?.current_quotation,
      Number(getTotals?.value_secondary_currency),
    ) + (getTotals?.value_primary_currency || 0)
  const calculationTotalExpensesEurToReal = convertEurToReal(
    lastQuatationData?.current_quotation,
    Number(getTotals?.value_secondary_currency),
  )

  const [configModal, setConfigModal] = useState<{
    open: boolean
    type: ITypeModal
    selectedData: ExpenseData
  }>({
    open: false,
    type: '',
    selectedData: initialDataSelectedData,
  })
  const [openModalReport, setOpenModalReport] = useState<{
    open: boolean
    data: ExpenseData[]
  }>({
    open: false,
    data: [],
  })

  const [openModalInfoCard, setOpenModalInfoCard] = useState(false)

  function SumValues(array: IEntrysData[]) {
    const total = useMemo(
      () =>
        array.reduce((accumulator, item) => {
          return accumulator + Number(item.value)
        }, 0),
      [array],
    )

    return total
  }

  const validateExpenseData = {
    hybrid: calculationTotalExpensesEurSumRealToReal,
    oneCurrency: getTotals?.value_primary_currency,
  }

  const totalEntrys = SumValues(entrysData)

  const handleOpenModal = (type?: ITypeModal, data?: ExpenseData) => {
    setConfigModal({
      open: !configModal.open,
      type: type || '',
      selectedData: data || initialDataSelectedData,
    })
  }
  const handleOpenModalSaveReport = (data: ExpenseData[] = []) => {
    setOpenModalReport({
      open: !openModalReport.open,
      data,
    })
  }

  const onAddExpense = async (data: ExpenseData) => {
    if (configModal.type === 'edit') {
      await upadtedExpense(formattedValuesSubmitExpense(data, userData))
      setConfigModal({
        open: !configModal.open,
        type: '',
        selectedData: initialDataSelectedData,
      })
      return
    }
    addExpense(formattedValuesSubmitExpense(data, userData))
    setFilter('')
    setConfigModal({
      open: !configModal.open,
      type: '',
      selectedData: initialDataSelectedData,
    })
  }

  const onAddEntrys: SubmitHandler<{ value: string }> = async ({ value }) => {
    addEntry({ value: Number(value) })
    setConfigModal({
      open: !configModal.open,
      type: '',
      selectedData: initialDataSelectedData,
    })
  }

  const onDelete = async () => {
    deletedExpense(configModal.selectedData)
    setFilter('')
    setConfigModal({
      open: !configModal.open,
      type: '',
      selectedData: initialDataSelectedData,
    })
  }

  const onFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setFilter(event.target.value as Filter)
  }

  const handleInfoAction = () => {
    setOpenModalInfoCard(!openModalInfoCard)
  }

  return (
    <main className="flex flex-col gap-20 items-center  w-[100%] px-5 py-4">
      <div className="w-[100%]">
        <InfoCardsToControl
          infoAction={handleInfoAction}
          totalEntrys={totalEntrys}
          entrysData={entrysData}
          totalExpensesEurSumRealToReal={
            calculationTotalExpensesEurSumRealToReal
          }
          totalExpensesEurToReal={calculationTotalExpensesEurToReal}
          handleOpenModal={handleOpenModal}
          userData={userData}
        />
      </div>

      <div className="w-[100%] flex flex-col gap-4">
        <HeaderDataTableToControl
          userData={userData}
          currentQuotation={lastQuatationData?.current_quotation}
          handleOpenModal={handleOpenModal}
          filter={filter}
          onFilter={onFilter}
          handleOpenModalSaveReport={handleOpenModalSaveReport}
          refetchQuationData={refetchQuationData}
        />

        <TableToControl
          calculationSumValues={
            typeAccount === 'hybrid' ? calculationSumValues : expensesData
          }
          userData={userData}
          handleOpenModal={handleOpenModal}
          isVisibilityData={isVisibilityData}
          filter={filter}
        />
      </div>

      <>
        {configModal.open &&
          (configModal.type === 'edit' ||
            configModal.type === 'addExpense') && (
            <Modal>
              <ContentActionsTableModal
                type={configModal?.type}
                initialData={configModal?.selectedData}
                handleOpenModal={handleOpenModal}
                onSubmit={onAddExpense}
                isLoadingAddExpense={isLoadingAddExpense}
                userData={userData}
              />
            </Modal>
          )}
        {configModal.open &&
          (configModal.type === 'delete' ||
            configModal.type === 'deleteAllExpenses') && (
            <Modal width="27%">
              <DeleteModalContent
                onCancel={handleOpenModal}
                onSubmit={
                  configModal.type === 'deleteAllExpenses'
                    ? clearExpensesData
                    : onDelete
                }
              />
            </Modal>
          )}
        {openModalReport.open && (
          <Modal width="41%">
            <ConfirmSaveReportModal
              initialData={calculationSumValues}
              onCancel={handleOpenModalSaveReport}
              onSubmit={({ data, period }: any) => {
                saveReport({
                  data,
                  period,
                  totalInvested: formatCurrencyMoney(
                    totalEntrys - (validateExpenseData[typeAccount] || 0),
                    userData.primary_currency,
                  ),
                  totalEntrys: formatCurrencyMoney(
                    totalEntrys,
                    userData.primary_currency,
                  ),
                  totalExpenses: formatCurrencyMoney(
                    validateExpenseData[typeAccount],
                    userData.primary_currency,
                  ),
                  totalExpenseEurToReal: formatCurrencyMoney(
                    calculationTotalExpensesEurToReal,
                    userData.primary_currency,
                  ),
                  quatation: formatCurrencyMoney(
                    lastQuatationData?.current_quotation,
                    userData.primary_currency,
                  ),
                })
                handleOpenModalSaveReport()
              }}
            />
          </Modal>
        )}
        {configModal.open && configModal.type === 'addEntry' && (
          <Modal width="37%">
            <ContentAddEntryModal
              handleOpenModal={handleOpenModal}
              onSubmit={onAddEntrys}
              userData={userData}
            />
          </Modal>
        )}
        {configModal.open && configModal.type === 'totalsEntrys' && (
          <Modal>
            <ContentTotalEntrys
              handleOpenModal={handleOpenModal}
              data={entrysData}
              onDelete={deletedEntry}
              userData={userData}
            />
          </Modal>
        )}
        {openModalInfoCard && (
          <Modal width="30%">
            <div className="bg-gray-800 rounded-lg shadow">
              <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-600">
                <h3 className="text-xl font-semibold text-white">
                  Saiba como calculamos o valor total de gastos!
                </h3>
              </div>
              <div className="flex flex-col gap-2 px-3 py-4">
                <p className="text-gray-300">
                  Utilizamos a cotação atual da moeda secundária da conta,
                  combinada com a taxa aproximada da plataforma Wise. Com a
                  Wise, você terá cálculos precisos e próximos à realidade, além
                  de contar com as menores taxas do mercado para suas conversões
                  em multi-moedas.
                </p>
                <p className="text-gray-300">
                  Descubra a Wise agora mesmo e aproveite uma vantagem
                  exclusiva! Através da nossa plataforma, sua primeira
                  transferência terá taxa 0.
                </p>
              </div>

              <div className="flex justify-center px-4 py-6 gap-3 border-t rounded-b border-gray-600">
                <Button
                  onClick={handleInfoAction}
                  type="button"
                  variant="cancel"
                >
                  Fechar
                </Button>
                <Button
                  onClick={() => {
                    const linkWise = 'https://wise.com/invite/dic/matheusc1004'
                    window.open(linkWise, '_blank')
                  }}
                  type="button"
                  variant="confirm"
                >
                  Conhecer a Wise
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </>
    </main>
  )
}
