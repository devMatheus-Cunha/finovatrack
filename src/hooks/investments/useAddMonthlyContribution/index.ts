import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useParams } from 'next/navigation'
import { addMonthlyContributionService } from '@/service/investments/addMonthlyContribution'
import useFetchMonthlycontribution from '../useFetchMonthlycontribution'

const useAddMonthlyContribution = () => {
  const router = useParams()
  const { refetchMonthlycontribution } = useFetchMonthlycontribution()

  const {
    mutateAsync: addMonthlyContribution,
    isLoading: isLoadingAddMonthlyContribution,
    status: statusAddMonthlyContribution,
  } = useMutation(
    (values: any) => addMonthlyContributionService(values, router.id),
    {
      onSuccess: () => {
        refetchMonthlycontribution()
        toast.success('Sucesso ao adicionar Aportes Mensais')
      },
      onError: () => {
        toast.error('Erro ao adicionar Aportes Mensais')
      },
    },
  )

  return {
    addMonthlyContribution,
    isLoadingAddMonthlyContribution,
    statusAddMonthlyContribution,
  }
}

export default useAddMonthlyContribution
