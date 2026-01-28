import React from 'react'
import { Edit, CheckCircle, CircleDashed, Flag, Trash2 } from 'lucide-react'
import { IItem } from '../types'
import { getPriorityTextColorClass } from '../utils/helpers'
import { useUserData, useIsVisibilityDatas } from '@/hooks/globalStates'
import { formatCurrencyMoney } from '@/utils/formatNumber'

interface ItemCardProps {
  item: IItem
  onEdit: (item: IItem) => void
  onView: (item: IItem) => void
  onDelete: (item: IItem) => void
  viewMode?: 'grid' | 'list'
}

export function ItemCard({ item, onEdit, onView, onDelete }: ItemCardProps) {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()

  const isComprado = item.properties.Comprado.checkbox
  const isEarlyPurchase = item.properties.earlyPurchase

  const getStatusBgColor = () => {
    if (isComprado)
      return 'bg-green-500/[0.02] border-green-500/20 hover:border-green-500/40'
    if (isEarlyPurchase)
      return 'bg-green-500/[0.02] border-green-500/20 hover:border-green-500/40'
    return 'bg-gray-800/30 border-gray-600 hover:border-blue-500/50 hover:bg-gray-800/50'
  }

  const getStatusIcon = () => {
    if (isComprado) return <CheckCircle className="w-4 h-4 text-green-400" />
    if (isEarlyPurchase) return <Flag className="w-4 h-4 text-green-500" />
    return <CircleDashed className="w-4 h-4 text-yellow-400" />
  }

  const getStatusBarColor = () => {
    if (isComprado) return 'bg-green-500/40'
    if (isEarlyPurchase) return 'bg-green-500/40'
    return 'bg-blue-500/40'
  }

  return (
    <div
      className={`relative flex flex-col p-3 rounded-xl border transition-all duration-200 cursor-pointer ${getStatusBgColor()}`}
      onClick={() => onView(item)}
      title="Visualizar Detalhes"
    >
      {/* Header with Icon and Title */}
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3 flex-1">
          <div
            className={`flex-shrink-0 w-5 h-5 ${isComprado || isEarlyPurchase ? 'text-green-500' : 'text-yellow-400'}`}
          >
            {getStatusIcon()}
          </div>
          <h3
            className={`font-bold text-base truncate ${isComprado ? 'text-gray-400 line-through' : 'text-gray-50'}`}
          >
            {item.properties.Nome.title[0]?.plain_text}
          </h3>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit(item)
            }}
            className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
            title="Editar Item"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(item)
            }}
            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
            title="Deletar Item"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Category and Priority */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
          {item.properties.Categoria.select.name}
        </span>
        <div className="flex items-center align gap-1.5">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
            Prioridade:
          </span>
          <span
            className={`text-[11px] rounded font-bold ${getPriorityTextColorClass(item.properties.priority)}`}
          >
            {item.properties.priority}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-600 mb-2" />

      {/* Quantity and Price Section */}
      <div className="flex items-end justify-between gap-4">
        {/* Quantity */}
        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">
            Quantidade
          </p>
          <p className="text-sm font-semibold text-gray-100">
            Qtde: {item.properties.Quantidade?.number || 1}
          </p>
        </div>

        {/* Price */}
        <div className="flex-1 text-right">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">
            Preço
          </p>
          <span className="text-lg font-bold text-gray-50">
            {formatCurrencyMoney(
              (item.properties.Preco?.number || 0) *
                (item.properties.Quantidade?.number || 1),
              userData?.primary_currency,
              isVisibilityData
            )}
          </span>
        </div>
      </div>

      {/* Status Indicator Bar */}
      <div
        className={`absolute bottom-0 left-0 h-1 rounded-full transition-all duration-300 ${
          isComprado || isEarlyPurchase
            ? 'w-full ' + getStatusBarColor()
            : 'w-0 ' + getStatusBarColor()
        }`}
      />
    </div>
  )
}
