'use client'
import { useState } from 'react'
import { ExpenseData } from '@/entities/expense/model/types'
import useCustomDisclosure from '@/shared/hooks/useCustomDisclosure'
import { useExpenseFilter } from '@/features/expense/filter-expenses/model/useExpenseFilter'
import useDeletedExpense from '@/entities/expense/model/useDeletedExpense'

export const useDeleteExpenseModal = () => {
  const { isOpen, onOpen, onClose } = useCustomDisclosure()
  const [selectedExpense, setSelectedExpense] = useState<ExpenseData | null>(
    null
  )

  const { deletedExpense, isDeleting } = useDeletedExpense()
  const { clearFilter } = useExpenseFilter()

  const handleOpenModal = (expense: ExpenseData) => {
    setSelectedExpense(expense)
    onOpen()
  }

  const handleCloseModal = () => {
    setSelectedExpense(null)
    onClose()
  }

  const handleDelete = async () => {
    if (!selectedExpense) return

    try {
      await deletedExpense(selectedExpense)

      clearFilter()
      handleCloseModal()
    } catch (error) {
      console.error('Falha ao deletar despesa', error)
    }
  }

  return {
    isModalOpen: isOpen,
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
    confirmDeletion: handleDelete,
    isDeleting: isDeleting
  }
}
