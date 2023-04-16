import { db } from "@/pages/lib/firebase";
import { doc, updateDoc } from "@firebase/firestore";
import { useMutation } from "react-query";
import { useFetchExpensesData } from "../useFetchExpensesData";

interface IData {
  description: string;
  real_value: number;
  euro_value: number;
  type: string;
  typeMoney: string;
}
const useUpadtedExpense = () => {
  const { refetchExpensesData } = useFetchExpensesData();

  const fetchUpadtedExpense = async ({
    id,
    data,
  }: {
    id?: string;
    data: Record<string, any>;
  }) => {
    const docRef = doc(db, "expenses", id || "");
    try {
      await updateDoc(docRef, data);
    } catch (error) {
      throw new Error("mensagem de erro");
    }
  };

  const { mutate: upadtedExpense } = useMutation(fetchUpadtedExpense, {
    onSuccess: () => {
      refetchExpensesData();
    },
  });

  return {
    upadtedExpense,
  };
};

export default useUpadtedExpense;
