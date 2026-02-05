import { useIsVisibilityDatas } from '@/hooks/globalStates'
import { IFinancialPlanningProps } from '@/utils/calculateFinancialProjection'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { Target } from 'lucide-react'

const CardHeaderSummary = ({ p, comp, report, financialPlanningYear }: any) => {
  const { isVisibilityData } = useIsVisibilityDatas()
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
      {/* Card 1: Patrimônio */}
      <div className="md:col-span-2 bg-gray-700 p-4 rounded-lg border border-gray-800 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
            Património Total
          </p>
          <h2 className="text-2xl font-bold text-white">
            {formatCurrencyMoney(p?.total, 'EUR', isVisibilityData)}
          </h2>
        </div>
        <div className="flex gap-4 text-right">
          <div>
            <p className="text-[9px] text-gray-400 font-bold uppercase">
              Não Investido
            </p>
            <p className="text-xs font-bold text-blue-400">
              {formatCurrencyMoney(
                comp?.valorNaoInvestido,
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
                comp?.totalInvestidoComValorizacao,
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
              {formatCurrencyMoney(p?.reservaExterna, 'EUR', isVisibilityData)}
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
            {report?.mediaExpenses && p?.reservaExterna
              ? (p.reservaExterna / report.mediaExpenses).toFixed(1)
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
            Previsão Meta 06/26
          </p>
          <h2 className="text-xl font-bold text-green-500">
            {formatCurrencyMoney(
              Number(
                financialPlanningYear?.find(
                  (i: IFinancialPlanningProps) => i.year === '2026'
                )?.receivables
              ),
              'EUR',
              isVisibilityData
            )}
          </h2>
        </div>
        <Target size={20} className="text-green-900" />
      </div>
    </div>
  )
}
export default CardHeaderSummary
