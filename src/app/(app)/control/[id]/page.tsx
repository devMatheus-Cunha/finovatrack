/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-unsafe-optional-chaining */

'use client';

import { useMemo, useState } from 'react';

import { SubmitHandler } from 'react-hook-form';

import Loading from '@/components/Loading';

import { useAddEntrys, useDeletedEntry, useFetchEntrysData } from '@/hooks/entrys';
import {
  useAddExpense, useFetchExpensesData, useDeletedExpense, useUpadtedExpense, useClearExpenses,
} from '@/hooks/expenses';
import { ExpenseData, Filter } from '@/hooks/expenses/useFetchExpensesData';
import { useFetchQuatationEur } from '@/hooks/quatation';

import { useSaveReport } from '@/hooks/reports';
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates';

import { IEntrysData } from '@/hooks/entrys/useFetchEntrysData';
import { IAddExpenseData } from '@/hooks/expenses/useAddExpense';
import { convertEurToReal, formatCurrencyMoney, formatNumberToSubmit } from '@/utils/formatNumber';
import { Modal } from '@/components';
import {
  initialDataSelectedData, useCalculationSumValues, useGetTotalsFree,
} from './utils';

import { ITypeModal } from './types';

import HeaderDataTableToControl from './parts/HeaderDataTableToControl';
import InfoCardsToControl from './parts/InfoCardsToControl';
import TableToControl from './parts/TableToControl';
import ContentActionsTableModal from './modals/actionsTableModal';
import ContentAddEntryModal from './modals/addEntryModal';
import DeleteModalContent from './modals/deleteModal';
import ContentTotalEntrys from './modals/totalEntrysModal';
import ConfirmSaveReportModal from './modals/confirmSaveReportModal';

export default function Control() {
  const { isVisibilityData } = useIsVisibilityDatas();
  const { userData } = useUserData();
  const { typeAccount } = userData;
  const { addExpense, isLoadingAddExpense } = useAddExpense();
  const {
    expensesData = [],
    setFilter,
    filter,
  } = useFetchExpensesData();

  const { deletedExpense } = useDeletedExpense();
  const { upadtedExpense } = useUpadtedExpense();

  const { entrysData = [] } = useFetchEntrysData();
  const { addEntry } = useAddEntrys();
  const { deletedEntry } = useDeletedEntry();

  const { clearExpensesData } = useClearExpenses();

  const {
    saveReport,
  } = useSaveReport();

  const { calculationSumValues } = useCalculationSumValues(expensesData);
  const { getTotals } = useGetTotalsFree(calculationSumValues);
  const { lastQuatationData, refetchQuationData } = useFetchQuatationEur(getTotals?.euro_value);

  const calculationTotalExpensesEurSumRealToReal = convertEurToReal(lastQuatationData?.current_quotation, Number(getTotals?.euro_value)) + getTotals?.real_value;
  const calculationTotalExpensesEurToReal = convertEurToReal(lastQuatationData?.current_quotation, Number(getTotals?.euro_value));

  const [configModal, setConfigModal] = useState<{
    open: boolean
    type: ITypeModal
    selectedData: ExpenseData
  }>({
    open: false,
    type: '',
    selectedData: initialDataSelectedData,
  });
  const [openModalReport, setOpenModalReport] = useState<{
    open: boolean
    data: ExpenseData[]
  }>({
    open: false,
    data: [],
  });

  function SomaValores(array: IEntrysData[]) {
    const total = useMemo(() => array.reduce((accumulator, item) => {
      const valorFormatado = item.value.replace(/\./g, '').replace(',', '.');
      const valorNum = parseFloat(valorFormatado);

      return accumulator + valorNum;
    }, 0), [array]);

    return total;
  }

  const validateExpenseData = {
    real: getTotals?.real_value,
    euro: getTotals?.euro_value,
    hybrid: calculationTotalExpensesEurSumRealToReal,
    oneCurrency: calculationTotalExpensesEurSumRealToReal,
  };

  const totalEntrys = SomaValores(entrysData);

  const handleOpenModal = (type?: ITypeModal, data?: ExpenseData) => {
    setConfigModal({
      open: !configModal.open,
      type: type || '',
      selectedData: data || initialDataSelectedData,
    });
  };
  const handleOpenModalSaveReport = (data: ExpenseData[] = []) => {
    setOpenModalReport({
      open: !openModalReport.open,
      data,
    });
  };

  const onAddExpense = async (data: IAddExpenseData) => {
    const formattedValues = {
      ...data,
      real_value: data.typeMoney === 'Real' || typeAccount === 'real'
        ? formatNumberToSubmit(data.value) : 0,
      euro_value: data.typeMoney === 'Euro' || typeAccount === 'euro'
        ? formatNumberToSubmit(data.value) : 0,
    };

    if (configModal.type === 'edit') {
      upadtedExpense(formattedValues);
      setConfigModal({
        open: !configModal.open,
        type: '',
        selectedData: initialDataSelectedData,
      });
      return;
    }
    addExpense(formattedValues);
    setFilter('');
    setConfigModal({
      open: !configModal.open,
      type: '',
      selectedData: initialDataSelectedData,
    });
  };

  const onAddEntrys: SubmitHandler<{ value: string }> = async (data) => {
    addEntry(data);
    setConfigModal({
      open: !configModal.open,
      type: '',
      selectedData: initialDataSelectedData,
    });
  };

  const onDelete = async () => {
    deletedExpense(configModal.selectedData);
    setFilter('');
    setConfigModal({
      open: !configModal.open,
      type: '',
      selectedData: initialDataSelectedData,
    });
  };

  const onFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setFilter(event.target.value as Filter);
  };

  return (
    <main>
      <div className="flex flex-col items-center h-[100vh] w-[100%]">
        <InfoCardsToControl
          totalEntrys={totalEntrys}
          entrysData={entrysData}
          totalExpensesEurSumRealToReal={calculationTotalExpensesEurSumRealToReal}
          totalExpensesEurToReal={calculationTotalExpensesEurToReal}
          handleOpenModal={handleOpenModal}
          totalExpenseEur={getTotals?.euro_value}
          totalExpenseReal={getTotals?.real_value}
          typeAccount={typeAccount}
        />

        <div className="flex w-[100%] flex-1 justify-center items-center">
          <div className="flex flex-col gap-4 w-[100%] p-6 justify-center">
            <HeaderDataTableToControl
              typeAccount={typeAccount}
              currentQuotation={lastQuatationData?.current_quotation}
              handleOpenModal={handleOpenModal}
              filter={filter}
              onFilter={onFilter}
              handleOpenModalSaveReport={handleOpenModalSaveReport}
              refetchQuationData={refetchQuationData}
            />
            <TableToControl
              calculationSumValues={typeAccount === 'hybrid' ? calculationSumValues : expensesData}
              userData={userData}
              handleOpenModal={handleOpenModal}
              isVisibilityData={isVisibilityData}
              filter={filter}
            />
            {
                    configModal.open
                    && (
                      configModal.type === 'edit'
                      || configModal.type === 'addExpense'
                    ) && (
                    <Modal>
                      <ContentActionsTableModal
                        type={configModal?.type}
                        initialData={configModal?.selectedData}
                        handleOpenModal={handleOpenModal}
                        onSubmit={onAddExpense}
                        isLoadingAddExpense={isLoadingAddExpense}
                        typeAccount={typeAccount}
                      />
                    </Modal>
                    )
                  }
            {
                    configModal.open && (configModal.type === 'delete' || configModal.type === 'deleteAllExpenses') && (
                    <Modal
                      width="27%"
                    >
                      <DeleteModalContent
                        onCancel={handleOpenModal}
                        onSubmit={configModal.type === 'deleteAllExpenses' ? clearExpensesData : onDelete}
                      />
                    </Modal>
                    )
                  }
            {
                    openModalReport.open && (
                    <Modal
                      width="35%"
                    >
                      <ConfirmSaveReportModal
                        initialData={calculationSumValues}
                        onCancel={handleOpenModalSaveReport}
                        onSubmit={(values: ExpenseData[]) => {
                          saveReport({
                            data: values,
                            totalInvested: formatCurrencyMoney(totalEntrys - validateExpenseData[typeAccount], typeAccount),
                            totalEntrys: formatCurrencyMoney(totalEntrys, typeAccount),
                            totalExpenses: formatCurrencyMoney(validateExpenseData[typeAccount], typeAccount),
                            totalExpenseEurToReal: formatCurrencyMoney(calculationTotalExpensesEurToReal, typeAccount),
                            quatation: formatCurrencyMoney(lastQuatationData?.current_quotation, typeAccount),
                          });
                          handleOpenModalSaveReport();
                        }}
                      />
                    </Modal>

                    )
                  }
            {
              configModal.open && configModal.type === 'addEntry' && (
                <Modal
                  width="37%"
                >
                  <ContentAddEntryModal
                    handleOpenModal={handleOpenModal}
                    onSubmit={onAddEntrys}
                    typeAccount={typeAccount}
                  />
                </Modal>
              )
                  }
            {
              configModal.open && configModal.type === 'totalsEntrys' && (
                <Modal>
                  <ContentTotalEntrys
                    handleOpenModal={handleOpenModal}
                    data={entrysData}
                    onDelete={deletedEntry}
                    userData={userData}
                  />
                </Modal>
              )
                  }
          </div>
        </div>
      </div>
    </main>
  );
}
