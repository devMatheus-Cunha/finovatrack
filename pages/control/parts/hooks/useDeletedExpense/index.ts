import { db } from "@/pages/lib/firebase";
import { deleteDoc, doc } from "@firebase/firestore";
import { useMutation }from '@tanstack/react-query';
import useFetchExpensesData from "../useFetchExpensesData";
import { Item } from "@/pages/control/types";
import { toast } from "react-toastify";

const useDeletedExpense = () => {
  const { refetchExpensesData } = useFetchExpensesData();

  const fetchDeletedExpense = async ({ data }: { data: Item }) => {
    const docRef = doc(db, "expenses", data.id || "");
    try {
      await deleteDoc(docRef);
    } catch (error) {
      throw new Error("mensagem de erro");
    }
  };

  const { mutate: deletedExpense } = useMutation(
    async ({ data }: { data: Item }) => fetchDeletedExpense({ data }),
    {
      onSuccess: () => {
        refetchExpensesData();
        toast.success("Sucesso ao Deletar Gasto", {
        position: toast.POSITION.TOP_RIGHT
      });
      },
      onError: () => {
         toast.error("Erro ao Deletar Gasto", {
        position: toast.POSITION.TOP_RIGHT
      });
      }
    }
  );

  return {
    deletedExpense,
  };
};

export default useDeletedExpense;
