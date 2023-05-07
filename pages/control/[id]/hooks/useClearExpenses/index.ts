import { db } from "@/service/firebase";;
import { getDocs, collection, deleteDoc } from "@firebase/firestore";
import { useFetchExpensesData } from "../useFetchExpensesData";
import { useMutation } from '@tanstack/react-query';
import { toast } from "react-toastify";

const useClearExpenses = (id?: string) => {
  const { refetchExpensesData } = useFetchExpensesData(id);

  const clearExpenses = async () => {
    const querySnapshot = await getDocs(collection(db, "users", String(id), "expenses"));
    const documents = querySnapshot.docs;

    const promises: any[] = [];
    documents.forEach((doc) => {
      promises.push(deleteDoc(doc.ref));
    });

    await Promise.all(promises);
  };

  const { mutate: clearExpensesData } = useMutation(clearExpenses, {
    onSuccess: () => {
      refetchExpensesData();
      toast.success("Sucesso ao limpar gastos",);
    },
    onError: () => {
      toast.error("Erro ao limpar gastos",);
    }
  });
  return {
    clearExpensesData,
  };
};

export default useClearExpenses;
