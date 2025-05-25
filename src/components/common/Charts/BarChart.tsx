import React, { useState } from 'react'
import { blueHexShades } from '@/utils/colors'

interface BarChartData {
  label: string
  value: number
  fill?: string
}

interface BarChartProps {
  chartData: BarChartData[]
  tickFormatter: (value: string) => string
  chartConfig?: Record<string, any>
  className?: string
}

const BarChart = ({ chartData, tickFormatter, className }: BarChartProps) => {
  const [tooltip, setTooltip] = useState<null | {
    x: number
    y: number
    label: string
    value: number
  }>(null)
  const maxValue = Math.max(...chartData.map((d) => d.value), 1)

  return (
    <div className={className || 'w-full h-56 flex flex-col justify-end'}>
      <div
        className="flex items-end w-full gap-2 relative"
        style={{ height: 160 }}
      >
        {chartData.map((data, idx) => {
          // Altura mínima de 30% para valorizar visualmente
          const minPercent = 30
          const percent = data.value / maxValue
          const barHeight = minPercent + percent * (100 - minPercent)
          const baseWidth = 32
          // Usa as variáveis globais de cor por chave
          const blueHexKeys = [
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
          const color =
            data.fill || blueHexShades[blueHexKeys[idx % blueHexKeys.length]]
          const isEmpty = data.value === 0
          return (
            <div key={data.label} className="flex flex-col items-center w-full">
              <div
                className="relative flex justify-center"
                style={{ height: '100%' }}
                onMouseEnter={(e) => {
                  const rect = (e.target as HTMLElement).getBoundingClientRect()
                  setTooltip({
                    x: rect.left + rect.width / 2,
                    y: rect.top,
                    label: data.label,
                    value: data.value
                  })
                }}
                onMouseLeave={() => setTooltip(null)}
              >
                <div
                  className={`rounded-t-md transition-all duration-200 shadow-md ${isEmpty ? 'opacity-30' : ''}`}
                  style={{
                    height: `${isEmpty ? minPercent : barHeight}%`,
                    background: color,
                    minHeight: 4,
                    width: isEmpty ? 8 : baseWidth
                  }}
                  title={data.label}
                />
              </div>
              <span
                className="text-xs text-gray-400 mt-1 truncate max-w-[4rem]"
                title={data.label}
              >
                {data.label}
              </span>
            </div>
          )
        })}
        {tooltip && (
          <div
            className="fixed z-50 px-2 py-1 rounded bg-gray-800 text-white text-xs shadow pointer-events-none"
            style={{ left: tooltip.x, top: tooltip.y - 36 }}
          >
            <span className="font-bold">{tooltip.label}</span>:{' '}
            {tickFormatter(String(tooltip.value))}
          </div>
        )}
      </div>
      <div className="flex w-full justify-between mt-2">
        {chartData.map((data) => (
          <span
            key={data.label + '-x'}
            className="text-xs text-gray-400 w-6 text-center truncate"
            title={data.label}
          >
            {data.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default BarChart
