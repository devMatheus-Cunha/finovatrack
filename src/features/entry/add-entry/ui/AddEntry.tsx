'use client'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import { Modal } from '@/components/common/Modal'
import { Button } from '@/components'
import { useAddEntryModal } from '../model/useAddEntryModal'
import { AddEntryForm } from './AddEntryForm'
import { HandCoins } from '@phosphor-icons/react'

export const AddEntry = () => {
  const { isModalOpen, openModal, closeModal, form, onSubmit, isLoading } =
    useAddEntryModal()
  return (
    <>
      <Button
        leftIcon={<HandCoins size={20} color="white" />}
        onClick={openModal}
      >
        Adicionar Entrada
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        isCentered
        size="xl"
        title="Adicione uma Entrada"
      >
        <FormProvider {...form}>
          <AddEntryForm
            onSubmit={onSubmit}
            onCancel={closeModal}
            isLoading={isLoading}
          />
        </FormProvider>
      </Modal>
    </>
  )
}
