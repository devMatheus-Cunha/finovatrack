import { useState, useEffect } from 'react'
import { ProjectionDataPoint, SummaryDataPoint } from '../parts/type'
import { calculateProjection } from '@/utils/calculateFinancialProjection'
import { IFinancialPlanningProps } from '@/services/finance/getFinancialPlanningYear'

export const useFinancialProjections = (
  currentValue: number,
  annualYield: number,
  financialPlanningYear: IFinancialPlanningProps[] | undefined
) => {
  const [projectionData, setProjectionData] = useState<
    ProjectionDataPoint[] | null
  >(null)
  const [summaryData, setSummaryData] = useState<SummaryDataPoint[] | null>(
    null
  )

  useEffect(() => {
    const projectionResults = calculateProjection({
      principal: currentValue,
      annualRate: annualYield,
      durationInYears: 15,
      financialPlanningYear
    })

    const allYearsData: ProjectionDataPoint[] = projectionResults.map(
      (result) => ({
        name: `${result.calendarYear}`,
        'Sua Projeção': result.endValue,
        'Aporte Mensal': result.contributionDetails.monthly,
        'Total Aportado': result.totalInvested,
        'Juros Gerado': result.interestGenerated
      })
    )
    const summaryCheckpoints = [5, 10, 15]
    const newSummaryData = summaryCheckpoints
      .map((year) => {
        // Garante que o resultado para o ano existe antes de tentar acessá-lo.
        if (projectionResults[year - 1]) {
          const result = projectionResults[year - 1]
          return {
            name: `${year} Anos`,
            projection: result.endValue,
            totalInvested: result.totalInvested,
            interestGenerated: result.interestGenerated
          }
        }
        return null
      })
      .filter((item): item is SummaryDataPoint => item !== null) // Remove quaisquer resultados nulos

    setProjectionData(allYearsData)
    setSummaryData(newSummaryData)
  }, [currentValue, annualYield, financialPlanningYear])

  return { projectionData, summaryData }
}
