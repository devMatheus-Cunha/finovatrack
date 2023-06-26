import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useParams } from 'next/navigation'
import {
  IAddEntryServiceProps,
  addEntryService,
} from '@/service/entrys/addEntry'
import { useFetchEntrysData } from '../useFetchEntrysData'

export default function useAddEntrys() {
  const router = useParams()
  const { refetchEntrysData } = useFetchEntrysData()

  const {
    mutate: addEntry,
    isLoading: isLoadingAddEntrys,
    status: statusAddEntrys,
  } = useMutation(
    (values: IAddEntryServiceProps) => addEntryService(values, router.id),
    {
      onSuccess: () => {
        refetchEntrysData()
        toast.success('Sucesso ao adicionar entrada')
      },
      onError: () => {
        toast.error('Erro ao adicionar entrada')
      },
    },
  )

  return { addEntry, isLoadingAddEntrys, statusAddEntrys }
}
