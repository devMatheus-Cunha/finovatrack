import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { clearExpenses } from '@/services/expenses/clearExpenses'
import { useFetchExpensesData } from '../useFetchExpensesData'
import { useUserId } from '@/hooks/globalStates'

const useClearExpenses = () => {
  const { userId } = useUserId() as any

  const { refetchExpensesData } = useFetchExpensesData()

  const { mutateAsync: clearExpensesData } = useMutation(
    () => clearExpenses(userId),
    {
      onSuccess: () => {
        refetchExpensesData()
        toast.success('Sucesso ao limpar gastos')
      },
      onError: () => {
        toast.error('Erro ao limpar gastos')
      }
    }
  )
  return {
    clearExpensesData
  }
}

export default useClearExpenses
