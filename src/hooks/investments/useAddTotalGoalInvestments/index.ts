import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useParams } from 'next/navigation'
import { addTotalGoalInvestments } from '@/service/investments/addTotalGoalInvestments'
import useFetchInvestmentsAllGoals from '../useFetchInvestmentsTotalGoal'

const useAddTotalGoalInvestments = () => {
  const router = useParams()
  const { refetchInvestmentsAllGoalsData } = useFetchInvestmentsAllGoals()

  const {
    mutateAsync: addGoalinvestment,
    isLoading: isLoadingAddGoalinvestment,
    status: statusAddGoalinvestment,
  } = useMutation((values: any) => addTotalGoalInvestments(values, router.id), {
    onSuccess: () => {
      refetchInvestmentsAllGoalsData()
      toast.success('Sucesso ao adicionar Meta')
    },
    onError: () => {
      toast.error('Erro ao adicionar Meta')
    },
  })

  return {
    addGoalinvestment,
    isLoadingAddGoalinvestment,
    statusAddGoalinvestment,
  }
}

export default useAddTotalGoalInvestments
