import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { deleteExpense } from '@/services/expenses/deleteExpense'
import useFetchExpensesData from '../useFetchExpensesData'
import { ExpenseData } from '@/services/expenses/getExpenses'
import { useUserId } from '@/hooks/globalStates'

const useDeletedExpense = () => {
  const { userId } = useUserId() as any
  const { refetchExpensesData } = useFetchExpensesData()

  const { mutateAsync: deletedExpense } = useMutation({
    mutationFn: async (data: ExpenseData) => deleteExpense(userId, data),
    onSuccess: () => {
      refetchExpensesData()
      toast.success('Sucesso ao deletar gasto')
    },
    onError: () => {
      toast.error('Erro ao deletar gasto')
    }
  })

  return {
    deletedExpense
  }
}

export default useDeletedExpense
