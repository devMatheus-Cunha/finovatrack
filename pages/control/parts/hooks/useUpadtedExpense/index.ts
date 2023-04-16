import { db } from "@/pages/lib/firebase";
import { doc, updateDoc } from "@firebase/firestore";
import { useMutation } from "react-query";
import { useFetchExpensesData } from "..";

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
      console.log();
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
