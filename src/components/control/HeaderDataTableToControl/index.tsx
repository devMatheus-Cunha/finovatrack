'use client'

import { Coins, FolderOpen, Plus } from '@phosphor-icons/react'
import { DropdownFilter, ShowAndHide, Button } from '@/components'
import { useState } from 'react'
import { IHandleControlModalExpenseFunction } from '@/app/(app)/control/hooks/useControlModal'
import { optionsFilterCategory } from '@/app/(app)/control/utils'

import { AddEntry } from '@/features/entry/add-entry/ui/AddEntry'

interface IHeaderDataTableToControl {
  filter: string
  onOpenSaveReport: () => void
  handleControlModalExpense: IHandleControlModalExpenseFunction
  onFilter: (filter: any) => void
}

function HeaderDataTableToControl({
  filter,
  onFilter,
  onOpenSaveReport,
  handleControlModalExpense
}: IHeaderDataTableToControl) {
  const [showMenu, setShowMenu] = useState(false)

  const buttonData = [
    {
      label: 'Add Gastos',
      icon: Coins,
      onClick: () => handleControlModalExpense('add')
    },
    {
      label: 'Salvar Relatório',
      icon: FolderOpen,
      onClick: onOpenSaveReport
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
        <AddEntry />

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
      </div>
    </div>
  )
}

export default HeaderDataTableToControl
