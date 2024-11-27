import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { updatedEntry } from '@/services/entrys/updatedEntry'
import { IEntrysData, useFetchEntrysData } from '../useFetchEntrysData'
import { useUserId } from '@/hooks/globalStates'

const useUpadtedEntry = () => {
  const { userId } = useUserId() as any
  const { refetchEntrysData } = useFetchEntrysData()

  const { mutateAsync: upadtedEntry } = useMutation({
    mutationFn: (data: IEntrysData) => updatedEntry(userId, data),
    onSuccess: () => {
      refetchEntrysData()
      toast.success('Sucesso ao editar entrada')
    },
    onError: () => {
      toast.error('Erro ao editar entrada')
    }
  })

  return {
    upadtedEntry
  }
}

export default useUpadtedEntry
