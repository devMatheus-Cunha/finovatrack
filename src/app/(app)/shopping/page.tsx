'use client'
import React, { useState } from 'react'

import {
  useShoppingItems,
  useShoppingFilters,
  useShoppingData,
  useShoppingModals
} from './hooks'

import {
  StatsOverview,
  Filters,
  ItemsList,
  ItemFormModal,
  PriceHistoryModal,
  ConfirmDeleteModal
} from './components'

export default function ShoppingPage() {
  const {
    filters,
    setSelectedRoom,
    setSelectedCategory,
    setSelectedBoughtStatus,
    setIncludeBoughtInCalculations,
    setIncludeEarlyPurchaseInCalculations,
    setOrderByField,
    setOrderDirection,
    handleResetFilters,
    handlePriorityFilterChange
  } = useShoppingFilters()
  const { items, error, addItem, editItem } = useShoppingItems(filters)

  const {
    totalUniqueItems,
    totalOverallValue,
    totalSpentValue,
    earlyTotal,
    boughtTotal,
    baseOverallValue,
    itemsByRoom
  } = useShoppingData(items, filters)

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

  const { deleteItem: deleteItemMutation, isDeletingItem } =
    useShoppingItems(filters)

  const handleDeleteItem = (item: any) => {
    console.log(item)
    closeItemModal()
    setItemToDelete(item)
    setDeleteModalOpen(true)
  }
  const handleConfirmDelete = () => {
    console.log(itemToDelete)
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 text-2xl">
        Erro: {error.message}
      </div>
    )
  }

  return (
    <div className="p-2 lg:p-0 min-h-screen flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row gap-6 items-stretch w-full">
        <div className="w-full lg:w-[70%] h-full flex">
          <StatsOverview
            totalUniqueItems={totalUniqueItems}
            totalOverallValue={totalOverallValue}
            totalSpentValue={totalSpentValue}
            earlyTotal={earlyTotal}
            boughtTotal={boughtTotal}
            baseOverallValue={baseOverallValue}
            includeEarlyPurchase={filters.includeEarlyPurchaseInCalculations}
          />
        </div>
        <div className="w-full h-full flex">
          <Filters
            filters={filters}
            onRoomChange={setSelectedRoom}
            onCategoryChange={setSelectedCategory}
            onBoughtStatusChange={setSelectedBoughtStatus}
            onIncludeBoughtChange={setIncludeBoughtInCalculations}
            onIncludeEarlyPurchaseChange={setIncludeEarlyPurchaseInCalculations}
            onPriorityChange={handlePriorityFilterChange}
            onResetFilters={handleResetFilters}
            onOrderByFieldChange={setOrderByField}
            onOrderDirectionChange={setOrderDirection}
          />
        </div>
      </div>
      <div className="relative min-h-[200px]">
        <ItemsList
          itemsByRoom={itemsByRoom}
          onAddItem={openAddModal}
          onEditItem={openEditModal}
          onViewItem={openViewModal}
          onDeleteItem={(item) => {
            handleDeleteItem(item)
            closeItemModal()
          }}
        />
      </div>
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        loading={isDeletingItem}
      />
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
