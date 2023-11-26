/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-multi-spaces */

'use client'

import { InfoCardMoney } from '@/components'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import React from 'react'
import { UserData } from '@/hooks/auth/useAuth/types'

import { IEntrysData } from '@/hooks/entrys/useFetchEntrysData'
import { ITypeModal } from '../../types'
import { ExpenseData } from '@/service/expenses/getExpenses'

interface IInfoCardsToControl {
  userData: UserData
  totalEntrys: number
  entrysData: IEntrysData[]
  totalExpensesEurToReal: number
  totalExpensesEurSumRealToReal: number
  infoAction?: () => void
  handleOpenModal: (type?: ITypeModal, data?: ExpenseData) => void
}

function InfoCardsToControl({
  userData,
  totalEntrys,
  handleOpenModal,
  entrysData,
  totalExpensesEurToReal,
  totalExpensesEurSumRealToReal,
  infoAction
}: IInfoCardsToControl) {
  return (
    <div className="flex flex-wrap lg:flex-nowrap	justify-center gap-6">
      <InfoCardMoney
        infoData={formatCurrencyMoney(totalEntrys, userData.primary_currency)}
        title="Total Entradas"
        contentAction={
          <button
            onClick={() => handleOpenModal('totalsEntrys')}
            className={`text-xs italic  ${
              entrysData?.length <= 0
                ? 'cursor-not-allowed text-gray-400'
                : 'hover:text-gray-400 text-gray-300'
            }`}
            disabled={entrysData?.length <= 0}
          >
            Visualizar
          </button>
        }
      />
      {userData.typeAccount === 'hybrid' && (
        <InfoCardMoney
          infoData={formatCurrencyMoney(
            totalExpensesEurToReal,
            userData.primary_currency
          )}
          infoAction={infoAction}
          title={`Total Gastos ${userData.secondary_currency}`}
        />
      )}
      <InfoCardMoney
        infoData={formatCurrencyMoney(
          totalExpensesEurSumRealToReal,
          userData.primary_currency
        )}
        title="Total Gastos"
      />
      <InfoCardMoney
        infoData={formatCurrencyMoney(
          totalEntrys - totalExpensesEurSumRealToReal,
          userData.primary_currency
        )}
        title="Total Livre"
      />
    </div>
  )
}

export default InfoCardsToControl
