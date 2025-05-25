'use client'

import {
  Coins,
  HandCoins,
  Broom,
  FolderOpen,
  ArrowsCounterClockwise,
  Plus
} from '@phosphor-icons/react'
import { RefetchQuationDataType } from '@/hooks/quatation/useFetchQuatationEur'
import { optionsFilterCategory } from '../../utils'
import { IHandleControlModalExpenseFunction } from '../../hooks/useControlModal'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { DropdownFilter, ShowAndHide, Button } from '@/components'
import { useUserData } from '@/hooks/globalStates'
import { useState } from 'react'

interface IHeaderDataTableToControl {
  currentQuotation: number | undefined
  filter: string
  onOpenAddEntry: () => void
  onOpenDeleteExpenses: () => void
  onOpenSaveReport: () => void
  handleControlModalExpense: IHandleControlModalExpenseFunction
  onFilter: (filter: any) => void
  refetchQuationData: RefetchQuationDataType
}

function HeaderDataTableToControl({
  currentQuotation,
  filter,
  onFilter,
  refetchQuationData,
  onOpenAddEntry,
  onOpenSaveReport,
  onOpenDeleteExpenses,
  handleControlModalExpense
}: IHeaderDataTableToControl) {
  const { userData } = useUserData()
  const [showMenu, setShowMenu] = useState(false)

  const buttonData = [
    {
      label: 'Add Gastos',
      icon: Coins,
      onClick: () => handleControlModalExpense('add')
    },
    {
      label: 'Add Entrada',
      icon: HandCoins,
      onClick: onOpenAddEntry
    },
    {
      label: 'Salvar Relatório',
      icon: FolderOpen,
      onClick: onOpenSaveReport
    },
    {
      label: 'Limpar Gastos',
      icon: Broom,
      onClick: onOpenDeleteExpenses
    }
  ]

  return (
    <div className="flex w-full justify-between items-center flex-wrap">
      <div className="flex lg:w-[50%] gap-3 justify-center">
        {buttonData.map((button, index) => (
          <Button
            key={index}
            onClick={button.onClick}
            className="hidden lg:flex"
            leftIcon={<button.icon size={20} color="white" />}
          >
            {button.label}
          </Button>
        ))}

        <ShowAndHide displayLg="none" displayBase="initial">
          <div className="relative">
            <Button
              onClick={() => setShowMenu(!showMenu)}
              leftIcon={<Plus size={20} color="white" />}
              aria-label="Ações"
            >
              Ações
            </Button>
            {showMenu && (
              <div className="absolute z-10 mt-2 bg-gray-700 border border-gray-700 rounded-md shadow-lg">
                {buttonData.map((button, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      button.onClick()
                      setShowMenu(false)
                    }}
                    variant="ghost"
                    className="w-full justify-start"
                    leftIcon={<button.icon size={20} />}
                  >
                    {button.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </ShowAndHide>
      </div>

      <div className="flex items-center">
        <DropdownFilter
          value={filter}
          options={optionsFilterCategory}
          onFilter={onFilter}
          label="Filtrar Categoria"
        />
        {userData.typeAccount === 'hybrid' && (
          <>
            <p className="text-sm md:text-md italic">
              {`${userData.secondary_currency}: ${formatCurrencyMoney(
                currentQuotation ?? 0,
                userData.primary_currency
              )}`}
            </p>
            <Button
              onClick={() => refetchQuationData()}
              className="ml-2"
              leftIcon={<ArrowsCounterClockwise size={20} color="white" />}
              aria-label="Refresh"
            >
              Atualizar
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default HeaderDataTableToControl
