import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useParams } from 'next/navigation'
import { deleteExpense } from '@/services/expenses/deleteExpense'
import useFetchExpensesData from '../useFetchExpensesData'
import { ExpenseData } from '@/services/expenses/getExpenses'

const useDeletedExpense = () => {
  const router = useParams()
  const { refetchExpensesData } = useFetchExpensesData()

  const { mutateAsync: deletedExpense } = useMutation(
    async (data: ExpenseData) => deleteExpense(router.id, data),
    {
      onSuccess: () => {
        refetchExpensesData()
        toast.success('Sucesso ao deletar gasto')
      },
      onError: () => {
        toast.error('Erro ao deletar gasto')
      }
    }
  )

  return {
    deletedExpense
  }
}

export default useDeletedExpense
