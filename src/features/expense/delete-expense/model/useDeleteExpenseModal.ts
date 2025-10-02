'use client'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { ExpenseData } from '@/entities/expense/model/types'
import useCustomDisclosure from '@/shared/hooks/useCustomDisclosure'
import useDeletedExpense from '@/hooks/expenses/useDeletedExpense'
import { useExpenseFilter } from '@/features/expense/filter-expenses/model/useExpenseFilter'

export const useDeleteExpenseModal = () => {
  const { isOpen, onOpen, onClose } = useCustomDisclosure()
  const [selectedExpense, setSelectedExpense] = useState<ExpenseData | null>(
    null
  )

  const { deletedExpense } = useDeletedExpense()
  const { clearFilter } = useExpenseFilter()

  const handleOpenModal = (expense: ExpenseData) => {
    setSelectedExpense(expense)
    onOpen()
  }

  const handleCloseModal = () => {
    setSelectedExpense(null)
    onClose()
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (expense: ExpenseData) => deletedExpense(expense),
    onSuccess: () => {
      clearFilter()
      handleCloseModal()
    }
  })

  const handleDelete = () => {
    if (!selectedExpense) return
    mutate(selectedExpense)
  }

  return {
    isModalOpen: isOpen,
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
    confirmDeletion: handleDelete,
    isDeleting: isPending
  }
}
