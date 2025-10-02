'use client'
import React from 'react'
import { Modal } from '@/components/common/Modal'
import { useDeleteExpenseModal } from '../model/useDeleteExpenseModal'
import DeleteExpenseContent from './DeleteExpenseContent'
import { ExpenseData } from '@/entities/expense/model/types'

interface DeleteExpenseProps {
  expense: ExpenseData
  children: React.ReactNode
}

export const DeleteExpense = ({ expense, children }: DeleteExpenseProps) => {
  const { isModalOpen, openModal, closeModal, confirmDeletion } =
    useDeleteExpenseModal()
  return (
    <>
      <div onClick={() => openModal(expense)} style={{ cursor: 'pointer' }}>
        {children}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} isCentered size="md">
        <DeleteExpenseContent
          onCancel={closeModal}
          onSubmit={confirmDeletion}
        />
      </Modal>
    </>
  )
}
