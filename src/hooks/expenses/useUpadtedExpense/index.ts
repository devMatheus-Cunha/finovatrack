/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useParams } from 'next/navigation'
import { updatedExpenseService } from '@/service/expenses/updatedExpense'
import { useFetchExpensesData } from '../useFetchExpensesData'

const useUpadtedExpense = () => {
  const router = useParams()
  const { refetchExpensesData } = useFetchExpensesData()

  const { mutateAsync: upadtedExpense } = useMutation(
    async (data: Record<string, any>) =>
      await updatedExpenseService(data, router.id),
    {
      onSuccess: () => {
        refetchExpensesData()
        toast.success('Sucesso ao editar gasto')
      },
      onError: () => {
        toast.error('Erro ao editar gasto')
      },
    },
  )

  return {
    upadtedExpense,
  }
}

export default useUpadtedExpense
