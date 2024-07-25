import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import {
  IAddEntryServiceProps,
  addEntryService
} from '@/services/entrys/addEntry'
import { useFetchEntrysData } from '../useFetchEntrysData'
import { useUserId } from '@/hooks/globalStates'

export default function useAddEntrys() {
  const { userId } = useUserId() as any
  const { refetchEntrysData } = useFetchEntrysData()

  const {
    mutateAsync: addEntry,
    isLoading: isLoadingAddEntrys,
    status: statusAddEntrys
  } = useMutation(
    (values: IAddEntryServiceProps) => addEntryService(values, userId),
    {
      onSuccess: () => {
        refetchEntrysData()
        toast.success('Sucesso ao adicionar entrada')
      },
      onError: () => {
        toast.error('Erro ao adicionar entrada')
      }
    }
  )

  return { addEntry, isLoadingAddEntrys, statusAddEntrys }
}
