import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useParams } from 'next/navigation'
import { updatedEntry } from '@/services/entrys/updatedEntry'
import { IEntrysData, useFetchEntrysData } from '../useFetchEntrysData'

const useUpadtedEntry = () => {
  const router = useParams()
  const { refetchEntrysData } = useFetchEntrysData()

  const { mutateAsync: upadtedEntry } = useMutation(
    (data: IEntrysData) => updatedEntry(router.id, data),
    {
      onSuccess: () => {
        refetchEntrysData()
        toast.success('Sucesso ao editar entrada')
      },
      onError: () => {
        toast.error('Erro ao editar entrada')
      }
    }
  )

  return {
    upadtedEntry
  }
}

export default useUpadtedEntry
