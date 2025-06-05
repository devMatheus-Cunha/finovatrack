import React from 'react'
import {
  Tag,
  Package,
  Edit,
  CheckCircle,
  CircleDashed,
  Eye,
  Flag,
  Info,
  Trash2
} from 'lucide-react'
import { IItem } from '../types'
import { getPriorityTextColorClass } from '../utils/helpers'
import { useUserData, useIsVisibilityDatas } from '@/hooks/globalStates'
import { formatCurrencyMoney } from '@/utils/formatNumber'

interface ItemCardProps {
  item: IItem
  onEdit: (item: IItem) => void
  onView: (item: IItem) => void
  onDelete: (item: IItem) => void
  viewMode?: boolean
}

export function ItemCard({
  item,
  onEdit,
  onView,
  onDelete,
  viewMode = false
}: ItemCardProps) {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()

  if (viewMode) {
    return (
      <li
        className="bg-gray-700 border border-gray-600 rounded-lg p-2 shadow-sm hover:shadow-md transition duration-200 relative grid grid-cols-2 gap-x-2 gap-y-1 items-center w-full h-full cursor-pointer"
        onClick={() => onView(item)}
        title="Visualizar Detalhes"
      >
        <p className="col-span-2 font-semibold text-gray-50 text-lg">
          {item.properties.Nome.title[0]?.plain_text}
        </p>

        {item.properties.productInfo && (
          <p className="col-span-2 text-[0.87rem] text-gray-300 flex items-start">
            <Info className="inline-block w-3 h-5 mr-1 text-gray-400 flex-shrink-0  align-middle" />
            <span className="truncate align-middle">
              {item.properties.productInfo}
            </span>
          </p>
        )}

        <p className="text-[0.87rem] text-gray-300 flex items-center">
          <Tag className="inline-block w-3 h-5 mr-1 text-gray-400 self-center" />
          <span className="truncate align-middle">
            {item.properties.Categoria.select.name}
          </span>
        </p>

        <p className="text-[0.87rem] text-gray-300 flex items-center justify-end">
          <Flag className="inline-block w-3 h-5 mr-1 text-gray-400 self-center" />
          <span
            className={
              getPriorityTextColorClass(item.properties.priority) +
              ' align-middle'
            }
          >
            {item.properties.priority}
          </span>
        </p>

        <p className="text-[0.87rem] text-gray-300 flex items-center">
          <Package className="inline-block w-3 h-5 mr-1 text-gray-400 self-center" />
          <span className="align-middle">
            Qtde: {item.properties.Quantidade?.number || 1}
          </span>
        </p>

        <p className="text-[0.87rem] text-gray-300 flex items-center justify-end">
          <span className="align-middle">
            {formatCurrencyMoney(
              (item.properties.Preco?.number || 0) *
                (item.properties.Quantidade?.number || 1),
              userData?.primary_currency,
              isVisibilityData
            )}
          </span>
        </p>

        <p className="col-span-2 text-[0.87rem] flex items-center justify-center mt-2">
          {item.properties.Comprado.checkbox ? (
            <>
              <CheckCircle className="inline-block w-4 h-4 mr-1 text-green-400 align-middle" />
              <span className="text-green-500 font-medium align-middle">
                Comprado
              </span>
            </>
          ) : (
            <>
              <CircleDashed className="inline-block w-4 h-4 mr-1 text-yellow-400 align-middle" />
              <span className="text-yellow-500 font-medium align-middle">
                Não Comprado
              </span>
            </>
          )}
        </p>

        <div className="absolute top-2 right-2 flex space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit(item)
            }}
            className="p-1 rounded-full bg-blue-700 text-blue-200 hover:bg-blue-600 transition duration-150 ease-in-out"
            title="Editar Item"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(item)
            }}
            className="p-1 rounded-full bg-red-700 text-red-200 hover:bg-red-600 transition duration-150 ease-in-out"
            title="Deletar Item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </li>
    )
  }

  return (
    <li className="bg-gray-700 border border-gray-600 rounded-lg p-2 shadow-sm hover:shadow-md transition duration-200 relative grid grid-cols-2 gap-x-2 gap-y-1 items-center w-full h-full">
      <p className="col-span-2 font-semibold text-gray-50 text-lg">
        {item.properties.Nome.title[0]?.plain_text}
      </p>

      {item.properties.productInfo && (
        <p className="col-span-2 text-[0.87rem] text-gray-300 flex items-start">
          <Info className="inline-block w-3 h-5 mr-1 text-gray-400 flex-shrink-0  align-middle" />
          <span className="truncate align-middle">
            {item.properties.productInfo}
          </span>
        </p>
      )}

      <p className="text-[0.87rem] text-gray-300 flex items-center">
        <Tag className="inline-block w-3 h-5 mr-1 text-gray-400 self-center" />
        <span className="truncate align-middle">
          {item.properties.Categoria.select.name}
        </span>
      </p>

      <p className="text-[0.87rem] text-gray-300 flex items-center justify-end">
        <Flag className="inline-block w-3 h-5 mr-1 text-gray-400 self-center" />
        <span
          className={
            getPriorityTextColorClass(item.properties.priority) +
            ' align-middle'
          }
        >
          {item.properties.priority}
        </span>
      </p>

      <p className="text-[0.87rem] text-gray-300 flex items-center">
        <Package className="inline-block w-3 h-5 mr-1 text-gray-400 self-center" />
        <span className="align-middle">
          Qtde: {item.properties.Quantidade?.number || 1}
        </span>
      </p>

      <p className="text-[0.87rem] text-gray-300 flex items-center justify-end">
        <span className="align-middle">
          {formatCurrencyMoney(
            (item.properties.Preco?.number || 0) *
              (item.properties.Quantidade?.number || 1),
            userData?.primary_currency,
            isVisibilityData
          )}
        </span>
      </p>

      <p className="col-span-2 text-[0.87rem] flex items-center justify-center mt-2">
        {item.properties.Comprado.checkbox ? (
          <>
            <CheckCircle className="inline-block w-4 h-4 mr-1 text-green-400 align-middle" />
            <span className="text-green-500 font-medium align-middle">
              Comprado
            </span>
          </>
        ) : (
          <>
            <CircleDashed className="inline-block w-4 h-4 mr-1 text-yellow-400 align-middle" />
            <span className="text-yellow-500 font-medium align-middle">
              Não Comprado
            </span>
          </>
        )}
      </p>

      <div className="absolute top-2 right-2 flex space-x-1">
        <button
          onClick={() => onView(item)}
          className="p-1 rounded-full bg-blue-700 text-blue-200 hover:bg-blue-600 transition duration-150 ease-in-out"
          title="Visualizar Detalhes"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          onClick={() => onEdit(item)}
          className="p-1 rounded-full bg-blue-700 text-blue-200 hover:bg-blue-600 transition duration-150 ease-in-out"
          title="Editar Item"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(item)}
          className="p-1 rounded-full bg-red-700 text-red-200 hover:bg-red-600 transition duration-150 ease-in-out"
          title="Deletar Item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </li>
  )
}
