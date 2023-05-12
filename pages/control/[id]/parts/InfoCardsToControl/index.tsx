/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-multi-spaces */
import { InfoCardMoney } from '@/components';
import { formatCurrencyMoney } from '@/utils/formatNumber';
import React from 'react';
import { TypeAccount } from '@/hooks/auth/useAuth/types';
import { ExpenseData } from '@/hooks/expenses/useFetchExpensesData';
import { IEntrysData } from '@/hooks/entrys/useFetchEntrysData';
import { validaTextForTypeAccount } from '../../utils';
import { ITypeModal } from '../../types';

interface IInfoCardsToControl {
 typeAccount: TypeAccount
 totalEntrys: number
 totalExpenseEur: number
 totalExpenseReal: number
 entrysData: IEntrysData[]
 totalExpensesEurToReal: number
 totalExpensesEurSumRealToReal: number
 handleOpenModal: (type?: ITypeModal, data?: ExpenseData) => void
}

function InfoCardsToControl({
  typeAccount,
  totalEntrys,
  handleOpenModal,
  entrysData,
  totalExpensesEurToReal,
  totalExpensesEurSumRealToReal,
  totalExpenseEur,
  totalExpenseReal,
}: IInfoCardsToControl) {
  const validateExpenseData = {
    real: totalExpenseReal,
    euro: totalExpenseEur,
    hybrid: totalExpensesEurSumRealToReal,
  };

  return (
    <div className="flex w-[88%] text-center items-center justify-center h-[20vh] spac e-y-4 sm:flex sm:space-y-0 sm:space-x-4">
      <InfoCardMoney
        infoData={formatCurrencyMoney(totalEntrys, typeAccount)}
        title={validaTextForTypeAccount[typeAccount]?.titleEntrys}

        contentAction={(
          <button
            onClick={() => handleOpenModal('totalsEntrys')}
            className={`text-xs italic  ${entrysData?.length <= 0 ? 'cursor-not-allowed dark:text-gray-400' : 'dark:hover:text-gray-400 dark:text-gray-300'}`}
            disabled={entrysData?.length <= 0}
          >
            Visualizar
          </button>
   )}
      />
      {
        typeAccount === 'hybrid' && (
        <InfoCardMoney
          infoData={formatCurrencyMoney(totalExpensesEurToReal, typeAccount)}
          title={validaTextForTypeAccount[typeAccount]?.titleExpensesEurToReal}
        />
        )
      }
      <InfoCardMoney
        infoData={formatCurrencyMoney(validateExpenseData[typeAccount], typeAccount)}
        title={validaTextForTypeAccount[typeAccount]?.titleExpenses}
      />
      <InfoCardMoney
        infoData={formatCurrencyMoney(totalEntrys - validateExpenseData[typeAccount], typeAccount)}
        title={validaTextForTypeAccount[typeAccount]?.totalFree}
      />
    </div>
  );
}

export default InfoCardsToControl;
