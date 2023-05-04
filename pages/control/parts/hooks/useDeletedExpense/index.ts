import { db } from "@/pages/lib/firebase";
import { deleteDoc, doc } from "@firebase/firestore";
import { useMutation }from '@tanstack/react-query';
import useFetchExpensesData from "../useFetchExpensesData";
import { Item } from "@/pages/control/types";
import { toast } from "react-toastify";
import { useUser } from "@/hooks/useUserData";

const useDeletedExpense = () => {
  const { refetchExpensesData } = useFetchExpensesData();
  const { data: authData } = useUser();

  const fetchDeletedExpense = async ({ data }: { data: Item }) => {
    const docRef = doc(db, "users", authData?.id || "" , "expenses", data.id || "");
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
        toast.success("Sucesso ao deletar gasto", {
        position: toast.POSITION.TOP_RIGHT
      });
      },
      onError: () => {
         toast.error("Erro ao deletar gasto", {
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
