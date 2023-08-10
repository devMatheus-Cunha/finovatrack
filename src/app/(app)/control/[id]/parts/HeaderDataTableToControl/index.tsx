/* eslint-disable no-tabs */

'use client'

import { Button } from '@/components'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import {
  Coins,
  HandCoins,
  Broom,
  FolderOpen,
  ArrowsCounterClockwise,
} from '@phosphor-icons/react'
import React from 'react'
import { UserData } from '@/hooks/auth/useAuth/types'

import { RefetchQuationDataType } from '@/hooks/quatation/useFetchQuatationEur'
import { optionsFilter } from '../../utils'
import { ITypeModal } from '../../types'
import { ExpenseData } from '@/service/expenses/getExpenses'

interface IHeaderDataTableToControl {
  userData: UserData
  currentQuotation: number | undefined
  filter: string
  onFilter: (filter: React.ChangeEvent<HTMLSelectElement>) => void
  handleOpenModal: (type?: ITypeModal | undefined, data?: ExpenseData) => void
  handleOpenModalSaveReport: (data?: ExpenseData[]) => void
  refetchQuationData: RefetchQuationDataType
}

function HeaderDataTableToControl({
  userData,
  currentQuotation,
  handleOpenModal,
  filter,
  onFilter,
  handleOpenModalSaveReport,
  refetchQuationData,
}: IHeaderDataTableToControl) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-3 items-center justify-center">
        <Button type="button" onClick={() => handleOpenModal('addExpense')}>
          <div className="flex gap-2 justify-center items-center">
            <Coins size={20} color="#eee2e2" />
            Add Gastos
          </div>
        </Button>
        <Button type="button" onClick={() => handleOpenModal('addEntry')}>
          <div className="flex gap-2 justify-center items-center">
            <HandCoins size={20} color="#eee2e2" />
            Add Entrada
          </div>
        </Button>
        <Button type="button" onClick={() => handleOpenModalSaveReport()}>
          <div className="flex gap-2 justify-center items-center">
            <FolderOpen size={20} color="#eee2e2" />
            Salvar Relatório
          </div>
        </Button>
        <Button
          type="button"
          onClick={() => handleOpenModal('deleteAllExpenses')}
        >
          <div className="flex gap-2 justify-center items-center">
            <Broom size={20} color="#eee2e2" />
            Limpar Gastos
          </div>
        </Button>
        <select
          id="type"
          className="
          cursor-pointer
          font-medium
          rounded-lg
          text-sm
          px-5
          py-2.5
          bg-gray-800
          hover:bg-gray-700
          border-gray-700
          "
          onChange={(e) => onFilter(e)}
          value={filter}
        >
          <option defaultValue="clear" value="clear" disabled>
            Filtre o Tipo
          </option>
          {optionsFilter.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 justify-center items-center">
        {userData.typeAccount === 'hybrid' && (
          <>
            <h3 className="italic">
              {`Cotação ${userData.secondary_currency}: ${formatCurrencyMoney(
                currentQuotation ?? 0,
                userData.primary_currency,
              )} `}
            </h3>
            <button
              type="button"
              onClick={() => refetchQuationData()}
              className="hover:text-gray-400"
            >
              <ArrowsCounterClockwise
                size={20}
                color="#eee2e2"
                className="hover:opacity-75"
              />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default HeaderDataTableToControl
