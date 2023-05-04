import { db } from "@/pages/lib/firebase";
import { doc, updateDoc } from "@firebase/firestore";
import { useMutation }from '@tanstack/react-query';
import { useFetchEntrysData } from "../useFetchEntrysData";
import { toast } from "react-toastify";
import { useUser } from "@/hooks/useUserData";
interface IData {
  value: number;
  id?: string;
}
const useUpadtedEntry = () => {
  const { refetchEntrysData } = useFetchEntrysData();
  const { data: authData } = useUser();
  
  const fetchUpadtedExpense = async ({
    id,
    data,
  }: {
    id?: string;
    data: Record<string, any>;
  }) => {
    const docRef = doc(db, "users", authData?.id || "" , "entrys", id || "");
    try {
      await updateDoc(docRef, data);
    } catch (error) {
      throw new Error("mensagem de erro");
    }
  };

  const { mutate: upadtedEntry } = useMutation(fetchUpadtedExpense, {
    onSuccess: () => {
      refetchEntrysData();
        toast.success("Sucesso ao editar entrada", {
        position: toast.POSITION.TOP_RIGHT
      });
    },
    onError: () => {
       toast.error("Erro ao editar entrada", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  });

  return {
    upadtedEntry,
  };
};

export default useUpadtedEntry;
