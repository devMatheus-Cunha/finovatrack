import React from 'react'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'

export interface IFormatDataToStats {
  label: string
  value: number
  percentage?: string
}

interface DescriptionChartProps {
  dataStats: IFormatDataToStats[]
  formatLabel?: (value: string) => string
}

const DescriptionChart = ({
  dataStats,
  formatLabel
}: DescriptionChartProps) => {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()

  return (
    <div className="grid grid-cols-2 gap-3 overflow-y-auto h-fit ">
      {dataStats.map((item) => (
        <div
          key={item.label}
          className="text-white bg-gray-800/50 rounded-xl px-3 py-2.5 shadow-md flex-1 min-w-[115px] max-w-[200px]"
        >
          <div className="flex flex-col">
            <span className="text-[10px] opacity-70">
              {formatLabel ? formatLabel(item.label) : item.label}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-md font-semibold">
                {formatCurrencyMoney(
                  Number(item.value),
                  userData.primary_currency,
                  isVisibilityData
                )}
              </span>
              {item.percentage && (
                <span
                  className={`text-xs mb-0 flex items-center gap- ${
                    item.value > 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  <svg
                    className={`w-3 h-3 ${item.value > 0 ? '' : 'rotate-180'}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  {item.percentage}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DescriptionChart
