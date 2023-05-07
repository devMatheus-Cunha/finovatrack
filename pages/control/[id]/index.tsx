import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import { SubmitHandler } from "react-hook-form";

import { SideBar } from '@/components';
import Loading from '@/components/Loading';

import useUser from '@/hooks/useUserData';
import useSaveReport from '../../reports/[id]/hooks/useSaveReport';
import useIsVisibilityDatas from '@/hooks/useIsVisibilityDatas';

import { initialDataSelectedData, useCalculationSumValues, useGetTotalsFree } from './utils';
import { formatCurrencyMoney } from '@/utils/formatCurrencyMoney';

import useFetchQuatationEur, { convertEurosToReais } from './hooks/useFetchQuatationEur';
import useFetchEntrysData from './hooks/useFetchEntrysData';
import useAddEntrys from './hooks/useAddEntrys';
import useAddExpense from './hooks/useAddExpense';
import useClearExpenses from './hooks/useClearExpenses';
import useDeletedEntry from './hooks/useDeletedEntry';
import useDeletedExpense from './hooks/useDeletedExpense';
import useFetchExpensesData, { ExpenseData, Filter } from './hooks/useFetchExpensesData';
import useUpadtedExpense from './hooks/useUpadtedExpense';

import { ITypeModal, IFormData } from './types';

import { HeaderDataTableToControl, InfoCardsToControl, TableToControl } from './parts';
import ContentActionsTableModal from './modals/actionsTableModal';
import ContentAddEntryModal from './modals/addEntryModal';
import DeleteModalContent from './modals/deleteModal';
import ContentTotalEntrys from './modals/totalEntrysModal';
import ConfirmSaveReportModal from './modals/confirmSaveReportModal';

interface Query {
  id: string;
}

export default function Control() {
  const { isVisibilityData } = useIsVisibilityDatas()
  const router = useRouter();
  const { id } = router.query as unknown as Query;
  const { userData } = useUser()
  const { addExpense, isLoadingAddExpense } = useAddExpense(id)
  const {
    expensesData = [],
    setFilter,
    filter,
  } = useFetchExpensesData(id)

  const { deletedExpense } = useDeletedExpense(id)
  const { upadtedExpense } = useUpadtedExpense(id)

  const { entrysData = [] } = useFetchEntrysData(id)
  const { addEntrys } = useAddEntrys(id)
  const { deletedEntry } = useDeletedEntry(id)

  const { clearExpensesData } = useClearExpenses(id)

  const { saveReport } = useSaveReport(id)

  const { calculationSumValues } = useCalculationSumValues(expensesData)
  const { getTotals } = useGetTotalsFree(calculationSumValues)
  const { lastQuatationData, refetchQuationData } = useFetchQuatationEur(String(getTotals?.euro_value ?? "1"), id)

  const calculationTotalExpensesEurToReal =
    convertEurosToReais(lastQuatationData?.current_quotation, Number(getTotals?.euro_value)) + getTotals?.real_value

  const [configModal, setConfigModal] = useState<{
    open: boolean
    type: ITypeModal
    selectedData: ExpenseData
  }>({
    open: false,
    type: "",
    selectedData: initialDataSelectedData,
  })
  const [openModalReport, setOpenModalReport] = useState<{
    open: boolean
    data: ExpenseData[]
  }>({
    open: false,
    data: [],
  })


  const totalEntrys = useMemo(() => {
    return entrysData.reduce((acc, item) => {
      return acc + Number(item.value);
    }, 0);
  }, [entrysData]);

  const handleOpenModal = (type?: ITypeModal, data?: ExpenseData) => {
    setConfigModal({
      open: !configModal.open,
      type: type || "",
      selectedData: data || initialDataSelectedData
    })
  }
  const handleOpenModalSaveReport = (data: ExpenseData[] = []) => {
    setOpenModalReport({
      open: !openModalReport.open,
      data: data
    })
  }

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    const formattedValues = {
      ...data,
      real_value: data.typeMoney === "Real" || userData.typeAccount === "real"
        ? Number(data.value) : 0,
      euro_value: data.typeMoney === "Euro" || userData.typeAccount === "euro"
        ? Number(data.value) : 0,
    }

    if (configModal.type === "edit") {
      upadtedExpense({ id: configModal.selectedData?.id, data: formattedValues })
      setConfigModal({
        open: !configModal.open,
        type: "",
        selectedData: initialDataSelectedData
      })
      return
    }
    addExpense(formattedValues)
    setFilter("")
    setConfigModal({
      open: !configModal.open,
      type: "",
      selectedData: initialDataSelectedData
    })
  }

  const onAddEntrys: SubmitHandler<{ value: number }> = async (data) => {
    addEntrys(data)
    setConfigModal({
      open: !configModal.open,
      type: "",
      selectedData: initialDataSelectedData
    })
  }

  const onDelete = async () => {
    deletedExpense(configModal.selectedData)
    setFilter("")
    setConfigModal({
      open: !configModal.open,
      type: "",
      selectedData: initialDataSelectedData
    })
  }

  const onFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setFilter(event.target.value as Filter)
  }

  return (
    <>
      <Head>
        <title>Controle</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SideBar>
        <Loading
          loading={!id}
        >
          <main>
            <div className='flex flex-col items-center h-[100vh] w-[100%]'>
              <InfoCardsToControl
                totalEntrys={totalEntrys}
                typeAccount={userData.typeAccount}
                entrysData={entrysData}
                totalExpensesEurToReal={calculationTotalExpensesEurToReal}
                handleOpenModal={handleOpenModal}
                totalExpenseEur={getTotals?.euro_value}
                totalExpenseReal={getTotals?.real_value}
              />

              <div className="flex w-[100%] flex-1 justify-center items-center">
                <div className='flex flex-col gap-4 w-[100%] p-6 justify-center'>
                  <HeaderDataTableToControl
                    typeAccount={userData.typeAccount}
                    currentQuotation={lastQuatationData?.current_quotation}
                    handleOpenModal={handleOpenModal}
                    filter={filter}
                    onFilter={onFilter}
                    handleOpenModalSaveReport={handleOpenModalSaveReport}
                    refetchQuationData={refetchQuationData}
                  />
                  <TableToControl
                    calculationSumValues={calculationSumValues}
                    typeAccount={userData.typeAccount}
                    handleOpenModal={handleOpenModal}
                    isVisibilityData={isVisibilityData}
                    filter={filter}
                  />
                  {
                    configModal.open &&
                    (
                      configModal.type === "edit"
                      || configModal.type === "addExpense"
                    ) && (
                      <ContentActionsTableModal
                        type={configModal?.type}
                        initialData={configModal?.selectedData}
                        handleOpenModal={handleOpenModal}
                        onSubmit={onSubmit}
                        isLoadingAddExpense={isLoadingAddExpense}
                        typeAccount={userData.typeAccount}
                      />
                    )
                  }
                  {
                    configModal.open && (configModal.type === "delete" || configModal.type === "deleteAllExpenses") && (
                      <DeleteModalContent
                        onCancel={handleOpenModal}
                        onSubmit={configModal.type === "deleteAllExpenses" ? clearExpensesData : onDelete}
                      />
                    )
                  }
                  {
                    openModalReport.open && (
                      <ConfirmSaveReportModal
                        onCancel={handleOpenModalSaveReport}
                        onSubmit={(values: ExpenseData[]) => {
                          saveReport({
                            data: values,
                            totalInvested: formatCurrencyMoney((totalEntrys - (getTotals?.real_value) - (calculationTotalExpensesEurToReal)), userData.typeAccount),
                            totalEntrys: formatCurrencyMoney(totalEntrys, userData.typeAccount),
                            totalExpenses: formatCurrencyMoney(calculationTotalExpensesEurToReal, userData.typeAccount),
                            quatation: formatCurrencyMoney(lastQuatationData?.current_quotation, userData.typeAccount),
                          })
                          handleOpenModalSaveReport()
                        }}
                        initialData={openModalReport.data}
                      />
                    )
                  }
                  {
                    configModal.open && configModal.type === "addEntry" && (
                      <ContentAddEntryModal
                        handleOpenModal={handleOpenModal}
                        onSubmit={onAddEntrys}
                        typeAccount={userData.typeAccount}
                      />
                    )
                  }
                  {
                    configModal.open && configModal.type === "totalsEntrys" && (
                      <ContentTotalEntrys
                        handleOpenModal={handleOpenModal}
                        data={entrysData}
                        onDelete={deletedEntry}
                        userData={userData}
                      />
                    )
                  }
                </div>
              </div>
            </div>
          </main >
        </Loading>
      </SideBar >
    </>
  )
}
