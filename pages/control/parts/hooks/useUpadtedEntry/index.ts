import { db } from "@/pages/lib/firebase";
import { doc, updateDoc } from "@firebase/firestore";
import { useMutation } from "react-query";
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
      console.log();
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
