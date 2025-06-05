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
  onPriorityChange: (priority: string) => void
  onResetFilters: () => void
}

export function Filters({
  filters,
  onRoomChange,
  onCategoryChange,
  onBoughtStatusChange,
  onIncludeBoughtChange,
  onPriorityChange,
  onResetFilters
}: FiltersProps) {
  const {
    selectedRoom,
    selectedCategory,
    selectedBoughtStatus,
    selectedPriorities,
    includeBoughtInCalculations
  } = filters

  return (
    <section className="bg-gray-700 shadow-lg w-full rounded-xl p-6">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
          </select>
        </div>
      </div>

      {/* Filtro por Prioridade */}
      <div className="mt-4">
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
      </div>

      {/* Checkbox para incluir comprados nos cálculos */}
      <div className="flex items-center mt-4">
        <CustomCheckbox
          id="includeBoughtInCalculations"
          checked={includeBoughtInCalculations}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onIncludeBoughtChange(e.target.checked)
          }
          label="Incluir itens comprados nos cálculos de valor"
        />
      </div>
    </section>
  )
}
