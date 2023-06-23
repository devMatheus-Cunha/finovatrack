/* eslint-disable max-len */

'use client'

import React from 'react'

import { FolderPlus } from '@phosphor-icons/react'
import { ExpenseData } from '@/hooks/expenses/useFetchExpensesData'
import { Button } from '@/components'

interface IConfirmSaveReportModal {
  onSubmit: (data: ExpenseData[]) => void
  onCancel: () => void
  initialData: ExpenseData[]
}

function ConfirmSaveReportModal({
  onSubmit,
  onCancel,
  initialData,
}: IConfirmSaveReportModal) {
  return (
    <div className="relative rounded-lg shadow bg-gray-800">
      <div className="p-5 gap-3 text-center flex flex-col justify-center items-center">
        <FolderPlus size={52} color="#eee2e2" />
        <h3 className="mb-5 text-lg font-normal text-gray-400">
          Essa ação irá salvar todos os dados abaixo como fechamento do mês
          atual. Caso já exista um relatório salvo para este mês, ele será
          substituído por este.
        </h3>
        <div className="flex gap-3">
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
            onClick={() => onSubmit(initialData)}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmSaveReportModal
