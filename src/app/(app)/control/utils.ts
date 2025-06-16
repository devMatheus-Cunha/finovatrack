'use client'

import { TableColumn } from '@/components/common/Table'
import { UserData } from '@/hooks/entrys/useDeletedEntry/auth/useAuth/types'
import { ExpenseData } from '@/services/expenses/getExpenses'
import { optionsCurrencyKeyAndValue } from '@/utils/configCurrency'
import {
  formatCurrencyMoney,
  formatToJavaScriptNumber
} from '@/utils/formatNumber'
import { useMemo } from 'react'

export const validateTextToModal: any = {
  add: {
    title: 'Adicionar Gasto',
    description: 'Add a new Expense'
  },
  edit: {
    title: 'Editar Gasto',
    description: 'edit data'
  },
  delete: {
    title: 'Deletar Gasto',
    description: 'delete data'
  }
}

export const formattedValuesSubmitExpense = (
  data: ExpenseData,
  userData: UserData
) => {
  const formattedValues = {
    ...data,
    value_primary_currency:
      userData.typeAccount === 'oneCurrency' ||
      data.typeMoney === userData.primary_currency
        ? formatToJavaScriptNumber(data.value)
        : 0,
    value_secondary_currency:
      userData.typeAccount !== 'oneCurrency' &&
      data.typeMoney === userData.secondary_currency
        ? formatToJavaScriptNumber(data.value)
        : 0
  }
  return formattedValues
}

export const columsHeadProps = (
  primaryCurrency: string,
  secondaryCurrency: string,
  typeAccount: string,
  isVisibilityData: boolean
): TableColumn[] => {
  const baseColumns = [
    {
      header: 'Descrição',
      field: 'description'
    },
    {
      header: optionsCurrencyKeyAndValue[primaryCurrency],
      field: 'value_primary_currency',
      modifier: (value: number) =>
        !isVisibilityData || !value
          ? '-'
          : formatCurrencyMoney(value, primaryCurrency)
    }
  ]

  const secondaryCurrencyColumn = {
    header: optionsCurrencyKeyAndValue[secondaryCurrency],
    field: 'value_secondary_currency',
    modifier: (value: number) =>
      !isVisibilityData || !value
        ? '-'
        : formatCurrencyMoney(value, secondaryCurrency)
  }

  const remainingColumns = [
    {
      header: 'Tipo',
      field: 'type'
    },
    {
      header: 'Categoria',
      field: 'category'
    },
    {
      header: 'Subcategoria',
      field: 'subcategory',
      modifier: (value: string) => value || '-'
    },
    {
      header: 'Status',
      field: 'payment',
      styles: (value: any) => ({
        color: value === 'A Pagar' ? 'red' : 'blue'
      })
    },
    {
      header: 'Ação',
      field: 'actions'
    }
  ]

  const columns = [
    ...baseColumns,
    ...(typeAccount === 'hybrid' ? [secondaryCurrencyColumn] : []),
    ...remainingColumns
  ]

  return columns
}

export const initialDataSelectedData: ExpenseData = {
  id: '',
  category: '',
  description: '',
  value: '',
  subcategory: undefined,
  value_primary_currency: 0,
  value_secondary_currency: 0,
  typeMoney: '',
  payment: ''
}

export const useCalculationSumValues = (expensesData: ExpenseData[]) => {
  const calculationSumValues = useMemo(() => {
    if (expensesData.length <= 0) return []

    const calculation = expensesData.reduce(
      (acumulador, objetoAtual) => {
        if (
          objetoAtual.category !== 'Investimentos e Finanças' &&
          objetoAtual.subcategory?.label !== 'Gastos Livres / Diversos'
        ) {
          acumulador.value_primary_currency =
            (acumulador.value_primary_currency ?? 0) +
            Number(objetoAtual.value_primary_currency)
          acumulador.value_secondary_currency =
            (acumulador.value_secondary_currency ?? 0) +
            Number(objetoAtual.value_secondary_currency)
        }
        return acumulador
      },
      {
        id: '',
        category: '',
        description: 'Totais',
        value: '',
        value_primary_currency: 0,
        value_secondary_currency: 0,
        typeMoney: '',
        payment: ''
      }
    )
    return [...expensesData, calculation]
  }, [expensesData])

  return {
    calculationSumValues
  }
}

export const useGetTotalsFree = (calculationSumValues: ExpenseData[]) => {
  const getTotals: ExpenseData = useMemo(() => {
    const result = calculationSumValues.find(
      (item) => item.description === 'Totais'
    )

    if (result) return result

    return initialDataSelectedData
  }, [calculationSumValues])

  return {
    getTotals
  }
}

export const optionsFilterCategory = [
  { text: 'Limpar', value: '', type: 'category' },
  { text: 'Alimentação', value: 'Alimentação', type: 'category' },
  { text: 'Contas', value: 'Contas', type: 'category' },
  { text: 'Economias', value: 'Economias', type: 'category' },
  { text: 'Educação', value: 'Educação', type: 'category' },
  { text: 'Entretenimento', value: 'Entretenimento', type: 'category' },
  { text: 'Financiamento', value: 'Financiamento', type: 'category' },
  { text: 'Lazer', value: 'Lazer', type: 'category' },
  { text: 'Moradia', value: 'Moradia', type: 'category' },
  { text: 'Roupas', value: 'Roupas', type: 'category' },
  { text: 'Saúde', value: 'Saúde', type: 'category' },
  { text: 'Seguro', value: 'Seguro', type: 'category' },
  { text: 'Transporte', value: 'Transporte', type: 'category' },
  { text: 'Viagens', value: 'Viagens', type: 'category' }
]

function FixErroBuild() {
  return null
}

export default FixErroBuild
