import { db } from "@/pages/lib/firebase";
import { getDocs, collection, deleteDoc } from "@firebase/firestore";
import { useFetchExpensesData } from "../useFetchExpensesData";
import { useMutation }from '@tanstack/react-query';
import { toast } from "react-toastify";

const useClearExpenses = () => {
  const { refetchExpensesData } = useFetchExpensesData();

  const clearExpenses = async () => {
    const querySnapshot = await getDocs(collection(db, "expenses"));
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
       toast.success("Sucesso ao Limpar Dados", {
        position: toast.POSITION.TOP_RIGHT
      });
    },
    onError: () => {
      toast.error("Erro ao Limpar Dados", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  });
  return {
    clearExpensesData,
  };
};

export default useClearExpenses;
