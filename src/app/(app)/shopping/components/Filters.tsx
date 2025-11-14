import React from 'react'
import {
  Home,
  Tag,
  CheckCircle,
  RotateCcw,
  SlidersHorizontal,
  Flag
} from 'lucide-react'
import { CustomCheckbox } from './CustomCheckbox'
import { PRIORITY_OPTIONS, ROOM_OPTIONS, CATEGORY_OPTIONS } from '../constants'
import { getPriorityTextColorClass } from '../utils/helpers'
import { FilterState } from '../hooks'

interface FiltersProps {
  filters: FilterState
  onRoomChange: (room: string) => void
  onCategoryChange: (category: string) => void
  onBoughtStatusChange: (status: string) => void
  onIncludeBoughtChange: (include: boolean) => void
  onIncludeEarlyPurchaseChange: (include: boolean) => void
  onPriorityChange: (priority: string) => void
  onResetFilters: () => void
  onOrderByFieldChange: (field: 'price' | 'name') => void
  onOrderDirectionChange: (dir: 'asc' | 'desc') => void
}

export function Filters({
  filters,
  onRoomChange,
  onCategoryChange,
  onBoughtStatusChange,
  onIncludeBoughtChange,
  onIncludeEarlyPurchaseChange,
  onPriorityChange,
  onResetFilters,
  onOrderByFieldChange,
  onOrderDirectionChange
}: FiltersProps) {
  const {
    selectedRoom,
    selectedCategory,
    selectedBoughtStatus,
    selectedPriorities,
    includeBoughtInCalculations,
    orderByField,
    orderDirection
  } = filters

  return (
    <section className="bg-gray-700 shadow-lg w-full rounded-xl p-6 min-h-[255px]">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-2xl font-semibold text-gray-100 flex items-center mb-2 md:mb-0">
          <SlidersHorizontal className="w-5 h-5 text-gray-400 mr-2" />
          Filtros
        </h2>
        <button
          onClick={onResetFilters}
          className="bg-gray-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-150 ease-in-out flex items-center justify-center"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Resetar Filtros
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
        {/* Filtro por Cômodo */}
        <div>
          <label
            htmlFor="room-filter"
            className="block text-sm font-medium text-gray-200 mb-1"
          >
            <Home className="inline-block w-4 h-4 mr-1 text-gray-400" />
            Filtrar por Cômodo:
          </label>
          <select
            id="room-filter"
            value={selectedRoom}
            onChange={(e) => onRoomChange(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-800/50 text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm transition duration-150 ease-in-out"
          >
            <option value="">Todos</option>
            {ROOM_OPTIONS.map((room) => (
              <option key={room.value} value={room.value}>
                {room.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Categoria */}
        <div>
          <label
            htmlFor="category-filter"
            className="block text-sm font-medium text-gray-200 mb-1"
          >
            <Tag className="inline-block w-4 h-4 mr-1 text-gray-400" />
            Filtrar por Categoria:
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-800/50 text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm transition duration-150 ease-in-out"
          >
            <option value="">Todas</option>
            {CATEGORY_OPTIONS.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Status de Compra */}
        <div>
          <label
            htmlFor="bought-status-filter"
            className="block text-sm font-medium text-gray-200 mb-1"
          >
            <CheckCircle className="inline-block w-4 h-4 mr-1 text-gray-400" />
            Status de Compra:
          </label>
          <select
            id="bought-status-filter"
            value={selectedBoughtStatus}
            onChange={(e) => onBoughtStatusChange(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-800/50 text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm transition duration-150 ease-in-out"
          >
            <option value="Todos">Todos</option>
            <option value="Nao Comprado">Não Comprado</option>
            <option value="Comprado">Comprado</option>
            <option value="Compra Antecipada">Compra Antecipada</option>
          </select>
        </div>
      </div>

      {/* Filtro por Prioridade, Checkbox e Ordenação em linha, label do ordenar no início */}
      <div className="w-full mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-200 mb-1 flex items-center">
            <Flag className="inline-block w-4 h-4 mr-1 text-gray-400" />
            Filtrar por Prioridade:
          </label>
          <div className="flex flex-wrap gap-3 mt-2">
            {PRIORITY_OPTIONS.map((priority) => (
              <CustomCheckbox
                key={`priority-${priority}`}
                id={`priority-${priority}`}
                checked={selectedPriorities.includes(priority)}
                onChange={() => onPriorityChange(priority)}
                label={priority}
                labelClassName={getPriorityTextColorClass(priority)}
              />
            ))}
          </div>
          <div className="mt-3">
            <label className="text-sm font-medium text-gray-200 mb-1 flex items-center">
              <CheckCircle className="inline-block w-4 h-4 mr-1 text-gray-400" />
              Incluir Valores
            </label>
          </div>
          <div className="flex flex-wrap gap-3 mt-2">
            <div>
              <CustomCheckbox
                id="includeBoughtInCalculations"
                checked={includeBoughtInCalculations}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onIncludeBoughtChange(e.target.checked)
                }
                label="Comprados"
              />
            </div>
            <div>
              <CustomCheckbox
                id="includeEarlyPurchaseInCalculations"
                checked={(filters as any).includeEarlyPurchaseInCalculations}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onIncludeEarlyPurchaseChange(e.target.checked)
                }
                label="Antecipados"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full sm:w-auto">
          <label className="block text-sm font-medium text-gray-200 mb-1 sm:mb-0 sm:mr-2">
            Ordenar por:
          </label>
          <div className="flex sm:flex-row items-center w-full sm:w-auto">
            <select
              value={orderByField}
              onChange={(e) =>
                onOrderByFieldChange(e.target.value as 'price' | 'name')
              }
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-800/50 text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
            >
              <option value="price">Preço</option>
              <option value="name">Nome</option>
            </select>
            <select
              value={orderDirection}
              onChange={(e) =>
                onOrderDirectionChange(e.target.value as 'asc' | 'desc')
              }
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-800/50 text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm ml-0 sm:ml-2"
            >
              <option value="desc">Decrescete</option>
              <option value="asc">Ascendente</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  )
}
