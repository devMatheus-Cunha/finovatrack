import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useParams } from 'next/navigation'
import { updatedExpenseService } from '@/services/expenses/updatedExpense'
import { useFetchExpensesData } from '../useFetchExpensesData'
import { ExpenseData } from '@/services/expenses/getExpenses'

const useUpadtedExpense = () => {
  const router = useParams<any>()
  const { refetchExpensesData } = useFetchExpensesData()

  const { mutateAsync: upadtedExpense } = useMutation(
    async (data: ExpenseData) => await updatedExpenseService(data, router.id),
    {
      onSuccess: () => {
        refetchExpensesData()
        toast.success('Sucesso ao editar gasto')
      },
      onError: () => {
        toast.error('Erro ao editar gasto')
      }
    }
  )

  return {
    upadtedExpense
  }
}

export default useUpadtedExpense
