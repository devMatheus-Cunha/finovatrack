import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { addExpenseService } from '@/services/expenses/addExpense'
import { useFetchExpensesData } from '../useFetchExpensesData'
import { ExpenseData } from '@/services/expenses/getExpenses'
import { useUserId } from '@/hooks/globalStates'

const useAddExpense = () => {
  const { userId } = useUserId() as any

  const { refetchExpensesData } = useFetchExpensesData()

  const {
    mutateAsync: addExpense,
    isPending: isLoadingAddExpense,
    status: statusAddExpense
  } = useMutation({
    mutationFn: (values: ExpenseData) => addExpenseService(values, userId),
    onSuccess: () => {
      refetchExpensesData()
      toast.success('Sucesso ao adicionar gasto')
    },
    onError: () => {
      toast.error('Erro ao adicionar gasto')
    }
  })

  return { addExpense, isLoadingAddExpense, statusAddExpense }
}

export default useAddExpense
