import { collection, addDoc } from "firebase/firestore";

import { useMutation } from '@tanstack/react-query';
import { db } from "@/pages/lib/firebase";
import { useFetchEntrysData } from "../useFetchEntrysData";
import { toast } from "react-toastify";
import { useUser } from "@/hooks/useUserData";

interface IData {
  value: number;
}

const useAddEntrys = () => {
  const { refetchEntrysData } = useFetchEntrysData();
  const { data: authData } = useUser();
  
  const addDocument = async (data: IData) => {
    try {
      const myCollection = collection(db, "users", authData?.id || "" , "entrys");
      const docRef = await addDoc(myCollection, data);
      return docRef;
    } catch (error) {
      throw new Error("mensagem de erro");
    }
  };

  const {
    mutate: addEntrys,
    isLoading: isLoadingAddEntrys,
    status: statusAddEntrys,
  } = useMutation(addDocument, {
    onSuccess: () => {
      refetchEntrysData();
      toast.success("Sucesso ao adicionar entrada", {
        position: toast.POSITION.TOP_RIGHT
      });
    },
    onError: () => {
       toast.error("Erro ao adicionar entrada", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  });

  return { addEntrys, isLoadingAddEntrys, statusAddEntrys };
};

export default useAddEntrys;
