import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useParams } from 'next/navigation'
import { clearExpenses } from '@/services/expenses/clearExpenses'
import { useFetchExpensesData } from '../useFetchExpensesData'

const useClearExpenses = () => {
  const router = useParams<any>()

  const { refetchExpensesData } = useFetchExpensesData()

  const { mutateAsync: clearExpensesData } = useMutation(
    () => clearExpenses(router.id),
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
