import React from 'react'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { IEntrysData } from '@/hooks/entrys/useFetchEntrysData'
import { Button } from '@/components'

interface IEntrysModalProps {
  onClose: () => void
  entrys: IEntrysData[]
}

const columsHeadProps = [{ header: 'Entradas', field: 'value' }]

function EntrysModal({ onClose, entrys }: IEntrysModalProps) {
  const { isVisibilityData } = useIsVisibilityDatas()
  const { userData } = useUserData()

  return (
    <div className="bg-gray-700 rounded-lg shadow-xl w-full max-w-xl mx-auto">
      <div className="px-6 pt-6 pb-2 border-b border-gray-600 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">
          Detalhes das Entradas
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-2xl font-bold focus:outline-none"
          aria-label="Fechar"
        >
          ×
        </button>
      </div>
      <div className="px-6 py-4">
        <table className="min-w-full text-left">
          <thead>
            <tr>
              {columsHeadProps.map((item) => (
                <th key={item.field} className="text-gray-400 pb-2 font-medium">
                  {item.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entrys?.map((item, index) => (
              <tr key={index}>
                <td className="text-white py-2">
                  {formatCurrencyMoney(
                    item.value,
                    userData.primary_currency,
                    isVisibilityData
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-gray-600 flex justify-end">
        <Button variant="cancel" onClick={onClose}>
          Fechar
        </Button>
      </div>
    </div>
  )
}

export default EntrysModal
