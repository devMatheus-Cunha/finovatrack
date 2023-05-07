import { db } from "@/service/firebase";;
import { deleteDoc, doc } from "@firebase/firestore";
import { useMutation } from '@tanstack/react-query';
import useFetchExpensesData, { ExpenseData } from "../useFetchExpensesData";
import { toast } from "react-toastify";

const useDeletedExpense = (id?: string) => {
  const { refetchExpensesData } = useFetchExpensesData(id);

  const fetchDeletedExpense = async (data: ExpenseData) => {
    const docRef = doc(db, "users", String(id), "expenses", data?.id || "")
    try {
      await deleteDoc(docRef);
    } catch (error) {
      throw new Error("mensagem de erro")
    }
  };

  const { mutate: deletedExpense } = useMutation(
    async (data: ExpenseData) => fetchDeletedExpense(data),
    {
      onSuccess: () => {
        refetchExpensesData();
        toast.success("Sucesso ao deletar gasto",);
      },
      onError: () => {
        toast.error("Erro ao deletar gasto",);
      }
    }
  );

  return {
    deletedExpense,
  };
};

export default useDeletedExpense;
