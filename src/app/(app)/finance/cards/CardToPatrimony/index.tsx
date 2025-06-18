import { useFetchFinancialPlaningYear } from '@/hooks/finance'
import { IInvestimentsData } from '@/hooks/finance/useFetchInvestiments'
import { Card } from '@/components'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { blueShades } from '@/utils/colors'

interface CardToPatrimonyProps {
  isLoadingInvestimentsData: boolean
  investments?: IInvestimentsData
}

const CardToPatrimony = ({
  investments,
  isLoadingInvestimentsData
}: CardToPatrimonyProps) => {
  const { financialPlanningActualYear, isLoadingFinancialPlanningYear } =
    useFetchFinancialPlaningYear()
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()

  const currency = userData.primary_currency || 'BRL'

  const levels = [
    {
      label: 'Reserva',
      value: investments?.patrimonio?.reservaExterna || 0,
      color: blueShades.blue600
    },
    {
      label: 'Investimentos',
      value: investments?.composicaoPortfolio?.valorInvestido || 0,
      color: blueShades.blue700
    },
    {
      label: 'Livre',
      value: investments?.composicaoPortfolio.valorNaoInvestido || 0,
      color: blueShades.blue800
    }
  ]

  return (
    <Card
      isLoading={isLoadingFinancialPlanningYear || isLoadingInvestimentsData}
      hasData={!!financialPlanningActualYear || !!investments}
      className="w-full h-[130px] rounded-md flex flex-col items-center justify-center"
    >
      <div className="mb-2 flex flex-col items-center">
        <span className="text-xs text-gray-400">Património Total</span>
        <span className="text-lg font-bold text-white tracking-tight bg-gray-700 rounded px-2 py-0.5 shadow-sm">
          {formatCurrencyMoney(
            investments?.patrimonio.total,
            currency,
            isVisibilityData
          )}
        </span>
      </div>
      <div className="flex w-full h-3 rounded overflow-hidden bg-gray-600">
        {levels.map((level) => (
          <div
            key={level.label}
            className={`${level.color} h-full`}
            style={{
              width: `${levels.reduce((acc, l) => acc + l.value, 0) ? (level.value / levels.reduce((acc, l) => acc + l.value, 0)) * 100 : 0}%`
            }}
            title={level.label}
          />
        ))}
      </div>
      {/* Exibe os valores de cada variável nova */}
      <div className="flex justify-between gap-1 mt-2 text-xs text-gray-300 w-full">
        {levels.map((level) => (
          <div key={level.label} className="flex items-center gap-1">
            <span
              className={`inline-block w-2 h-2 rounded ${level.color}`}
            ></span>
            <span>
              {level.label}:{' '}
              <span className="font-bold text-white">
                {formatCurrencyMoney(level.value, currency, isVisibilityData)}
              </span>
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default CardToPatrimony
