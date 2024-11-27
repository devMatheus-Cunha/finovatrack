'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { deleteEntry } from '@/services/entrys/deleteEntry'
import useFetchEntrysData from '../useFetchEntrysData'
import { useUserId } from '@/hooks/globalStates'

const useDeletedEntry = () => {
  const { userId } = useUserId() as any

  const { refetchEntrysData } = useFetchEntrysData()

  const { mutateAsync: deletedEntry } = useMutation({
    mutationFn: async (itemId?: string) => deleteEntry(itemId, userId),
    onSuccess: () => {
      refetchEntrysData()
      toast.success('Sucesso ao deletar entrada')
    },
    onError: () => {
      toast.error('Erro ao deletar entrada')
    }
  })

  return {
    deletedEntry
  }
}

export default useDeletedEntry
