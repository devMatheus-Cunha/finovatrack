import { FC } from 'react'
import { formatCurrency } from './mock'
import { SummaryDataPoint } from './type'

export const SummaryTable: FC<{ data: SummaryDataPoint[] | null }> = ({
  data
}) => {
  if (!data) return null

  return (
    <div className="mt-8 overflow-x-auto">
      <h3 className="text-lg font-bold mb-4 text-gray-100">Resumo Detalhado</h3>
      <table className="min-w-full bg-gray-800/50 rounded-lg">
        <thead>
          <tr className="bg-gray-800/50">
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">
              Prazo
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">
              Projeção de Acumulado
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">
              Valor Aportado
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">
              Juros Gerado
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-300">
          {data.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
            >
              <td className="py-3 px-4 font-semibold">{item.name}</td>
              <td className="py-3 px-4 text-blue-400 font-mono">
                {formatCurrency(item.projection)}
              </td>
              <td className="py-3 px-4 text-orange-400 font-mono">
                {formatCurrency(item.totalInvested)}
              </td>
              <td className="py-3 px-4 text-green-400 font-mono">
                {formatCurrency(item.interestGenerated)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
