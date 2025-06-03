import React from 'react'

interface ProgressBarProps {
  percentualAtual: number
  percentualPrevisto: number
  valorAtual: number
  currency: string
  isVisibilityData: boolean
  formatCurrencyMoney: (
    value: number,
    currency: string,
    isVisibilityData: boolean
  ) => string
  blueShades: any
  blueHexShades: any
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentualAtual,
  percentualPrevisto,
  valorAtual,
  currency,
  isVisibilityData,
  formatCurrencyMoney,
  blueShades,
  blueHexShades
}) => (
  <div className="mt-2">
    <div className="relative h-4 bg-gray-900 rounded-full overflow-hidden border border-gray-700">
      <div
        className={`absolute left-0 top-0 h-full ${blueShades.blue500} rounded-full transition-all duration-500`}
        style={{ width: `${percentualAtual}%`, zIndex: 1, opacity: 0.95 }}
      />
      <span
        className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] text-white font-bold drop-shadow px-1"
        style={{
          left: `calc(${percentualAtual}% - 18px)`,
          minWidth: '32px',
          textAlign: 'right',
          zIndex: 2
        }}
      >
        {percentualAtual.toFixed(1)}%
      </span>
      <div
        className={`absolute left-0 top-0 h-full ${blueShades.blue200} rounded-full transition-all duration-500`}
        style={{ width: `${percentualPrevisto}%`, zIndex: 0, opacity: 0.5 }}
      />
    </div>
    <div className="flex justify-between text-[11px]">
      <span style={{ color: blueHexShades.blue400 }}>Atual</span>
      <span className="text-[11.5s] text-white font-semibold">
        {formatCurrencyMoney(valorAtual, currency, isVisibilityData)}
      </span>
      <span style={{ color: blueHexShades.blue200 }}>Previsto</span>
    </div>
    <div className="flex justify-center"></div>
  </div>
)

export default ProgressBar
