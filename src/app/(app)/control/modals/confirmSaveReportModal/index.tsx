'use client'

import React, { useState } from 'react'

import { FolderPlus } from '@phosphor-icons/react'
import { Button } from '@/components'
import DatePicker from 'react-datepicker'
import { ExpenseData } from '@/services/expenses/getExpenses'
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay
} from '@chakra-ui/react'

interface IConfirmSaveReportModal {
  onSubmit: (data: any) => void
  onCancel: any
  initialData: ExpenseData[]
}

function ConfirmSaveReportModal({
  onSubmit,
  onCancel,
  initialData
}: IConfirmSaveReportModal) {
  const [selectedPeriod, setSelectedPeriod] = useState(new Date())
  function onChangeDate(date: Date) {
    setSelectedPeriod(date)
  }

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalBody
          textAlign="center"
          display="flex"
          flexDir="column"
          alignItems="center"
          gap={4}
        >
          <FolderPlus size={52} color="#eee2e2" />
          <h3 className="mb-2 text-lg font-normal text-gray-400">
            Essa ação irá salvar todos os dados abaixo como fechamento do mês
            atual. Caso já exista um relatório salvo para este mês, ele será
            substituído por este.
          </h3>
          <div>
            <label
              htmlFor="selectedPeriod"
              className="block mb-2 text-md font-medium text-white"
            >
              Selecione um período para salvar:
            </label>
            <DatePicker
              selected={selectedPeriod}
              onChange={(date: Date) => onChangeDate(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              className="mb-5 border text-sm rounded-lg w-full p-2.5 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </ModalBody>

        <ModalFooter display="flex" alignItems="center" gap={3}>
          <Button
            onClick={onCancel}
            data-modal-hide="popup-modal"
            type="button"
            variant="cancel"
          >
            Cancelar
          </Button>
          <Button
            data-modal-hide="popup-modal"
            type="submit"
            variant="confirm"
            onClick={() => {
              const formattedDate = new Date(selectedPeriod).toLocaleDateString(
                'pt-BR',
                {
                  month: '2-digit',
                  year: 'numeric'
                }
              )
              onSubmit({
                data: initialData,
                period: formattedDate
              })
            }}
          >
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  )
}

export default ConfirmSaveReportModal