'use client'

import React, { useState } from 'react'
import { RefreshCcw } from 'lucide-react'
import {
  useFetchInvestiments,
  useFetchFinancialPlaningYear,
  useUpdateFinancialPlaningYear
} from '@/hooks/finance'
import useFetchReportsToYearData from '@/hooks/reports/useFetchReportsToYearData'
import { formatToJavaScriptNumber } from '@/utils/formatNumber'
import { IInvestimentsData } from '@/app/actions/financeActions'
import {
  CardHeaderSummary,
  CardToFinanceYaer,
  CardToGoals,
  CardToInvestments
} from './cards'
import { IReportToYearData } from '@/services/reports/getReportsToYear'

const Finance: React.FC = () => {
  const [expandedYear, setExpandedYear] = useState<number | null>(
    new Date().getFullYear()
  )
  const [showFullHistory, setShowFullHistory] = useState<boolean>(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const currentYear = new Date().getFullYear()
  const {
    investimentsData,
    isLoadingInvestimentsData,
    isFetching,
    refetchInvestimentsData
  } = useFetchInvestiments()
  const { financialPlanningYear, isLoadingFinancialPlanningYear } =
    useFetchFinancialPlaningYear()
  const { updateFinancialPlaningYear } = useUpdateFinancialPlaningYear()
  const { reportDataToYear } = useFetchReportsToYearData(currentYear.toString())

  const handleSave = (id: string, values: any) => {
    updateFinancialPlaningYear({
      ...values,
      id,
      year: financialPlanningYear?.find((f: any) => f.id === id)?.year,
      reserve: formatToJavaScriptNumber(values.reserve),
      investments: formatToJavaScriptNumber(values.investments),
      monthlyContributions: formatToJavaScriptNumber(
        values.monthlyContributions
      ),
      receivables: formatToJavaScriptNumber(values.receivables),
      downPayment: formatToJavaScriptNumber(values.downPayment || '0'),
      homePurchases: formatToJavaScriptNumber(values.homePurchases || '0'),
      otherDeductions: formatToJavaScriptNumber(values.otherDeductions || '0')
    })
    setEditingId(null)
  }

  if (isLoadingInvestimentsData || isLoadingFinancialPlanningYear) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCcw className="text-blue-500 animate-spin" size={32} />
      </div>
    )
  }

  return (
    <div className="min-h-screen text-[#e2e8f0]">
      <div className="mx-auto space-y-2">
        <CardHeaderSummary
          investimentsData={investimentsData || ({} as IInvestimentsData)}
          report={reportDataToYear || ({} as IReportToYearData)}
          financialPlanningYear={financialPlanningYear || []}
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
          <div className="lg:col-span-8 space-y-2">
            <CardToFinanceYaer
              data={financialPlanningYear}
              currentYear={currentYear}
              showFullHistory={showFullHistory}
              setShowFullHistory={setShowFullHistory}
              expandedYear={expandedYear}
              setExpandedYear={setExpandedYear}
              editingId={editingId}
              startEditing={setEditingId}
              cancelEditing={() => setEditingId(null)}
              handleSave={handleSave}
            />
            <CardToInvestments
              investimentsData={investimentsData || ({} as IInvestimentsData)}
              refetchInvestimentsData={refetchInvestimentsData}
              isLoadingInvestimentsData={isFetching}
            />
          </div>
          <div className="lg:col-span-4">
            <CardToGoals
              investimentsData={investimentsData}
              financialPlanningYear={financialPlanningYear}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Finance
