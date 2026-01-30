import React, { useState } from 'react'
import {
  Home,
  PlusCircle,
  LayoutGrid,
  List as ListIcon,
  CheckCircle,
  Flag,
  CircleDashed,
  Sliders,
  Wind,
  Coffee,
  Bed,
  Sofa,
  UtensilsCrossed
} from 'lucide-react'
import { IItem } from '../types'
import { ItemCard } from './ItemCard'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import useUserData from '@/hooks/globalStates/useUserData'
import useIsVisibilityDatas from '@/hooks/globalStates/useIsVisibilityDatas'

interface ItemsListProps {
  itemsByRoom: { [key: string]: { items: IItem[]; totalValue: number } }
  onAddItem: () => void
  onEditItem: (item: IItem) => void
  onViewItem: (item: IItem) => void
  onDeleteItem: (item: IItem) => void
}

const getRoomIcon = (roomName: string) => {
  const lowerRoom = roomName.toLowerCase()
  if (lowerRoom.includes('banheiro')) return <Wind className="w-5 h-5" />
  if (lowerRoom.includes('cozinha') || lowerRoom.includes('cafeteria'))
    return <Coffee className="w-5 h-5" />
  if (lowerRoom.includes('quarto') || lowerRoom.includes('bedroom'))
    return <Bed className="w-5 h-5" />
  if (lowerRoom.includes('sala') || lowerRoom.includes('living'))
    return <Sofa className="w-5 h-5" />
  if (lowerRoom.includes('cozinha'))
    return <UtensilsCrossed className="w-5 h-5" />
  return <Home className="w-5 h-5" />
}

export function ItemsList({
  itemsByRoom,
  onAddItem,
  onEditItem,
  onViewItem,
  onDeleteItem
}: ItemsListProps) {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)

  const totalValue = Object.values(itemsByRoom).reduce(
    (sum, room) => sum + room.totalValue,
    0
  )
  const roomNames = Object.keys(itemsByRoom).sort()

  const visibleRooms =
    selectedRoom === null
      ? roomNames
      : [selectedRoom].filter((r) => itemsByRoom[r])

  return (
    <div className="space-y-6">
      {/* Main Header Card */}
      <section className="bg-gray-700 shadow-lg rounded-2xl border border-gray-600/50 p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3 text-gray-100">
              <Home className="text-blue-400" size={28} />
              Itens por Cômodo
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Gerencie seu inventário de forma inteligente
            </p>
          </div>
          <button
            onClick={onAddItem}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 transition-colors px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-600/20"
          >
            <PlusCircle size={20} />
            Adicionar Novo Item
          </button>
        </div>
      </section>
      {Object.keys(itemsByRoom).length > 0 && (
        <div className="flex items-center justify-between gap-4 px-1 py-1">
          {/* Scroll de Cômodos com Fade e Scrollbar Discreta */}
          <div className="relative flex-1 overflow-hidden group">
            <div
              className="flex gap-2 overflow-x-auto pb-2 scroll-smooth
                         scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent
                         [scrollbar-width:thin] [scrollbar-color:#4b5563_transparent]"
              style={{
                msOverflowStyle: 'none'
              }}
            >
              <button
                onClick={() => setSelectedRoom(null)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all whitespace-nowrap flex-shrink-0 ${
                  selectedRoom === null
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600 border border-gray-600/40'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                Todos
                <span
                  className={`ml-1 px-1.5 py-0.5 rounded-md text-[9px] font-black ${selectedRoom === null ? 'bg-white/20' : 'bg-gray-600'}`}
                >
                  {roomNames.reduce(
                    (sum, room) => sum + itemsByRoom[room].items.length,
                    0
                  )}
                </span>
              </button>

              {roomNames.map((roomName) => (
                <button
                  key={roomName}
                  onClick={() => setSelectedRoom(roomName)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all whitespace-nowrap flex-shrink-0 ${
                    selectedRoom === roomName
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600 border border-gray-600/40'
                  }`}
                >
                  {getRoomIcon(roomName)}
                  {roomName}
                  <span
                    className={`ml-1 px-1.5 py-0.5 rounded-md text-[9px] font-black ${selectedRoom === roomName ? 'bg-white/20' : 'bg-gray-600'}`}
                  >
                    {itemsByRoom[roomName].items.length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {Object.keys(itemsByRoom).length === 0 && (
        <p className="text-gray-400 text-center py-8">
          Nenhum item encontrado com os filtros selecionados.
        </p>
      )}

      {/* Room Sections - Each with its own Card */}
      <div className="space-y-6">
        {visibleRooms.map(
          (roomName) =>
            itemsByRoom[roomName].items.length > 0 && (
              <section
                key={roomName}
                className="bg-gray-700 shadow-lg rounded-2xl border border-gray-600/50 overflow-hidden"
              >
                {/* Room Header */}
                <div className="flex justify-between p-6 border-b border-gray-500">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                          <Home size={24} />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-100">
                            {roomName}{' '}
                            <span className="text-blue-400 text-sm font-normal">
                              ({itemsByRoom[roomName].items.length} itens)
                            </span>
                          </h2>
                          <div className="flex flex-col gap-2 mt-2">
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-300 italic">
                                Valor Estimado:{' '}
                                {formatCurrencyMoney(
                                  itemsByRoom[roomName].totalValue,
                                  userData?.primary_currency,
                                  isVisibilityData
                                )}
                              </span>
                              <div className="w-32 h-2 bg-gray-600 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-600 transition-all duration-300"
                                  style={{
                                    width:
                                      totalValue > 0
                                        ? `${(itemsByRoom[roomName].totalValue / totalValue) * 100}%`
                                        : '0%'
                                  }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-300">
                              <span>
                                Itens Concluídos:{' '}
                                {
                                  itemsByRoom[roomName].items.filter(
                                    (i) =>
                                      i.properties.Comprado.checkbox ||
                                      i.properties.earlyPurchase
                                  ).length
                                }
                                /{itemsByRoom[roomName].items.length}
                              </span>
                              <span>
                                Restante:{' '}
                                {formatCurrencyMoney(
                                  itemsByRoom[roomName].items
                                    .filter(
                                      (i) =>
                                        !i.properties.Comprado.checkbox &&
                                        !i.properties.earlyPurchase
                                    )
                                    .reduce(
                                      (sum, i) =>
                                        sum +
                                        (i.properties.Preco?.number || 0) *
                                          (i.properties.Quantidade?.number ||
                                            1),
                                      0
                                    ),
                                  userData?.primary_currency,
                                  isVisibilityData
                                )}
                              </span>
                              <span>
                                Gasto:{' '}
                                {formatCurrencyMoney(
                                  itemsByRoom[roomName].items
                                    .filter(
                                      (i) =>
                                        i.properties.Comprado.checkbox || // Mantém apenas o que está marcado
                                        i.properties.earlyPurchase // E o que foi compra antecipada
                                    )
                                    .reduce(
                                      (sum, i) =>
                                        sum +
                                        (i.properties.Preco?.number || 0) *
                                          (i.properties.Quantidade?.number ||
                                            1),
                                      0
                                    ),
                                  userData?.primary_currency,
                                  isVisibilityData
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-300">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-green-400" />{' '}
                      Comprado
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Flag className="w-4 h-4 text-green-500" /> Compra
                      Antecipada
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CircleDashed className="w-4 h-4 text-yellow-400" /> Não
                      Comprado
                    </div>
                  </div>
                </div>

                {/* Items Container */}
                <div className="p-6">
                  <div
                    className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
                        : 'flex flex-col gap-2'
                    }
                  >
                    {itemsByRoom[roomName].items.map((item) => (
                      <ItemCard
                        key={item.id}
                        item={item}
                        onEdit={onEditItem}
                        onView={onViewItem}
                        onDelete={onDeleteItem}
                        viewMode={viewMode}
                      />
                    ))}
                  </div>
                </div>

                {/* Room Footer Info */}
              </section>
            )
        )}
      </div>
    </div>
  )
}
