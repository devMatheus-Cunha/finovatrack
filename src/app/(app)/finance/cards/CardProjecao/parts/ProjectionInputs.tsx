import { FC } from 'react'
import { formatCurrencyMoney } from '@/utils/formatNumber'

interface ProjectionSummaryProps {
  currentValue: number
  annualYield: number
  currency: string
}

export const ProjectionSummary: FC<ProjectionSummaryProps> = ({
  currentValue,
  annualYield,
  currency
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3 mt-4">
      <div className="flex flex-col">
        <label
          htmlFor="currentValue"
          className="text-sm font-medium text-gray-400 mb-2"
        >
          Valor Atual
        </label>
        <div className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-2 px-3 h-[42px] flex items-center text-white">
          {formatCurrencyMoney(currentValue, currency, true)}
        </div>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="annualYield"
          className="text-sm font-medium text-gray-400 mb-2"
        >
          Rentabilidade Anual
        </label>
        <div className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-2 px-3 h-[42px] flex items-center text-white">
          {annualYield.toFixed(1)}%
        </div>
      </div>
    </div>
  )
}
