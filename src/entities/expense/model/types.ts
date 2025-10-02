export interface SubcategoryData {
  value: string
  label: string
  category: string
}

export interface ExpenseData {
  id: string
  category: string
  subcategory?: SubcategoryData
  description: string
  value_primary_currency: number
  value_secondary_currency?: number
  typeMoney?: string
  value: string
  payment: 'Pago' | 'A Pagar' | ''
}
