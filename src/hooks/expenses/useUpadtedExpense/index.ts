import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { updatedExpenseService } from '@/services/expenses/updatedExpense'
import { useFetchExpensesData } from '../useFetchExpensesData'
import { ExpenseData } from '@/services/expenses/getExpenses'
import { useUserId } from '@/hooks/globalStates'

const useUpadtedExpense = () => {
  const { userId } = useUserId() as any
  const { refetchExpensesData } = useFetchExpensesData()

  const { mutateAsync: upadtedExpense } = useMutation({
    mutationFn: async (data: ExpenseData) =>
      await updatedExpenseService(data, userId),
    onSuccess: () => {
      refetchExpensesData()
      toast.success('Sucesso ao editar gasto')
    },
    onError: () => {
      toast.error('Erro ao editar gasto')
    }
  })

  return {
    upadtedExpense
  }
}

export default useUpadtedExpense
