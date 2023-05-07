import { db } from "@/service/firebase";;
import { deleteDoc, doc } from "@firebase/firestore";
import { useMutation } from '@tanstack/react-query';
import useFetchEntrysData from "../useFetchEntrysData";
import { toast } from "react-toastify";

interface IData {
  value: number;
  id?: string;
}

const useDeletedEntry = (id?: string) => {
  const { refetchEntrysData } = useFetchEntrysData(id);

  const fetchDeletedEntry = async (data: { data: IData }) => {
    const docRef = doc(db, "users", String(id), "entrys", data.data.id || "")
    try {
      await deleteDoc(docRef);
    } catch (error) {
      throw new Error("mensagem de erro")
    }
  };

  const { mutate: deletedEntry } = useMutation(
    async ({ data }: { data: IData }) => fetchDeletedEntry({ data }),
    {
      onSuccess: () => {
        refetchEntrysData();
        toast.success("Sucesso ao deletar entrada",);
      },
      onError: () => {
        toast.error("Erro ao deletar entrada",);
      }
    }
  );

  return {
    deletedEntry,
  };
};

export default useDeletedEntry;