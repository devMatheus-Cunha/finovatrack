import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useParams } from 'next/navigation'
import { addExpenseService } from '@/services/expenses/addExpense'
import { useFetchExpensesData } from '../useFetchExpensesData'
import { ExpenseData } from '@/services/expenses/getExpenses'

const useAddExpense = () => {
  const router = useParams<any>()

  const { refetchExpensesData } = useFetchExpensesData()

  const {
    mutateAsync: addExpense,
    isLoading: isLoadingAddExpense,
    status: statusAddExpense
  } = useMutation(
    (values: ExpenseData) => addExpenseService(values, router.id),
    {
      onSuccess: () => {
        refetchExpensesData()
        toast.success('Sucesso ao adicionar gasto')
      },
      onError: () => {
        toast.error('Erro ao adicionar gasto')
      }
    }
  )

  return { addExpense, isLoadingAddExpense, statusAddExpense }
}

export default useAddExpense
