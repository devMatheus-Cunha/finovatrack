import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { addExpenseService } from '@/service/expenses/addExpense';
import { useFetchExpensesData } from '../useFetchExpensesData';

export interface IAddExpenseData {
  id?: string;
  type: 'Essencial' | 'Não essencial' | 'Gasto Livre' | ''
  description: string;
  euro_value?: number;
  real_value?: number;
  typeMoney?: 'Real' | 'Euro' | ''
  value: string
}

export type ExpenseFormData = {
  id?: string;
  description: string;
  value: string;
  type: 'Essencial' | 'Não essencial' | 'Gasto Livre' | ''
  typeMoney?: 'Real' | 'Euro' | ''
};

const useAddExpense = () => {
  const router = useParams();

  const { refetchExpensesData } = useFetchExpensesData();

  const {
    mutate: addExpense,
    isLoading: isLoadingAddExpense,
    status: statusAddExpense,
  } = useMutation((values: IAddExpenseData) => addExpenseService(values, router.id), {
    onSuccess: () => {
      refetchExpensesData();
      toast.success('Sucesso ao adicionar gasto');
    },
    onError: () => {
      toast.error('Erro ao adicionar gasto');
    },
  });

  return { addExpense, isLoadingAddExpense, statusAddExpense };
};

export default useAddExpense;
