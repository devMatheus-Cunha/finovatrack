import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useParams } from 'next/navigation'
import {
  IAddExpenseData,
  addExpenseService,
} from '@/service/expenses/addExpense'
import { useFetchExpensesData } from '../useFetchExpensesData'

export type ExpenseFormData = {
  id?: string
  description: string
  primary_currency: number
  secondary_currency: number
  value: string
  type: 'Essencial' | 'Não essencial' | 'Gasto Livre' | ''
  typeMoney?: string
}

const useAddExpense = () => {
  const router = useParams()

  const { refetchExpensesData } = useFetchExpensesData()

  const {
    mutateAsync: addExpense,
    isLoading: isLoadingAddExpense,
    status: statusAddExpense,
  } = useMutation(
    (values: IAddExpenseData) => addExpenseService(values, router.id),
    {
      onSuccess: () => {
        refetchExpensesData()
        toast.success('Sucesso ao adicionar gasto')
      },
      onError: () => {
        toast.error('Erro ao adicionar gasto')
      },
    },
  )

  return { addExpense, isLoadingAddExpense, statusAddExpense }
}

export default useAddExpense
