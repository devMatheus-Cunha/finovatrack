export interface FinancialPlanningItem {
  year: string
  monthlyContributions: string
  receivables: string
  downPayment?: string
  homePurchases?: string
  otherDeductions?: string
}

export interface ProjectionDataPoint {
  name: string
  'Sua Projeção': number
  'Aporte Mensal': number
  'Total Aportado': number
  'Juros Gerado': number
}

export interface SummaryDataPoint {
  name: string
  projection: number
  totalInvested: number
  interestGenerated: number
}
