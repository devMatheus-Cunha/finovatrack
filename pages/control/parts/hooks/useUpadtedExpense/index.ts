import { db } from "@/pages/lib/firebase";
import { doc, updateDoc } from "@firebase/firestore";
import { useMutation }from '@tanstack/react-query';
import { useFetchExpensesData } from "../useFetchExpensesData";
import { toast } from "react-toastify";
import { useUser } from "@/hooks/useUserData";

interface IData {
  description: string;
  real_value: number;
  euro_value: number;
  type: string;
  typeMoney: string;
}
const useUpadtedExpense = () => {
  const { refetchExpensesData } = useFetchExpensesData();
  const { data: authData } = useUser();
  
  const fetchUpadtedExpense = async ({
    id,
    data,
  }: {
    id?: string;
    data: Record<string, any>;
  }) => {
    const docRef = doc(db,  "users", authData?.id || "" , "expenses", id || "");
    try {
      await updateDoc(docRef, data);
    } catch (error) {
      throw new Error("mensagem de erro");
    }
  };

  const { mutate: upadtedExpense } = useMutation(fetchUpadtedExpense, {
    onSuccess: () => {
      refetchExpensesData();
        toast.success("Sucesso ao editar gasto", {
        position: toast.POSITION.TOP_RIGHT
      });
    },
    onError: () => {
        toast.error("Erro ao editar gasto", {
        position: toast.POSITION.TOP_RIGHT
      });
      }
    }
  );

  return {
    upadtedExpense,
  };
};

export default useUpadtedExpense;
