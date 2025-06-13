import { formatCurrencyMoney } from '@/utils/formatNumber'
import React from 'react'

export interface PieChartCircleData {
  label: string
  value: number
  color: string
}

export interface PieChartCircleProps {
  data: PieChartCircleData[]
  total: number
  currency: string
  isVisibilityData: boolean
  className?: string
  showTooltip?: boolean
  showDescription?: boolean
}

const PieChartCircle = ({
  data,
  total,
  currency,
  isVisibilityData,
  className = '',
  showTooltip = false,
  showDescription = false
}: PieChartCircleProps) => {
  const sum = data.reduce((acc, d) => acc + d.value, 0)
  let startAngle = 0
  const svgSize = 220
  const radius = 90
  const center = svgSize / 2
  const innerRadius = 65
  const slices = data.map((d) => {
    const angle = sum ? (d.value / sum) * 360 : 0
    const endAngle = startAngle + angle
    const largeArc = angle > 180 ? 1 : 0
    const x1 = center + radius * Math.cos((Math.PI * startAngle) / 180)
    const y1 = center + radius * Math.sin((Math.PI * startAngle) / 180)
    const x2 = center + radius * Math.cos((Math.PI * endAngle) / 180)
    const y2 = center + radius * Math.sin((Math.PI * endAngle) / 180)
    const path = `M${center},${center} L${x1},${y1} A${radius},${radius} 0 ${largeArc},1 ${x2},${y2} Z`
    const midAngle = startAngle + angle / 2
    const tooltipX =
      center + (radius + 10) * Math.cos((Math.PI * midAngle) / 180)
    const tooltipY =
      center + (radius + 10) * Math.sin((Math.PI * midAngle) / 180)
    startAngle = endAngle
    return {
      path,
      color: d.color,
      label: d.label,
      value: d.value,
      tooltipX,
      tooltipY
    }
  })
  const [tooltip, setTooltip] = React.useState<null | {
    x: number
    y: number
    label: string
    value: number
  }>(null)

  return (
    <div className={`flex flex-col items-center w-full ${className}`}>
      <div className="relative">
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="mb-2"
        >
          {slices.map((slice, idx) => (
            <path
              key={idx}
              d={slice.path}
              fill={slice.color}
              onMouseEnter={
                showTooltip
                  ? () =>
                      setTooltip({
                        x: slice.tooltipX,
                        y: slice.tooltipY,
                        label: slice.label,
                        value: slice.value
                      })
                  : undefined
              }
              onMouseLeave={showTooltip ? () => setTooltip(null) : undefined}
              style={{
                cursor: showTooltip ? 'pointer' : 'default',
                transition: 'opacity 0.2s'
              }}
              opacity={
                showTooltip && tooltip && tooltip.label !== slice.label
                  ? 0.7
                  : 1
              }
            />
          ))}
          <circle cx={center} cy={center} r={innerRadius} fill="#374151" />
          <text
            x={center}
            y={center + 6}
            textAnchor="middle"
            className="fill-white text-base font-bold"
          >
            {formatCurrencyMoney(total, currency, isVisibilityData)}
          </text>
        </svg>
        {showTooltip && tooltip && (
          <div
            className="absolute z-10 px-2 py-1 rounded bg-gray-800/50 text-white text-xs font-semibold shadow-lg pointer-events-none"
            style={{
              left: tooltip.x - 40,
              top: tooltip.y - 30,
              minWidth: 80,
              textAlign: 'center',
              transform: 'translate(-50%, -100%)',
              whiteSpace: 'nowrap'
            }}
          >
            {tooltip.label}:{' '}
            {formatCurrencyMoney(tooltip.value, currency, isVisibilityData)}
          </div>
        )}
      </div>
      {showDescription && (
        <div className="flex w-fit gap-4 flex-wrap ">
          {slices.map((slice, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ background: slice.color }}
              ></span>
              <span className="text-gray-300 font-semibold">
                {slice.label}:
              </span>
              <span className="font-bold text-white">
                {formatCurrencyMoney(slice.value, currency, isVisibilityData)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PieChartCircle
