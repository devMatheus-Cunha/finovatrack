interface CategoryWithSubcategories {
  label: string
  value: string
  disabled?: boolean
  selected?: boolean
  subcategories?: Array<{ label: string; value: string; category: string }>
}

export const categoryOptions: CategoryWithSubcategories[] = [
  {
    label: 'Ex: Alimentação',
    value: '',
    disabled: true,
    selected: true
  },
  { label: 'Alimentação', value: 'Alimentação' },
  {
    label: 'Contas Casa',
    value: 'Contas Casa',
    subcategories: [
      {
        label: 'Nenhuma',
        category: '',
        value: 'Nenhuma'
      },
      { label: 'Água', value: 'Água', category: 'Contas Casa' },
      { label: 'Gás', value: 'Gás', category: 'Contas Casa' },
      { label: 'Energia', value: 'Energia', category: 'Contas Casa' },
      { label: 'Internet', value: 'Internet', category: 'Contas Casa' },
      { label: 'Extras', value: 'Extras', category: 'Contas Casa' }
    ]
  },
  { label: 'Carro', value: 'Carro' },
  { label: 'Educação', value: 'Educação' },
  { label: 'Financiamento', value: 'Financiamento' },
  { label: 'Férias', value: 'Férias' },
  { label: 'Gastos Pessoais', value: 'Gastos Pessoais' },
  { label: 'Investimentos', value: 'Investimentos' },
  { label: 'Lazer', value: 'Lazer' },
  { label: 'Moradia', value: 'Moradia' },
  { label: 'Saúde', value: 'Saúde' },
  { label: 'Seguro', value: 'Seguro' },
  { label: 'Viagens', value: 'Viagens' }
]

export const paymentsOptions = [
  {
    label: `Ex: A Pagar`,
    value: '',
    disabled: true,
    selected: true
  },
  { label: 'A Pagar', value: 'A Pagar' },
  { label: 'Pago', value: 'Pago' }
]
