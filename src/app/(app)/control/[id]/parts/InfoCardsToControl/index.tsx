/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-multi-spaces */

'use client';

import { InfoCardMoney } from '@/components';
import { formatCurrencyMoney } from '@/utils/formatNumber';
import React from 'react';
import { UserData } from '@/hooks/auth/useAuth/types';
import { ExpenseData } from '@/hooks/expenses/useFetchExpensesData';
import { IEntrysData } from '@/hooks/entrys/useFetchEntrysData';
import { ITypeModal } from '../../types';

interface IInfoCardsToControl {
 userData: UserData
 totalEntrys: number
 totalExpenseEur: number | undefined
 totalExpenseReal: number | undefined
 entrysData: IEntrysData[]
 totalExpensesEurToReal: number
 totalExpensesEurSumRealToReal: number
 handleOpenModal: (type?: ITypeModal, data?: ExpenseData) => void
}

function InfoCardsToControl({
  userData,
  totalEntrys,
  handleOpenModal,
  entrysData,
  totalExpensesEurToReal,
  totalExpensesEurSumRealToReal,
  totalExpenseEur,
  totalExpenseReal,
}: IInfoCardsToControl) {
  const validateExpenseData: any = {
    real: totalExpenseReal,
    euro: totalExpenseEur,
    hybrid: totalExpensesEurSumRealToReal,
  };

  return (
    <div className="flex w-[88%] text-center items-center justify-center h-[20vh] spac e-y-4 sm:flex sm:space-y-0 sm:space-x-4">
      <InfoCardMoney
        infoData={formatCurrencyMoney(totalEntrys, userData.primary_currency)}
        title="Total Entradas"

        contentAction={(
          <button
            onClick={() => handleOpenModal('totalsEntrys')}
            className={`text-xs italic  ${entrysData?.length <= 0 ? 'cursor-not-allowed text-gray-400' : 'hover:text-gray-400 text-gray-300'}`}
            disabled={entrysData?.length <= 0}
          >
            Visualizar
          </button>
   )}
      />
      {
        userData.typeAccount === 'hybrid' && (
        <InfoCardMoney
          infoData={formatCurrencyMoney(totalExpensesEurToReal, userData.primary_currency)}
          title={`Total Gastos em ${userData.secondary_currency}`}
        />
        )
      }
      <InfoCardMoney
        infoData={formatCurrencyMoney(validateExpenseData[userData.typeAccount], userData.primary_currency)}
        title="Total Gastos"
      />
      <InfoCardMoney
        infoData={formatCurrencyMoney(totalEntrys - validateExpenseData[userData.typeAccount], userData.primary_currency)}
        title="Total Livre"
      />
    </div>
  );
}

export default InfoCardsToControl;
