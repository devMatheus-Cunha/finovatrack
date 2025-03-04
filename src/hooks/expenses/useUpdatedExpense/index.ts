import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { updatedExpenseService } from '@/services/expenses/updatedExpense'
import { useFetchExpensesData } from '../useFetchExpensesData'
import { ExpenseData } from '@/services/expenses/getExpenses'
import { useUserId } from '@/hooks/globalStates'

const useUpdatedExpense = () => {
  const { userId } = useUserId() as any
  const { refetchExpensesData } = useFetchExpensesData()

  const { mutateAsync: updatedExpense } = useMutation({
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
    updatedExpense
  }
}

export default useUpdatedExpense
