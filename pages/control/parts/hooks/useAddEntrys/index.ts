import React from "react";
import { collection, addDoc } from "firebase/firestore";

import { useMutation } from "react-query";
import { db } from "@/pages/lib/firebase";
import { useFetchEntrysData } from "..";

interface IData {
  value: number;
}

const useAddEntrys = () => {
  const { refetchEntrysData } = useFetchEntrysData();
  const addDocument = async (data: IData) => {
    try {
      const myCollection = collection(db, "entrys");
      const docRef = await addDoc(myCollection, data);
      return docRef;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    mutate: addEntrys,
    isLoading: isLoadingAddEntrys,
    status: statusAddEntrys,
  } = useMutation(addDocument, {
    onSuccess: () => {
      refetchEntrysData();
    },
  });

  return { addEntrys, isLoadingAddEntrys, statusAddEntrys };
};

export default useAddEntrys;
