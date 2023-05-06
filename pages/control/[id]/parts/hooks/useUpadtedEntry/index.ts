import { db } from "@/service/firebase";;
import { doc, updateDoc } from "@firebase/firestore";
import { useMutation } from '@tanstack/react-query';
import { useFetchEntrysData } from "../useFetchEntrysData";
import { toast } from "react-toastify";
import { UserData } from "@/hooks/useAuth/types";

const useUpadtedEntry = (id?: string) => {
  const { refetchEntrysData } = useFetchEntrysData();

  const fetchUpadtedExpense = async (data: {
    id?: string;
    data: Record<string, any>;
  }) => {
    const docRef = doc(db, "users", String(id), "entrys", data?.id || "")
    try {
      await updateDoc(docRef, data.data);
    } catch (error) {
      throw new Error("mensagem de erro")
    }
  };

  const { mutate: upadtedEntry } = useMutation(fetchUpadtedExpense, {
    onSuccess: () => {
      refetchEntrysData();
      toast.success("Sucesso ao editar entrada",);
    },
    onError: () => {
      toast.error("Erro ao editar entrada",);
    }
  });

  return {
    upadtedEntry,
  };
};

export default useUpadtedEntry;
