import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { deleteExpense } from '@/services/expenses/deleteExpense'
import { ExpenseData } from '@/services/expenses/getExpenses'
import { useUserId } from '@/hooks/globalStates'
import { queryClient } from '@/app/providers'

const useDeletedExpense = () => {
  const { userId } = useUserId() as any

  const { mutateAsync: deletedExpense, isPending: isDeleting } = useMutation({
    mutationFn: async (data: ExpenseData) => deleteExpense(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expensesData'] })
      toast.success('Sucesso ao deletar gasto')
    },
    onError: () => {
      toast.error('Erro ao deletar gasto')
    }
  })

  return {
    deletedExpense,
    isDeleting
  }
}

export default useDeletedExpense
