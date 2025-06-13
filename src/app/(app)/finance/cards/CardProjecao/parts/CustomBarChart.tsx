import { FC, useState, useMemo } from 'react'
import { formatCurrency } from './mock'
import { ProjectionDataPoint } from './type'

export const CustomBarChart: FC<{ data: ProjectionDataPoint[] }> = ({
  data
}) => {
  const [activeBar, setActiveBar] = useState<ProjectionDataPoint | null>(null)

  const maxValue = useMemo(() => {
    if (!data || data.length === 0) return 0
    return Math.max(...data.map((item) => item['Sua Projeção']))
  }, [data])

  const yAxisLabels = useMemo(() => {
    if (maxValue === 0) return [{ value: 1000, label: '€1k' }]
    const labels: { value: number; label: string }[] = []
    const step = Math.ceil(maxValue / 5 / 10000) * 10000
    for (let i = 0; i <= 5; i++) {
      const value = i * step
      if (value <= maxValue + step) {
        labels.push({ value, label: `€${Math.round(value / 1000)}k` })
      }
    }
    return labels.length > 0
      ? labels.reverse()
      : [{ value: 1000, label: '€1k' }]
  }, [maxValue])

  // Agora o retorno condicional pode ser feito com segurança.
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-400">Sem dados para exibir.</div>
    )
  }

  const yAxisTopValue = yAxisLabels[0]?.value || maxValue || 1

  return (
    <div className="w-content h-80 flex">
      <div className="h-full flex flex-col justify-between text-right pr-2 text-xs text-gray-400">
        {yAxisLabels.map((labelInfo) => (
          <div key={labelInfo.value}>{labelInfo.label}</div>
        ))}
      </div>
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-full flex items-end justify-around border-l border-b border-gray-600 pl-2">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex-1 px-1 h-full flex items-end justify-center"
            >
              <div
                className="relative w-full bg-blue-600 hover:bg-blue-500 transition-all duration-300 rounded-t-sm"
                style={{
                  height: `${(item['Sua Projeção'] / yAxisTopValue) * 100}%`
                }}
                onMouseEnter={() => setActiveBar(item)}
                onMouseLeave={() => setActiveBar(null)}
              >
                {activeBar && activeBar.name === item.name && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl text-white pointer-events-none w-max z-10 opacity-100">
                    <p className="font-bold text-gray-300 text-base">
                      {activeBar.name}
                    </p>
                    <p className="text-sm text-blue-400">{`Valor Total: ${formatCurrency(activeBar['Sua Projeção'])}`}</p>
                    <hr className="my-1 border-gray-600" />
                    <p className="text-sm text-orange-400">{`Total Aportado: ${formatCurrency(activeBar['Total Aportado'])}`}</p>
                    <p className="text-sm text-green-400">{`Juros Gerado: ${formatCurrency(activeBar['Juros Gerado'])}`}</p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-900"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full h-6 flex justify-around pl-2 pt-1">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex-1 text-center text-xs text-gray-400"
            >
              {parseInt(item.name) % 2 !== 0 ? item.name : ''}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
