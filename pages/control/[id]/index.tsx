import Head from 'next/head';
import { Fragment, useMemo, useState } from 'react';

import { SubmitHandler } from "react-hook-form";
import { Button, ButtonGroup, InfoCardMoney, SideBar } from '@/components';


import { useCalculationSumValues, columsHeadProps, optionsFilter, useGetTotalsFree, initialDataSelectedData } from './parts/utils';

import useFetchQuatationEur, { convertEurosToReais } from './parts/hooks/useFetchQuatationEur';

import Loading from '@/components/Loading';

import DeleteModalContent from './parts/modals/deleteModal';
import ContentActionsTableModal from './parts/modals/actionsTableModal';
import ContentAddEntryModal from './parts/modals/addEntryModal';

import useAddEntrys from './parts/hooks/useAddEntrys';
import useAddExpense from './parts/hooks/useAddExpense';
import useClearExpenses from './parts/hooks/useClearExpenses';
import useDeletedEntry from './parts/hooks/useDeletedEntry';
import useDeletedExpense from './parts/hooks/useDeletedExpense';
import useFetchEntrysData from './parts/hooks/useFetchEntrysData';
import useFetchExpensesData, { ExpenseData, Filter } from './parts/hooks/useFetchExpensesData';
import useUpadtedExpense from './parts/hooks/useUpadtedExpense';

import { ITypeModal, Item, IFormData } from './types';
import ContentTotalEntrys from './parts/modals/totalEntrysModal';
import { Coins, HandCoins, Broom, ArrowsCounterClockwise, PencilSimpleLine, Trash, FolderOpen } from '@phosphor-icons/react';
import useIsVisibilityDatas from '@/hooks/useIsVisibilityDatas';
import useSaveReport from '../../reports/[id]/hooks/useSaveReport';
import ConfirmSaveReportModal from './parts/modals/confirmSaveReportModal';
import { validaTextForTypeAccount } from './utils';
import { formatCurrencyMoney } from '@/utils/formatCurrencyMoney';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUserData';

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
      real_value: data.typeMoney === "Real" ? Number(data.value) : 0,
      euro_value: data.typeMoney === "Euro" ? Number(data.value) : 0,
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
              <div className="flex w-[100%] text-center items-center justify-center h-[20vh] spac e-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                <InfoCardMoney
                  infoData={formatCurrencyMoney(totalEntrys, userData.typeAccount)}
                  title={validaTextForTypeAccount[userData?.typeAccount]?.titleEntrys}

                  contentAction={
                    <button
                      onClick={() => handleOpenModal("totalsEntrys")}
                      className={`text-xs italic  ${entrysData.length <= 0 ? "cursor-not-allowed dark:text-gray-400" : 'dark:hover:text-gray-400 dark:text-gray-300'}`}
                      disabled={entrysData.length <= 0}
                    >
                      Visualizar
                    </button>
                  }
                />
                <InfoCardMoney
                  infoData={formatCurrencyMoney(calculationTotalExpensesEurToReal, userData.typeAccount)}
                  title={validaTextForTypeAccount[userData?.typeAccount]?.titleExpenses}
                />
                <InfoCardMoney
                  infoData={formatCurrencyMoney(totalEntrys - calculationTotalExpensesEurToReal, userData.typeAccount)
                  }
                  title={validaTextForTypeAccount[userData?.typeAccount]?.totalFree}
                />
              </div>

              <div className="flex w-[100%] flex-1 justify-center items-center">
                <div className='flex flex-col gap-4 w-[100%] p-6 justify-center'>
                  <div className="flex  justify-between	items-center">
                    <div className='flex flex-wrap justify-between	items-center'>
                      <Button
                        type="button"
                        onClick={() => handleOpenModal("addExpense")}>
                        <div className='flex gap-2 justify-center items-center'>
                          <Coins size={20} color="#eee2e2" />
                          Add Gastos
                        </div>

                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleOpenModal("addEntry")}>
                        <div className='flex gap-2 justify-center items-center'>
                          <HandCoins size={20} color="#eee2e2" />
                          Add Entrada
                        </div>
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleOpenModal("deleteAllExpenses")}
                      >
                        <div className='flex gap-2 justify-center items-center'>
                          <Broom size={20} color="#eee2e2" />
                          Limpar Gastos
                        </div>
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleOpenModalSaveReport()}
                      >
                        <div className='flex gap-2 justify-center items-center'>
                          <FolderOpen size={20} color="#eee2e2" />
                          Salvar Relatório
                        </div>
                      </Button>
                      <select
                        id="type"
                        className="cursor-pointer hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        onChange={(e) => onFilter(e)}
                        value={filter}
                      >
                        <option value="" disabled selected>
                          Filtre o Tipo
                        </option>
                        {optionsFilter.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {
                      "hybrid" === "hybrid" && (
                        <div className='flex gap-3 justify-center items-center'>
                          <h3 className='italic'>
                            {`Cotação: ${formatCurrencyMoney(lastQuatationData?.current_quotation, userData.typeAccount)} `}
                          </h3>
                          <button
                            type="button"
                            onClick={() => refetchQuationData()}
                            className='dark:hover:text-gray-400'
                          >
                            <ArrowsCounterClockwise size={20} color="#eee2e2" />
                          </button>
                        </div>
                      )
                    }
                  </div>
                  <div className="relative overflow-y-auto sm:rounded-lg h-[63vh] w-[100%] bg-gray-800">
                    {
                      calculationSumValues?.length > 0 ? (
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                          <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              {
                                columsHeadProps.map((item) => (
                                  <>
                                    <th scope="col" className="px-6 py-3" key={item.field}>
                                      {item.header}
                                    </th>
                                  </>
                                ))
                              }
                            </tr>
                          </thead>
                          <tbody>
                            {
                              calculationSumValues.map((item, index) => (
                                <Fragment key={index}>
                                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      {item.description}
                                    </th>
                                    {
                                      userData.typeAccount !== "euro" && (
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                          {item.euro_value !== 0 && isVisibilityData ? formatCurrencyMoney(item.euro_value, "euro") : "-"}
                                        </th>
                                      )
                                    }

                                    {
                                      userData.typeAccount !== "euro" && (
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                          {item.real_value !== 0 && isVisibilityData ? formatCurrencyMoney(item.real_value, "real") : "-"}
                                        </th>
                                      )
                                    }
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      {item.type}
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      {item.typeMoney}
                                    </th>
                                    {
                                      item.description !== "Totais" ? (
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                          <ButtonGroup buttonOptions={[
                                            {
                                              onClick: () => {
                                                handleOpenModal("edit", item)
                                              },
                                              content: <PencilSimpleLine color="#eee2e2" />
                                            },
                                            {
                                              onClick: () => {
                                                handleOpenModal("delete", item)
                                              },
                                              content: <Trash color="#eee2e2" />
                                            }
                                          ]} />
                                        </th >
                                      ) : (
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" />
                                      )
                                    }
                                  </tr >
                                </Fragment>
                              ))
                            }
                          </tbody>
                        </table >
                      ) : (
                        <div className='flex justify-center items-center h-full'>
                          <h1 className='text-2xl'>Não a nenhum dado na tabela!</h1>
                        </div>
                      )
                    }

                  </div>
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
