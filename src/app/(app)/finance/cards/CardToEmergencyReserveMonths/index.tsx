import { Card } from '@/components'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { ShieldCheck, CalendarClock } from 'lucide-react'

interface CardToEmergencyReserveMonthsProps {
  isLoading: boolean
  valorReservaEmergencia?: number
  mediaGastoMensalTotal?: number
}

const CardToEmergencyReserveMonths = ({
  isLoading,
  valorReservaEmergencia = 0,
  mediaGastoMensalTotal = 0
}: CardToEmergencyReserveMonthsProps) => {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()
  const currency = userData.primary_currency || 'EUR'

  const mesesDeReserva = mediaGastoMensalTotal > 0 ? valorReservaEmergencia / mediaGastoMensalTotal : 0

  return (
    <Card
      isLoading={isLoading}
      hasData={!!valorReservaEmergencia && !!mediaGastoMensalTotal}
      className="w-full h-[130px] rounded-md flex flex-col items-center justify-center"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-gray-400">Meses Reserva Emergência</span>
        <CalendarClock size={18} className="text-blue-400" />
      </div>
      <span className="text-lg font-bold text-white tracking-tight bg-gray-700 rounded px-2 py-0.5 shadow-sm">
        {mesesDeReserva.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} meses
      </span>
      <div className="flex flex-col items-center mt-2 text-xs text-gray-300">
        <span>
          Reserva: <span className="font-bold text-white">{formatCurrencyMoney(valorReservaEmergencia, currency, isVisibilityData)}</span>
        </span>
        <span>
          Gasto Médio: <span className="font-bold text-white">{formatCurrencyMoney(mediaGastoMensalTotal, currency, isVisibilityData)}</span>
        </span>
        <span>
          Para 6 meses: <span className="font-bold text-white">{formatCurrencyMoney(mediaGastoMensalTotal * 6, currency, isVisibilityData)}</span>
        </span>
      </div>
    </Card>
  )
}

export default CardToEmergencyReserveMonths
