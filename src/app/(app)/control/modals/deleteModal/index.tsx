import React from 'react'
import { WarningIcon } from '@chakra-ui/icons'

function DeleteModalContent({ onSubmit, onCancel }: any) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-auto flex flex-col items-center py-5">
      <div className="flex flex-col items-center">
        <WarningIcon className="text-gray-400 mb-4" style={{ fontSize: 56 }} />
        <p className="text-lg font-normal text-gray-400 mb-5">
          Você tem certeza que deseja deletar?
        </p>
      </div>
      <div className="flex gap-3 pt-0">
        <button
          onClick={onCancel}
          type="button"
          className="px-4 py-2 border border-gray-400 rounded text-gray-200 hover:bg-gray-700 focus:outline-none"
        >
          Cancelar
        </button>
        <button
          type="submit"
          onClick={onSubmit}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
        >
          Deletar
        </button>
      </div>
    </div>
  )
}

export default DeleteModalContent
