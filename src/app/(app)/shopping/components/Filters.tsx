import React from 'react'
import {
  Home,
  Tag,
  CheckCircle,
  RotateCcw,
  SlidersHorizontal,
  Flag,
  ArrowUpDown,
  Check,
  Calculator
} from 'lucide-react'

// --- Types & Interfaces ---
interface FilterState {
  selectedRoom: string
  selectedCategory: string
  selectedBoughtStatus: string
  selectedPriorities: string[]
  includeBoughtInCalculations: boolean
  orderByField: 'price' | 'name'
  orderDirection: 'asc' | 'desc'
}

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

/**
 * CustomCheckbox ajustado para ser mais legível e fácil de clicar
 */
const CustomCheckbox = ({
  id,
  checked,
  onChange,
  label,
  labelClassName = 'text-gray-200'
}: {
  id: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  labelClassName?: string
}) => (
  <label
    htmlFor={id}
    className={`
      group flex items-center space-x-2 cursor-pointer select-none
      bg-gray-800/40 border border-gray-600/50 rounded-lg px-2.5 py-1.5
      hover:border-gray-500 hover:bg-gray-700/50 transition-all duration-200
      ${checked ? 'border-blue-500/50 bg-blue-500/10' : ''}
    `}
  >
    <div className="relative flex items-center justify-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div
        className={`
        w-4 h-4 rounded border flex items-center justify-center transition-colors
        ${checked ? 'bg-blue-600 border-blue-600' : 'bg-gray-800 border-gray-500 group-hover:border-gray-400'}
      `}
      >
        {checked && <Check className="w-3 h-3 text-white stroke-[3]" />}
      </div>
    </div>
    <span
      className={`text-[11px] font-bold uppercase tracking-tight ${labelClassName}`}
    >
      {label}
    </span>
  </label>
)

const PRIORITY_OPTIONS = ['Alto', 'Médio', 'Baixo']
const ROOM_OPTIONS = [
  { value: 'sala', label: 'Sala' },
  { value: 'cozinha', label: 'Cozinha' },
  { value: 'quarto', label: 'Quarto' }
]
const CATEGORY_OPTIONS = [
  { value: 'moveis', label: 'Móveis' },
  { value: 'eletronicos', label: 'Eletro' }
]

const getPriorityTextColorClass = (priority: string) => {
  switch (priority) {
    case 'Alto':
      return 'text-red-400'
    case 'Médio':
      return 'text-orange-400'
    case 'Baixo':
      return 'text-blue-400'
    default:
      return 'text-gray-200'
  }
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

  // Aumentado padding (py-2) e fonte (text-xs)
  const selectBaseClass =
    'block w-full pl-3 pr-8 py-2 text-xs border-gray-600/60 bg-gray-800/50 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-all hover:bg-gray-800 cursor-pointer appearance-none'

  const DropdownArrow = () => (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-400">
      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
      </svg>
    </div>
  )

  return (
    <section className="bg-gray-700 shadow-xl w-full rounded-2xl border border-gray-600/50 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 border-b border-gray-600 flex justify-between items-center bg-gray-700/50">
        <div className="flex items-center space-x-2.5">
          <SlidersHorizontal className="w-4 h-4 text-blue-400" />
          <h2 className="text-sm font-bold text-gray-100 uppercase tracking-wide">
            Filtros
          </h2>
        </div>
        <button
          onClick={onResetFilters}
          className="text-gray-400 hover:text-red-400 transition-colors flex items-center text-[10px] font-black uppercase tracking-widest"
        >
          <RotateCcw className="w-3 h-3 mr-2" />
          Limpar
        </button>
      </div>

      <div className="p-5 space-y-5">
        {/* Linha 1: Seletores Principais */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 flex items-center">
              <Home className="w-3 h-3 mr-1.5" /> Cômodo
            </label>
            <div className="relative">
              <select
                value={selectedRoom}
                onChange={(e) => onRoomChange(e.target.value)}
                className={selectBaseClass}
              >
                <option value="">Todos</option>
                {ROOM_OPTIONS.map((room) => (
                  <option key={room.value} value={room.value}>
                    {room.label}
                  </option>
                ))}
              </select>
              <DropdownArrow />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 flex items-center">
              <Tag className="w-3 h-3 mr-1.5" /> Categoria
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className={selectBaseClass}
              >
                <option value="">Todas</option>
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <DropdownArrow />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 flex items-center">
              <CheckCircle className="w-3 h-3 mr-1.5" /> Status
            </label>
            <div className="relative">
              <select
                value={selectedBoughtStatus}
                onChange={(e) => onBoughtStatusChange(e.target.value)}
                className={selectBaseClass}
              >
                <option value="Todos">Todos</option>
                <option value="Nao Comprado">Não Comprado</option>
                <option value="Comprado">Comprado</option>
                <option value="Compra Antecipada">Antecipado</option>
              </select>
              <DropdownArrow />
            </div>
          </div>
        </div>

        {/* Linha 2: Ordenação e Prioridade Lado a Lado */}
        <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
          {/* Ordenação */}
          <div className="space-y-1.5 min-w-[160px]">
            <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 flex items-center">
              <ArrowUpDown className="w-3 h-3 mr-1.5" /> Ordenar
            </label>
            <div className="flex">
              <select
                value={orderByField}
                onChange={(e) =>
                  onOrderByFieldChange(e.target.value as 'price' | 'name')
                }
                className={`${selectBaseClass} rounded-r-none border-r-0`}
              >
                <option value="price">Preço</option>
                <option value="name">Nome</option>
              </select>
              <select
                value={orderDirection}
                onChange={(e) =>
                  onOrderDirectionChange(e.target.value as 'asc' | 'desc')
                }
                className={`${selectBaseClass} rounded-l-none w-24`}
              >
                <option value="desc">Desc</option>
                <option value="asc">Asc</option>
              </select>
            </div>
          </div>

          {/* Prioridade */}
          <div className="space-y-1.5 flex-1 min-w-[200px]">
            <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 flex items-center">
              <Flag className="w-3 h-3 mr-1.5" /> Prioridade
            </label>
            <div className="flex gap-2">
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
        </div>

        {/* Linha 3: Cálculos (No Rodapé) */}
        <div className="pt-3.5 border-t border-gray-600/40 flex items-center gap-4">
          <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-green-500/90">
            <Calculator className="w-3.5 h-3.5 mr-2" /> Somar no Total:
          </div>
          <div className="flex gap-2">
            <CustomCheckbox
              id="includeBought"
              checked={includeBoughtInCalculations}
              onChange={(e) => onIncludeBoughtChange(e.target.checked)}
              label="Comprados"
              labelClassName="text-green-400"
            />
            <CustomCheckbox
              id="includeEarly"
              checked={(filters as any).includeEarlyPurchaseInCalculations}
              onChange={(e) => onIncludeEarlyPurchaseChange(e.target.checked)}
              label="Antecipados"
              labelClassName="text-purple-400"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [filters, setFilters] = React.useState<FilterState>({
    selectedRoom: '',
    selectedCategory: '',
    selectedBoughtStatus: 'Todos',
    selectedPriorities: ['Alto'],
    includeBoughtInCalculations: false,
    orderByField: 'price',
    orderDirection: 'desc'
  })

  return (
    <div className="p-6 bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <Filters
          filters={filters}
          onRoomChange={(val) =>
            setFilters((f) => ({ ...f, selectedRoom: val }))
          }
          onCategoryChange={(val) =>
            setFilters((f) => ({ ...f, selectedCategory: val }))
          }
          onBoughtStatusChange={(val) =>
            setFilters((f) => ({ ...f, selectedBoughtStatus: val }))
          }
          onIncludeBoughtChange={(val) =>
            setFilters((f) => ({ ...f, includeBoughtInCalculations: val }))
          }
          onIncludeEarlyPurchaseChange={(val) =>
            setFilters(
              (f) => ({ ...f, includeEarlyPurchaseInCalculations: val }) as any
            )
          }
          onPriorityChange={(p) =>
            setFilters((f) => ({
              ...f,
              selectedPriorities: f.selectedPriorities.includes(p)
                ? f.selectedPriorities.filter((x) => x !== p)
                : [...f.selectedPriorities, p]
            }))
          }
          onResetFilters={() => {}}
          onOrderByFieldChange={(f) =>
            setFilters((old) => ({ ...old, orderByField: f }))
          }
          onOrderDirectionChange={(d) =>
            setFilters((old) => ({ ...old, orderDirection: d }))
          }
        />
      </div>
    </div>
  )
}
