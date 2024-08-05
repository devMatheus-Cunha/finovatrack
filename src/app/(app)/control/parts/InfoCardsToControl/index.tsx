'use client'

import { InfoCardMoney } from '@/components'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import React from 'react'
import { UserData } from '@/hooks/auth/useAuth/types'

import { IEntrysData } from '@/hooks/entrys/useFetchEntrysData'
import { useIsVisibilityDatas } from '@/hooks/globalStates'

interface IInfoCardsToControl {
  userData: UserData
  totalEntrys: number
  entrysData: IEntrysData[]
  totalExpensesEurToReal: number
  totalExpensesEurSumRealToReal: number
  infoAction?: () => void
  onOpenTotalEntrys: any
}

function InfoCardsToControl({
  userData,
  totalEntrys,
  entrysData,
  totalExpensesEurToReal,
  totalExpensesEurSumRealToReal,
  infoAction,
  onOpenTotalEntrys
}: IInfoCardsToControl) {
  const { isVisibilityData } = useIsVisibilityDatas()
  return (
    <div className="flex flex-wrap lg:flex-nowrap	justify-center gap-6">
      <InfoCardMoney
        infoData={formatCurrencyMoney(
          totalEntrys,
          userData.primary_currency,
          isVisibilityData
        )}
        title="Total Entradas"
        contentAction={
          <>
            {entrysData?.length > 0 && (
              <button
                onClick={() => onOpenTotalEntrys()}
                className={'text-xs italic  hover:text-gray-400 text-gray-300'}
              >
                Visualizar
              </button>
            )}
          </>
        }
      />
      {userData.typeAccount === 'hybrid' && (
        <InfoCardMoney
          infoData={formatCurrencyMoney(
            totalExpensesEurToReal,
            userData.primary_currency,
            isVisibilityData
          )}
          infoAction={infoAction}
          title={`Total Gastos ${userData.secondary_currency}`}
        />
      )}
      <InfoCardMoney
        infoData={formatCurrencyMoney(
          totalExpensesEurSumRealToReal,
          userData.primary_currency,
          isVisibilityData
        )}
        title="Total Gastos"
      />
      <InfoCardMoney
        infoData={formatCurrencyMoney(
          totalEntrys - totalExpensesEurSumRealToReal,
          userData.primary_currency,
          isVisibilityData
        )}
        title="Total Livre"
      />
    </div>
  )
}

export default InfoCardsToControl
