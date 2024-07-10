'use client'

import { TableColumn } from '@/components/Table'
import { UserData } from '@/hooks/auth/useAuth/types'
import { ExpenseData } from '@/services/expenses/getExpenses'
import { optionsCurrencyKeyAndValue } from '@/utils/configCurrency'
import {
  formatCurrencyMoney,
  formatToJavaScriptNumber
} from '@/utils/formatNumber'
import { useMemo } from 'react'

export const validateTextToModal: any = {
  addExpense: {
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
  const columns = [
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
    },
    {
      header: 'Tipo',
      field: 'type'
    },
    {
      header: 'Categoria',
      field: 'category'
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

  if (typeAccount === 'hybrid') {
    columns.splice(2, 0, {
      header: optionsCurrencyKeyAndValue[secondaryCurrency],
      field: 'value_secondary_currency',
      modifier: (value: number) =>
        !isVisibilityData || !value
          ? '-'
          : formatCurrencyMoney(value, secondaryCurrency)
    })
  }

  return columns
}

export const initialDataSelectedData: ExpenseData = {
  id: '',
  category: '',
  description: '',
  value: '',
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
        acumulador.value_primary_currency =
          (acumulador.value_primary_currency ?? 0) +
          Number(objetoAtual.value_primary_currency)
        acumulador.value_secondary_currency =
          (acumulador.value_secondary_currency ?? 0) +
          Number(objetoAtual.value_secondary_currency)
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

export const optionsFilterType = [
  { text: 'Limpar', value: '', type: 'type' },
  { text: 'Essencial', value: 'Essencial', type: 'type' },
  { text: 'Gasto Livre', value: 'Gasto Livre', type: 'type' },
  { text: 'Não essencial', value: 'Não essencial', type: 'type' }
]
export const optionsFilterCategory = [
  { text: 'Limpar', value: '', type: 'category' },
  { text: 'Alimentação', value: 'Alimentação', type: 'category' },
  { text: 'Contas', value: 'Contas', type: 'category' },
  { text: 'Economias', value: 'Economias', type: 'category' },
  { text: 'Educação', value: 'Educação', type: 'category' },
  { text: 'Entretenimento', value: 'Entretenimento', type: 'category' },
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
