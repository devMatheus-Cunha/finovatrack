import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { deleteExpense } from '@/service/expenses/deleteExpense';
import useFetchExpensesData, { ExpenseData } from '../useFetchExpensesData';

const useDeletedExpense = () => {
  const router = useParams();
  const { refetchExpensesData } = useFetchExpensesData();

  const { mutate: deletedExpense } = useMutation(
    async (data: ExpenseData) => deleteExpense(router.id, data),
    {
      onSuccess: () => {
        refetchExpensesData();
        toast.success('Sucesso ao deletar gasto');
      },
      onError: () => {
        toast.error('Erro ao deletar gasto');
      },
    },
  );

  return {
    deletedExpense,
  };
};

export default useDeletedExpense;
