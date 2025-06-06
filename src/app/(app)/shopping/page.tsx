'use client'
import React, { useState } from 'react'

// Hooks organizados
import {
  useShoppingItems,
  useShoppingFilters,
  useShoppingData,
  useShoppingModals
} from './hooks'

// Componentes organizados
import {
  StatsOverview,
  Filters,
  ItemsList,
  ItemFormModal,
  PriceHistoryModal,
  ConfirmDeleteModal
} from './components'

export default function ShoppingPage() {
  // Custom hooks para separar responsabilidades
  const {
    filters,
    setSelectedRoom,
    setSelectedCategory,
    setSelectedBoughtStatus,
    setIncludeBoughtInCalculations,
    setOrderByField,
    setOrderDirection,
    handleResetFilters,
    handlePriorityFilterChange
  } = useShoppingFilters()
  const { items, error, addItem, editItem } = useShoppingItems(filters)

  const { totalUniqueItems, totalOverallValue, itemsByRoom } = useShoppingData(
    items,
    filters
  )

  const {
    isModalOpen,
    editingItem,
    modalMode,
    isPriceHistoryModalOpen,
    priceHistoryData,
    openAddModal,
    openEditModal,
    openViewModal,
    closeItemModal,
    openPriceHistoryModal,
    closePriceHistoryModal,
    switchToEditMode
  } = useShoppingModals()

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<any>(null)

  // Handlers para submissão de forms
  const handleAddItemSubmit = (formData: any) => {
    addItem(formData)
    closeItemModal()
  }

  const handleEditItemSubmit = (formData: any) => {
    if (editingItem) {
      editItem({ id: editingItem.id, data: formData })
      closeItemModal()
    }
  }

  // Handler para deletar item
  const { deleteItem: deleteItemMutation, isDeletingItem } =
    useShoppingItems(filters)

  const handleDeleteItem = (item: any) => {
    closeItemModal()
    setItemToDelete(item)
    setDeleteModalOpen(true)
  }
  const handleConfirmDelete = () => {
    if (itemToDelete) {
      deleteItemMutation(itemToDelete.id)
      setDeleteModalOpen(false)
      setItemToDelete(null)
    }
  }
  const handleCancelDelete = () => {
    setDeleteModalOpen(false)
    setItemToDelete(null)
  }

  // Estados de loading e error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 text-2xl">
        Erro: {error.message}
      </div>
    )
  }

  return (
    <div className="p-2 lg:p-0 min-h-screen flex flex-col gap-4">
      {/* Estatísticas gerais + Filtros lado a lado */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch w-full">
        <div className="w-full lg:w-[70%] h-full flex">
          <StatsOverview
            totalUniqueItems={totalUniqueItems}
            totalOverallValue={totalOverallValue}
            includeBoughtInCalculations={filters.includeBoughtInCalculations}
          />
        </div>
        <div className="w-full h-full flex">
          <Filters
            filters={filters}
            onRoomChange={setSelectedRoom}
            onCategoryChange={setSelectedCategory}
            onBoughtStatusChange={setSelectedBoughtStatus}
            onIncludeBoughtChange={setIncludeBoughtInCalculations}
            onPriorityChange={handlePriorityFilterChange}
            onResetFilters={handleResetFilters}
            onOrderByFieldChange={setOrderByField}
            onOrderDirectionChange={setOrderDirection}
          />
        </div>
      </div>
      {/* Lista de itens */}
      <div className="relative min-h-[200px]">
        <ItemsList
          itemsByRoom={itemsByRoom}
          onAddItem={openAddModal}
          onEditItem={openEditModal}
          onViewItem={openViewModal}
          onDeleteItem={
            editingItem
              ? () => {
                  closeItemModal()
                  handleDeleteItem(editingItem)
                }
              : () => {}
          }
          viewMode
        />
      </div>
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        loading={isDeletingItem}
        title="Confirmar exclusão"
        description={`Tem certeza que deseja deletar o item "${itemToDelete?.properties?.Nome?.title?.[0]?.plain_text ?? ''}"? Esta ação não pode ser desfeita.`}
      />
      {/* Modal de adição/edição/visualização */}
      <ItemFormModal
        isOpen={isModalOpen}
        onClose={closeItemModal}
        onSubmit={editingItem ? handleEditItemSubmit : handleAddItemSubmit}
        initialData={editingItem}
        mode={modalMode}
        onEditClick={switchToEditMode}
        onViewPriceHistory={openPriceHistoryModal}
        onDelete={() => handleDeleteItem(editingItem)}
        isDeleting={isDeletingItem}
      />
      {/* Modal de histórico de preços */}
      {priceHistoryData && (
        <PriceHistoryModal
          isOpen={isPriceHistoryModalOpen}
          onClose={closePriceHistoryModal}
          history={priceHistoryData.history || []}
        />
      )}
    </div>
  )
}
