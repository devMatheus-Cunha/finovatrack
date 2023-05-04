import { collection, addDoc } from "firebase/firestore";

import { useMutation }from '@tanstack/react-query';
import { db } from "@/pages/lib/firebase";
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

const useAddExpense = () => {
  const { refetchExpensesData } = useFetchExpensesData();
  const { data: authData } = useUser();
  
  const addDocument = async (data: IData) => {
    try {
      const myCollection = collection(db, "users", authData?.id || "" , "expenses");
      const docRef = await addDoc(myCollection, data);
      return docRef;
    } catch (error) {
      throw new Error("mensagem de erro");
    }
  };

  const {
    mutate: addExpense,
    isLoading: isLoadingAddExpense,
    status: statusAddExpense,
  } = useMutation(addDocument, {
    onSuccess: () => {
      refetchExpensesData();
      toast.success("Sucesso ao adicionar gasto", {
        position: toast.POSITION.TOP_RIGHT
      });
    },
    onError: () => {
       toast.error("Erro ao adicionar gasto", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  });

  return { addExpense, isLoadingAddExpense, statusAddExpense };
};

export default useAddExpense;
