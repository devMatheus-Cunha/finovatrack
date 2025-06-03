import React from 'react'

interface ResumoInfoProps {
  valorGuardadoMes: number
  mesesRestantes: number
  GOAL_INTEREST_RATE: number
  currency: string
  isVisibilityData: boolean
  formatCurrencyMoney: (
    value: number,
    currency: string,
    isVisibilityData: boolean
  ) => string
}

const ResumoInfo: React.FC<ResumoInfoProps> = ({
  valorGuardadoMes,
  mesesRestantes,
  GOAL_INTEREST_RATE,
  currency,
  isVisibilityData,
  formatCurrencyMoney
}) => (
  <div className="grid grid-cols-3 gap-2 mt-2 text-[11px] text-gray-300">
    <div className="flex flex-col items-center">
      <span className="font-medium">Guardado/mês</span>
      <span>
        {formatCurrencyMoney(valorGuardadoMes, currency, isVisibilityData)}
      </span>
    </div>
    <div className="flex flex-col items-center">
      <span className="font-medium">Meses restantes</span>
      <span>{mesesRestantes}</span>
    </div>
    <div className="flex flex-col items-center">
      <span className="font-medium">Juros estimado</span>
      <span>{(GOAL_INTEREST_RATE * 100).toFixed(1)}% a.a.</span>
    </div>
  </div>
)

export default ResumoInfo
