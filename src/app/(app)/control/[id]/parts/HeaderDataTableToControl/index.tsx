/* eslint-disable no-tabs */

'use client'

import { Button, DropdownFilter } from '@/components'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import {
  Coins,
  HandCoins,
  Broom,
  FolderOpen,
  ArrowsCounterClockwise,
  CaretDown,
} from '@phosphor-icons/react'
import React from 'react'
import { UserData } from '@/hooks/auth/useAuth/types'

import { RefetchQuationDataType } from '@/hooks/quatation/useFetchQuatationEur'
import { optionsFilter } from '../../utils'
import { ITypeModal } from '../../types'
import { ExpenseData } from '@/service/expenses/getExpenses'
import { Filter } from '@/hooks/expenses/useFetchExpensesData'

interface IHeaderDataTableToControl {
  userData: UserData
  currentQuotation: number | undefined
  filter: string
  onFilter: (filter: Filter) => void
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
  const buttonData = [
    {
      label: 'Add Gastos',
      icon: <Coins size={20} color="#eee2e2" />,
      onClick: () => handleOpenModal('addExpense'),
    },
    {
      label: 'Add Entrada',
      icon: <HandCoins size={20} color="#eee2e2" />,
      onClick: () => handleOpenModal('addEntry'),
    },
    {
      label: 'Salvar Relatório',
      icon: <FolderOpen size={20} color="#eee2e2" />,
      onClick: () => handleOpenModalSaveReport(),
    },
    {
      label: 'Limpar Gastos',
      icon: <Broom size={20} color="#eee2e2" />,
      onClick: () => handleOpenModal('deleteAllExpenses'),
    },
  ]

  return (
    <div className="flex justify-between items-center flex-wrap">
      <div className="flex gap-3 items-center justify-center flex-wrap">
        <Button
          type="button"
          className="hidden md:block"
          onClick={() => handleOpenModal('addExpense')}
        >
          <div className="flex gap-2 justify-center items-center">
            <Coins size={20} color="#eee2e2" />
            <p className="hidden md:block">Add Gastos</p>
          </div>
        </Button>
        <Button
          className="hidden md:block"
          type="button"
          onClick={() => handleOpenModal('addEntry')}
        >
          <div className="flex gap-2 justify-center items-center">
            <HandCoins size={20} color="#eee2e2" />
            <p className="hidden md:block">Add Entrada</p>
          </div>
        </Button>
        <Button
          className="hidden md:block"
          type="button"
          onClick={() => handleOpenModalSaveReport()}
        >
          <div className="flex gap-2 justify-center items-center">
            <FolderOpen size={20} color="#eee2e2" />
            <p className="hidden md:block">Salvar Relatório</p>
          </div>
        </Button>
        <Button
          type="button"
          className="hidden md:block"
          onClick={() => handleOpenModal('deleteAllExpenses')}
        >
          <div className="flex gap-2 justify-center items-center">
            <Broom size={20} color="#eee2e2" />
            <p className="hidden md:block">Limpar Gastos</p>
          </div>
        </Button>
        <div className="block md:hidden">
          <div className="hs-dropdown relative inline-flex [--strategy:absolute]">
            <button
              id="s-dropdown-left-but-right-on-lg"
              type="button"
              className="hs-dropdown-toggle inline-flex justify-center items-center gap-2 transition-all px-5 py-2.5 text-sm font-medium rounded-lg bg-gray-800 hover:bg-gray-700"
            >
              Ações
              <CaretDown size={20} color="#eee2e2" />
            </button>

            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration text-white hs-dropdown-open:opacity-100 opacity-0 w-56 hidden z-10 mt-2 min-w-[15rem] px-2 py-2.5 text-sm font-medium rounded-lg bg-gray-800 border border-gray-700 shadow"
              aria-labelledby="hs-dropdown-basic"
            >
              {buttonData.map((button, index) => (
                <button
                  className={`flex w-full items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gray-700 border-gray-700`}
                  onClick={button.onClick}
                  key={index}
                >
                  <div className="flex gap-2 justify-center items-center">
                    {button.icon}
                    {button.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <DropdownFilter
          value={filter}
          options={optionsFilter}
          onFilter={onFilter}
        />
      </div>

      <div className="flex gap-2 justify-center items-center">
        {userData.typeAccount === 'hybrid' && (
          <>
            <h3 className="italic text-[14px] md:text-md">
              {`${userData.secondary_currency}: ${formatCurrencyMoney(
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
