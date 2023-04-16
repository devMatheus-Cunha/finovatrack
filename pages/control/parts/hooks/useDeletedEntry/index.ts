import { db } from "@/pages/lib/firebase";
import { deleteDoc, doc } from "@firebase/firestore";
import { useMutation } from "react-query";
import useFetchEntrysData from "../useFetchEntrysData";

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
      },
    }
  );

  return {
    deletedEntry,
  };
};

export default useDeletedEntry;
