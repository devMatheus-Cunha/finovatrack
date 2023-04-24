import { db } from "@/pages/lib/firebase";
import { doc, updateDoc } from "@firebase/firestore";
import { useMutation }from '@tanstack/react-query';
import { useFetchEntrysData } from "../useFetchEntrysData";
interface IData {
  value: number;
  id?: string;
}
const useUpadtedEntry = () => {
  const { refetchEntrysData } = useFetchEntrysData();

  const fetchUpadtedExpense = async ({
    id,
    data,
  }: {
    id?: string;
    data: Record<string, any>;
  }) => {
    const docRef = doc(db, "entrys", id || "");
    try {
      await updateDoc(docRef, data);
    } catch (error) {
      throw new Error("mensagem de erro");
    }
  };

  const { mutate: upadtedEntry } = useMutation(fetchUpadtedExpense, {
    onSuccess: () => {
      refetchEntrysData();
    },
  });

  return {
    upadtedEntry,
  };
};

export default useUpadtedEntry;
