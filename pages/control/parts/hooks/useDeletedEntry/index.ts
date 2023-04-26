import { db } from "@/pages/lib/firebase";
import { deleteDoc, doc } from "@firebase/firestore";
import { useMutation }from '@tanstack/react-query';
import useFetchEntrysData from "../useFetchEntrysData";
import { toast } from "react-toastify";

interface IData {
  value: number;
  id?: string;
}

const useDeletedEntry = () => {
  const { refetchEntrysData } = useFetchEntrysData();

  const fetchDeletedEntry = async ({ data }: { data: IData }) => {
    const docRef = doc(db, "entrys", data.id || "");
    try {
      await deleteDoc(docRef);
    } catch (error) {
      throw new Error("mensagem de erro");
    }
  };

  const { mutate: deletedEntry } = useMutation(
    async ({ data }: { data: IData }) => fetchDeletedEntry({ data }),
    {
      onSuccess: () => {
        refetchEntrysData();
        toast.success("Sucesso ao Deletar Entrada", {
        position: toast.POSITION.TOP_RIGHT
      });
    },
    onError: () => {
        toast.error("Erro ao Deletar Entrada", {
        position: toast.POSITION.TOP_RIGHT
      });
      }
    }
  );

  return {
    deletedEntry,
  };
};

export default useDeletedEntry;
