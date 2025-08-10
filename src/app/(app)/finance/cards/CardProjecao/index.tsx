import { useFinancialProjections } from './hooks/useFinancialProjections'
import { CustomBarChart } from './parts/CustomBarChart'
import { ProjectionSummary } from './parts/ProjectionInputs'
import { SummaryTable } from './parts/SummaryTable'
import { Card } from '@/components'
import { IFinancialPlanningProps } from '@/services/finance/getFinancialPlanningYear'
import { GOAL_INTEREST_RATE } from '../utils'
import { IInvestimentsData } from '@/hooks/finance/useFetchInvestiments/types'

export default function LongTermProjectionCard({
  financialPlanningYear,
  investimentsData,
  isLoadingInvestimentsData
}: {
  financialPlanningYear: IFinancialPlanningProps[] | undefined
  investimentsData?: IInvestimentsData
  isLoadingInvestimentsData: boolean
}) {
  const initialCurrentValue = Number(
    investimentsData?.patrimonio?.total.toFixed(2)
  )

  const { projectionData, summaryData } = useFinancialProjections(
    initialCurrentValue,
    GOAL_INTEREST_RATE,
    financialPlanningYear
  )

  return (
    <Card
      title=" Projeção de Longo Prazo"
      className="w-full lg:w-[50%] min-h-[433px]"
      hasData={!!investimentsData}
      isLoading={isLoadingInvestimentsData}
    >
      <ProjectionSummary
        currentValue={initialCurrentValue}
        annualYield={GOAL_INTEREST_RATE}
        currency={'EUR'}
      />

      <div className="mt-4">
        <h3 className="text-lg font-bold mb-4 text-gray-200">
          Projeção Anual de Patrimônio
        </h3>
        {projectionData && <CustomBarChart data={projectionData} />}
      </div>

      <SummaryTable data={summaryData} />
    </Card>
  )
}
