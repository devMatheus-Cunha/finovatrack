'use client'

import { UserData } from '@/hooks/entrys/useDeletedEntry/auth/useAuth/types'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { ButtonGroup, Empty } from '@/components'
import { PencilSimpleLine, Trash } from '@phosphor-icons/react'
import { Filter } from '@/hooks/expenses/useFetchExpensesData'
import { ExpenseData } from '@/services/expenses/getExpenses'
import Table, { TableColumn } from '@/components/common/Table'
import { optionsCurrencyKeyAndValue } from '@/utils/configCurrency'
import { ITypeModalExpense } from '@/app/(app)/control/hooks/useControlModal'
import { DeleteExpense } from '@/features/expense/delete-expense/ui/DeleteExpense'

interface ITableToControl {
  calculationSumValues: ExpenseData[]
  isVisibilityData: boolean
  handleOpenModal: (type?: ITypeModalExpense, data?: ExpenseData) => void
  filter: Filter
  userData: UserData
  isLoadingExpensesData?: boolean
}

function TableToControl({
  calculationSumValues,
  handleOpenModal,
  isVisibilityData,
  filter,
  userData
}: ITableToControl) {
  const columns: TableColumn[] = [
    {
      header: 'Descrição',
      field: 'description'
    },
    {
      header: optionsCurrencyKeyAndValue[userData.primary_currency],
      field: 'value_primary_currency',
      modifier: (value: number) =>
        formatCurrencyMoney(value, userData?.primary_currency, isVisibilityData)
    },
    {
      header: 'Categoria',
      field: 'category'
    },
    {
      header: 'Subcategoria',
      field: 'subcategory',
      modifier: (_: string, obj: any) => obj.subcategory?.label
    },
    {
      header: 'Status',
      field: 'payment',
      styles: (value: string) => ({
        color: value === 'A Pagar' ? 'red' : 'green'
      })
    },
    {
      header: 'Ação',
      field: 'actions',
      modifier: (_: string, obj: any) => (
        <>
          {obj.description !== 'Totais' && (
            <ButtonGroup
              buttonOptions={[
                {
                  onClick: () => handleOpenModal('edit', obj),
                  content: <PencilSimpleLine color="#eee2e2" />
                },
                {
                  content: (
                    <DeleteExpense expense={obj}>
                      <Trash color="#eee2e2" />
                    </DeleteExpense>
                  )
                }
              ]}
            />
          )}
        </>
      )
    }
  ]

  if (userData.typeAccount === 'hybrid') {
    columns.splice(2, 0, {
      header: optionsCurrencyKeyAndValue[userData.secondary_currency],
      field: 'value_secondary_currency',
      modifier: (value: number) =>
        !isVisibilityData || !value
          ? '-'
          : formatCurrencyMoney(value, userData.secondary_currency)
    })
  }

  return (
    <div className="bg-gray-700 h-[67vh] rounded-md overflow-y-auto w-full">
      {calculationSumValues?.length > 0 ? (
        <Table columns={columns} data={calculationSumValues} />
      ) : (
        <Empty<Filter> filter={filter} />
      )}
    </div>
  )
}

export default TableToControl
