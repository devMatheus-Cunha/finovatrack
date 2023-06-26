'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useParams } from 'next/navigation'
import { deleteEntry } from '@/service/entrys/deleteEntry'
import useFetchEntrysData from '../useFetchEntrysData'

const useDeletedEntry = () => {
  const router = useParams()

  const { refetchEntrysData } = useFetchEntrysData()

  const { mutate: deletedEntry } = useMutation(
    async (itemId?: string) => deleteEntry(itemId, router.id),
    {
      onSuccess: () => {
        refetchEntrysData()
        toast.success('Sucesso ao deletar entrada')
      },
      onError: () => {
        toast.error('Erro ao deletar entrada')
      },
    },
  )

  return {
    deletedEntry,
  }
}

export default useDeletedEntry
