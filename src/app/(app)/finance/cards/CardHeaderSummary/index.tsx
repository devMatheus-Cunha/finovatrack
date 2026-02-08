import { IInvestimentsData } from '@/app/actions/financeActions'
import { useIsVisibilityDatas } from '@/hooks/globalStates'
import { IReportToYearData } from '@/services/reports/getReportsToYear'
import {
  calculateProjection,
  IFinancialPlanningProps
} from '@/utils/calculateFinancialProjection'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { Target } from 'lucide-react'
import { GOAL_DEADLINE, GOAL_INTEREST_RATE } from '../utils'
import { useGoals } from '@/hooks/finance'

const CardHeaderSummary = ({
  investimentsData,
  report,
  financialPlanningYear
}: {
  investimentsData: IInvestimentsData
  report: IReportToYearData
  financialPlanningYear: IFinancialPlanningProps[]
}) => {
  const { isVisibilityData } = useIsVisibilityDatas()
  const { goal } = useGoals()

  const valorAtual = investimentsData?.resumoConta?.totalGeral ?? 0
  const goalDeadline = goal?.meta_year || GOAL_DEADLINE

  const projectionResults = calculateProjection({
    principal: valorAtual,
    annualRate: GOAL_INTEREST_RATE,
    goalDate: goalDeadline,
    financialPlanningYear: financialPlanningYear || []
  })
  const currentYear = financialPlanningYear?.find(
    (i: IFinancialPlanningProps) => i.year === '2026'
  )
  const finalProjection =
    projectionResults.length > 0
      ? projectionResults[projectionResults.length - 1]
      : null
  const previsao =
    (finalProjection?.endValue ?? valorAtual) +
    (Number(currentYear?.receivables) || 0) -
    (Number(currentYear?.downPayment) || 0) -
    (Number(currentYear?.homePurchases) || 0) -
    (Number(currentYear?.otherDeductions) || 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
      {/* Card 1: Patrimônio */}
      <div className="md:col-span-2 bg-gray-700 p-4 rounded-lg border border-gray-800 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
            Património Total{' '}
          </p>
          <h2 className="text-2xl font-bold text-white">
            {formatCurrencyMoney(
              investimentsData?.resumoConta?.totalGeral,
              'EUR',
              isVisibilityData
            )}
          </h2>
        </div>
        <div className="flex gap-4 text-right">
          <div>
            <p className="text-[9px] text-gray-400 font-bold uppercase">
              Não Investido
            </p>
            <p className="text-xs font-bold text-blue-400">
              {formatCurrencyMoney(
                investimentsData?.resumoConta?.corretora?.valorInvestido,
                'EUR',
                isVisibilityData
              )}
            </p>
          </div>
          <div>
            <p className="text-[9px] text-gray-400 font-bold uppercase">
              Investido
            </p>
            <p className="text-xs font-bold text-indigo-400">
              {formatCurrencyMoney(
                investimentsData?.resumoConta?.corretora?.valorDeMercado,
                'EUR',
                isVisibilityData
              )}
            </p>
          </div>
          <div>
            <p className="text-[9px] text-gray-400 font-bold uppercase">
              Reserva
            </p>
            <p className="text-xs font-bold text-blue-400">
              {formatCurrencyMoney(
                investimentsData?.resumoConta?.reservaExterna,
                'EUR',
                isVisibilityData
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Card 2: Reserva / Meses */}
      <div className="bg-gray-700 p-4 rounded-lg border border-gray-800 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
            Reserva / Meses
          </p>
          <h2 className="text-xl font-bold">
            {report?.mediaExpenses &&
            investimentsData?.resumoConta?.reservaExterna
              ? (
                  investimentsData.resumoConta.reservaExterna /
                  report.mediaExpenses
                ).toFixed(1)
              : '0.0'}{' '}
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
              meses
            </span>
          </h2>
        </div>
        <div className="text-[9px] text-gray-400 text-right leading-tight">
          Gasto Médio:{' '}
          {formatCurrencyMoney(report?.mediaExpenses, 'EUR', isVisibilityData)}
          <br />
          Alvo (6m):{' '}
          {formatCurrencyMoney(
            (report?.mediaExpenses || 0) * 6,
            'EUR',
            isVisibilityData
          )}
        </div>
      </div>

      {/* Card 3: Previsão Meta */}
      <div className="bg-gray-700 p-4 rounded-lg border border-gray-800 flex items-center justify-between border-l-4 border-l-green-600">
        <div>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
            Previsão 2026
          </p>
          <h2 className="text-xl font-bold text-green-500">
            {formatCurrencyMoney(Number(previsao), 'EUR', isVisibilityData)}
          </h2>
        </div>
        <Target size={20} className="text-green-500" />
      </div>
    </div>
  )
}
export default CardHeaderSummary
