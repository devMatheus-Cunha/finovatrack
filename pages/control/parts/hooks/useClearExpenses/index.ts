import { db } from "@/pages/lib/firebase";
import { getDocs, collection, deleteDoc } from "@firebase/firestore";
import React from "react";
import { useFetchExpensesData } from "..";
import { useMutation } from "react-query";

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
    },
  });
  return {
    clearExpensesData,
  };
};

export default useClearExpenses;
