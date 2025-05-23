'use client'

import React from 'react'
import { Trash } from '@phosphor-icons/react'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { IEntrysData } from '@/hooks/entrys/useFetchEntrysData'
import { Button } from '@/components'

interface IContentModal {
  handleOpenModal: () => void // Alterado para função sem parâmetro
  data: IEntrysData[]
  onDelete: (itemId?: string) => void
}

const columsHeadProps = [
  { header: 'Entradas', field: 'value' },
  { header: 'Ação', field: 'actions' }
]

function ContentTotalEntrys({
  handleOpenModal,
  data,
  onDelete
}: IContentModal) {
  const { isVisibilityData } = useIsVisibilityDatas()
  const { userData } = useUserData()

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-auto">
      <div className="px-6 pt-6 pb-2 border-b border-gray-600 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">
          Veja todas entradas
        </h3>
        <button
          onClick={handleOpenModal}
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
                <th key={item.field} className="text-gray-400 pb-4 font-medium">
                  {item.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item.id}>
                <td className="text-white py-4">
                  {formatCurrencyMoney(
                    item.value,
                    userData.primary_currency,
                    isVisibilityData
                  )}
                </td>
                <td>
                  <Button
                    onClick={() => onDelete(item.id)}
                    variant="ghost"
                    className="text-red-500 hover:text-red-700 p-1"
                    leftIcon={<Trash size={18} />}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-gray-600 flex justify-end">
        <button
          onClick={handleOpenModal}
          className="px-4 py-2 border border-gray-400 rounded text-gray-200 hover:bg-gray-700 focus:outline-none"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}

export default ContentTotalEntrys
