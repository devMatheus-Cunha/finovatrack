// components/PriceHistoryModal.tsx (Componente para Histórico de Preços)

import React from 'react'
import { XCircle } from 'lucide-react'
import { IPriceHistoryEntry } from '../types'
import { useUserData, useIsVisibilityDatas } from '@/hooks/globalStates'
import { formatCurrencyMoney } from '@/utils/formatNumber'

interface PriceHistoryModalProps {
  isOpen: boolean
  onClose: () => void
  history: IPriceHistoryEntry[]
  onDelete?: () => void // Novo: handler opcional para deletar
}

export const PriceHistoryModal: React.FC<PriceHistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onDelete
}) => {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-800/50 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-700 rounded-xl shadow-2xl p-6 w-full max-w-md relative text-gray-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
        >
          <XCircle className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-semibold text-blue-400 mb-6 flex items-center">
          Histórico de Preços
        </h2>{' '}
        {history && history.length > 0 ? (
          <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {history.map((entry, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-800/50 p-3 rounded-md"
              >
                <span className="font-medium text-gray-50">
                  {formatCurrencyMoney(
                    entry.price,
                    userData?.primary_currency,
                    isVisibilityData
                  )}
                </span>
                <span className="text-sm text-gray-300">{entry.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-center">
            Nenhum histórico de preço disponível.
          </p>
        )}
        <div className="mt-6 text-right flex gap-2 justify-end">
          {onDelete && (
            <button
              onClick={onDelete}
              className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
            >
              Deletar
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
