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

const PatrimonyLevelsBar = ({
  levels,
  currency,
  isVisibilityData
}: {
  levels: { label: string; value: number }[]
  currency: string
  isVisibilityData: boolean
}) => {
  const total = levels.reduce((acc, l) => acc + l.value, 0)
  const sortedLevels = [...levels].sort((a, b) => b.value - a.value)
  const blueShadeKeys = [
    'blue900',
    'blue800',
    'blue700',
    'blue600',
    'blue500',
    'blue400',
    'blue300',
    'blue200',
    'blue100'
  ] as const
  const levelColors = sortedLevels.map((level, idx) => ({
    ...level,
    blueShade: blueShades[blueShadeKeys[idx % blueShadeKeys.length]]
  }))

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-1 flex flex-col items-center">
        <span className="text-xs text-gray-400">Património Total</span>
        <span className="text-lg font-bold text-white tracking-tight bg-gray-700 rounded px-2 py-0.5 shadow-sm">
          {formatCurrencyMoney(total, currency, isVisibilityData)}
        </span>
      </div>
      <div className="flex w-full h-3 rounded overflow-hidden bg-gray-600">
        {levelColors.map((level) => (
          <div
            key={level.label}
            className={`${level.blueShade} h-full`}
            style={{ width: total ? `${(level.value / total) * 100}%` : '0%' }}
            title={level.label}
          />
        ))}
      </div>
      <div className="flex justify-between gap-1 mt-1 text-xs text-gray-300 w-full">
        {levelColors.map((level) => (
          <div key={level.label} className="flex items-center gap-1">
            <span
              className={`inline-block w-2 h-2 rounded ${level.blueShade}`}
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
    </div>
  )
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
      value: Number(financialPlanningActualYear?.reserve) || 0,
      color: 'bg-blue-500'
    },
    {
      label: 'Investimentos',
      value: investments?.invested || 0,
      color: 'bg-green-500'
    },
    {
      label: 'Livre',
      value: investments?.free || 0,
      color: 'bg-yellow-500'
    }
  ]

  return (
    <Card
      isLoading={isLoadingFinancialPlanningYear || isLoadingInvestimentsData}
      hasData={!!financialPlanningActualYear || !!investments}
      className="w-full h-[130px] rounded-md flex items-center justify-center"
    >
      <PatrimonyLevelsBar
        levels={levels}
        currency={currency}
        isVisibilityData={isVisibilityData}
      />
    </Card>
  )
}

export default CardToPatrimony
