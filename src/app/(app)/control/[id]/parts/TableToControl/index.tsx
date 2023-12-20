'use client'

import { UserData } from '@/hooks/auth/useAuth/types'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { Fragment } from 'react'
import { ButtonGroup, Empty } from '@/components'
import { PencilSimpleLine, Trash } from '@phosphor-icons/react'
import { Filter } from '@/hooks/expenses/useFetchExpensesData'
import { ITypeModal } from '../../types'
import { ExpenseData } from '@/service/expenses/getExpenses'
import Table, { TableColumn } from '@/components/Table'
import { optionsCurrencyKeyAndValue } from '@/utils/configCurrency'

interface ITableToControl {
  calculationSumValues: ExpenseData[]
  isVisibilityData: boolean
  handleOpenModal: (type?: ITypeModal, data?: ExpenseData) => void
  filter: Filter
  userData: UserData
}

function TableToControl({
  calculationSumValues,
  handleOpenModal,
  isVisibilityData,
  filter,
  userData
}: ITableToControl) {
  const columsHeadProps = (): TableColumn[] => {
    const columns = [
      {
        header: 'Descrição',
        field: 'description'
      },
      {
        header: optionsCurrencyKeyAndValue[userData.primary_currency],
        field: 'value_primary_currency',
        modifier: (value: number) =>
          !isVisibilityData || !value
            ? '-'
            : formatCurrencyMoney(value, userData?.primary_currency)
      },
      {
        header: 'Categoria',
        field: 'category'
      },
      {
        header: 'Status Pagamento',
        field: 'payment',
        styles: (value: string) => ({
          color: value === 'A Pagar' ? 'red' : 'green'
        })
      },
      {
        header: 'Ação',
        field: 'actions',
        modifier: (_: string, obj: any) => {
          return (
            <>
              {obj.description !== 'Totais' && (
                <ButtonGroup
                  buttonOptions={[
                    {
                      onClick: () => {
                        handleOpenModal('edit', obj)
                      },
                      content: <PencilSimpleLine color="#eee2e2" />
                    },
                    {
                      onClick: () => {
                        handleOpenModal('delete', obj)
                      },
                      content: <Trash color="#eee2e2" />
                    }
                  ]}
                />
              )}
            </>
          )
        }
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

    return columns
  }
  return (
    <div className="relative overflow-y-auto sm:rounded-lg h-[63vh] bg-gray-800">
      {calculationSumValues?.length > 0 ? (
        <Table columns={columsHeadProps()} data={calculationSumValues} />
      ) : (
        <Empty<Filter> filter={filter} />
      )}
    </div>
  )
}

export default TableToControl
