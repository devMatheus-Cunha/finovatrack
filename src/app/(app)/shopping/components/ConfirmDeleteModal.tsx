import React from 'react'

interface ConfirmDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  description?: string
  loading?: boolean
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmar exclusão',
  description = 'Tem certeza que deseja deletar este item? Esta ação não pode ser desfeita.',
  loading = false
}) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-100 p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-sm text-gray-100 relative flex flex-col items-center justify-center text-center">
        <h3 className="text-xl font-bold text-red-400 mb-2 w-full">{title}</h3>
        <p className="mb-6 text-gray-300 w-full">{description}</p>
        <div className="flex justify-center gap-2 w-full">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-150"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
            disabled={loading}
          >
            {loading ? 'Deletando...' : 'Deletar'}
          </button>
        </div>
      </div>
    </div>
  )
}
