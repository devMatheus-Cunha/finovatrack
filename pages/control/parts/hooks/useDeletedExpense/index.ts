import { db } from "@/pages/lib/firebase";
import { deleteDoc, doc } from "@firebase/firestore";
import { useMutation } from "react-query";
import useFetchExpensesData from "../useFetchExpensesData";
import { Item } from "@/pages/control/types";

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
      },
    }
  );

  return {
    deletedExpense,
  };
};

export default useDeletedExpense;
