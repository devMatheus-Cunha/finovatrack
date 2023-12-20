'use client'

import { optionsCurrencyKeyAndValue } from '@/utils/configCurrency'

export const columsHeadPropsEuro = [
  {
    header: 'Descrição',
    field: 'description'
  },
  {
    header: 'Valor Euro',
    field: 'euro_value'
  },
  {
    header: 'Tipo',
    field: 'type'
  }
]
export const columsHeadPropsReal = [
  {
    header: 'Descrição',
    field: 'description'
  },
  {
    header: 'Valor Real',
    field: 'real_value'
  },
  {
    header: 'Tipo',
    field: 'type'
  }
]

export const columsHeadProps = (
  primaryCurrency: string,
  secondaryCurrency: string,
  typeAccount: string
) => {
  const columns = [
    {
      header: 'Descrição',
      field: 'description'
    },
    {
      header: optionsCurrencyKeyAndValue[primaryCurrency],
      field: 'primary_currency'
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
      header: 'Status Pagamento',
      field: 'payment'
    }
  ]

  if (typeAccount === 'hybrid') {
    columns.splice(2, 0, {
      header: optionsCurrencyKeyAndValue[secondaryCurrency],
      field: 'secondary_currency'
    })
    columns.splice(3, 0, {
      header: 'Moeda',
      field: 'typeMoney'
    })
  }

  return columns
}
function FixErroBuild() {
  return null
}

export default FixErroBuild
