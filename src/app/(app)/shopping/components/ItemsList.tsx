import React from 'react'
import { Home, PlusCircle } from 'lucide-react'
import { IItem } from '../types'
import { ItemCard } from './ItemCard'

interface ItemsListProps {
  itemsByRoom: { [key: string]: { items: IItem[]; totalValue: number } }
  onAddItem: () => void
  onEditItem: (item: IItem) => void
  onViewItem: (item: IItem) => void
  onDeleteItem: (item: IItem) => void
  viewMode?: boolean
}

export function ItemsList({
  itemsByRoom,
  onAddItem,
  onEditItem,
  onViewItem,
  onDeleteItem,
  viewMode = false
}: ItemsListProps) {
  return (
    <section className="bg-gray-700 shadow-lg rounded-xl p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-2xl font-semibold text-gray-100 flex items-center mb-2 md:mb-0">
          <Home className="w-5 h-5 text-gray-400 mr-2" />
          Itens por Cômodo
        </h2>
        <button
          onClick={onAddItem}
          className="bg-blue-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out flex items-center justify-center"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Adicionar Novo Item
        </button>
      </div>

      {Object.keys(itemsByRoom).length === 0 && (
        <p className="text-gray-400 text-center py-4">
          Nenhum item encontrado com os filtros selecionados.
        </p>
      )}

      {Object.keys(itemsByRoom)
        .sort()
        .map(
          (roomName) =>
            itemsByRoom[roomName].items.length > 0 && (
              <div
                key={roomName}
                className="mb-8 p-4 bg-gray-800/50 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-bold text-blue-400 mb-3 flex items-center">
                  <Home className="w-5 h-5 mr-2" />
                  {roomName} ({itemsByRoom[roomName].items.length} itens)
                </h3>
                <p className="text-md font-semibold text-gray-200 mb-3">
                  Valor Estimado do Cômodo:{' '}
                  <span className="text-blue-300">
                    R$ {itemsByRoom[roomName].totalValue.toFixed(2)}
                  </span>
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                  {itemsByRoom[roomName].items.map((item) => (
                    <li className="flex w-full" key={item.id}>
                      <ItemCard
                        item={item}
                        onEdit={onEditItem}
                        onView={onViewItem}
                        onDelete={onDeleteItem}
                        viewMode={viewMode}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )
        )}
    </section>
  )
}
