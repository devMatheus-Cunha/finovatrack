'use client'

import { UserData } from '@/hooks/auth/useAuth/types'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { ButtonGroup, Empty } from '@/components'
import { PencilSimpleLine, Trash } from '@phosphor-icons/react'
import { Filter } from '@/hooks/expenses/useFetchExpensesData'
import { ExpenseData } from '@/services/expenses/getExpenses'
import Table, { TableColumn } from '@/components/Table'
import { optionsCurrencyKeyAndValue } from '@/utils/configCurrency'
import { ITypeModalExpense } from '../../../hooks/useControlModal'
import { Spinner } from '@chakra-ui/react'

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
  userData,
  isLoadingExpensesData
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
          formatCurrencyMoney(
            value,
            userData?.primary_currency,
            isVisibilityData
          )
      },
      {
        header: 'Categoria',
        field: 'category'
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
      {isLoadingExpensesData ? (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="cyan.500"
            size="xl"
          />
        </div>
      ) : (
        <>
          {calculationSumValues?.length > 0 ? (
            <Table columns={columsHeadProps()} data={calculationSumValues} />
          ) : (
            <Empty<Filter> filter={filter} />
          )}
        </>
      )}
    </div>
  )
}

export default TableToControl
