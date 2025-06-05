import { useState, useCallback } from 'react'
import { IItem, ILink, IPriceHistoryEntry } from '../types'
import { getDomainName } from '../utils/helpers'
import { toast } from 'react-toastify'

export function useShoppingModals() {
 const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
 const [editingItem, setEditingItem] = useState<IItem | null>(null)
 const [modalMode, setModalMode] = useState<'view' | 'edit'>('edit')
 const [isPriceHistoryModalOpen, setIsPriceHistoryModalOpen] =
  useState<boolean>(false)
 const [priceHistoryData, setPriceHistoryData] = useState<{
  history: IPriceHistoryEntry[]
  itemName: string
 } | null>(null)

 const openAddModal = useCallback(() => {
  setEditingItem(null)
  setModalMode('edit')
  setIsModalOpen(true)
 }, [])

 const openEditModal = useCallback((item: IItem) => {
  setEditingItem(item)
  setModalMode('edit')
  setIsModalOpen(true)
 }, [])

 const openViewModal = useCallback((item: IItem) => {
  setEditingItem(item)
  setModalMode('view')
  setIsModalOpen(true)
 }, [])

 const closeItemModal = useCallback(() => {
  setIsModalOpen(false)
  setEditingItem(null)
 }, [])

 const openPriceHistoryModal = useCallback((link: ILink, itemName: string) => {
  if (link.historicoPrecos) {
   setPriceHistoryData({
    history: link.historicoPrecos,
    itemName: `${itemName} (${link.text || getDomainName(link.url)})`
   })
   setIsPriceHistoryModalOpen(true)
  } else {
   toast.info('Este link não possui histórico de preços.')
  }
 }, [])

 const closePriceHistoryModal = useCallback(() => {
  setIsPriceHistoryModalOpen(false)
  setPriceHistoryData(null)
 }, [])

 const switchToEditMode = useCallback(() => {
  setModalMode('edit')
 }, [])

 return {
  // Modal states
  isModalOpen,
  editingItem,
  modalMode,
  isPriceHistoryModalOpen,
  priceHistoryData,

  // Modal actions
  openAddModal,
  openEditModal,
  openViewModal,
  closeItemModal,
  openPriceHistoryModal,
  closePriceHistoryModal,
  switchToEditMode
 }
}
