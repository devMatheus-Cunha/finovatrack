import { collection, addDoc } from "firebase/firestore";

import { useMutation }from '@tanstack/react-query';
import { db } from "@/pages/lib/firebase";
import { useFetchExpensesData } from "../useFetchExpensesData";

interface IData {
  description: string;
  real_value: number;
  euro_value: number;
  type: string;
  typeMoney: string;
}

const useAddExpense = () => {
  const { refetchExpensesData } = useFetchExpensesData();

  const addDocument = async (data: IData) => {
    try {
      const myCollection = collection(db, "expenses");
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
    },
  });

  return { addExpense, isLoadingAddExpense, statusAddExpense };
};

export default useAddExpense;
