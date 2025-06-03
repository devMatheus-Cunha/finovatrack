'use client'

import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { ExpenseData } from '@/services/expenses/getExpenses'
import { FolderPlus } from '@phosphor-icons/react'
import Button from '@/components/common/Buttons/Button'
import 'react-datepicker/dist/react-datepicker.css'

interface ConfirmSaveReportModalProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  initialData: ExpenseData[]
}

function ConfirmSaveReportModal({
  onSubmit,
  onCancel,
  initialData
}: ConfirmSaveReportModalProps) {
  const [selectedPeriod, setSelectedPeriod] = useState(new Date())

  function onChangeDate(date: Date | null) {
    if (date) {
      setSelectedPeriod(date)
    }
  }

  const formattedDate = new Date(selectedPeriod).toLocaleDateString('pt-BR', {
    month: '2-digit',
    year: 'numeric'
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center">
        <div className="bg-gray-700/50 p-3 rounded-full mb-4">
          <FolderPlus size={48} className="text-blue-400" weight="duotone" />
        </div>
        <p className="text-base font-normal text-gray-300 text-center mb-2">
          Essa ação irá salvar todos os dados abaixo como fechamento do mês
          atual. Caso já exista um relatório salvo para este mês, ele será
          substituído por este.
        </p>
      </div>
      <div className="py-4 flex flex-col items-center w-full">
        <label
          htmlFor="selectedPeriod"
          className="block mb-3 text-white font-medium text-md"
        >
          Selecione um período para salvar:
        </label>
        <DatePicker
          id="selectedPeriod"
          selected={selectedPeriod}
          onChange={onChangeDate}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          className="px-4 py-2.5 bg-transparent text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors"
        />
      </div>
      <div className="px-0 py-6 flex justify-end gap-3">
        <Button variant="cancel" onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          variant="confirm"
          onClick={() => onSubmit({ data: initialData, period: formattedDate })}
        >
          Confirmar
        </Button>
      </div>
    </div>
  )
}

export default ConfirmSaveReportModal
