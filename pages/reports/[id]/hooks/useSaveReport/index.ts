import { collection, addDoc, getDocs, query, updateDoc, where } from "firebase/firestore";

import { useMutation } from '@tanstack/react-query';
import { db } from "@/service/firebase";;
import { toast } from "react-toastify";
import { ExpenseData } from "@/pages/control/[id]/hooks/useFetchExpensesData";


export interface IReportData {
  data: ExpenseData[]
  totalInvested: string,
  totalEntrys: string,
  totalExpenses: string
  period?: string
  quatation: string
}

const useSaveReport = (id?: string) => {
  const saveReportData = async ({ data, ...rest }: IReportData) => {
    try {
      const today = new Date();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = String(today.getFullYear());
      const format = `${month}/${year}`;

      const myCollection = collection(db, "users", String(id), "reports")
      const querySnapshot = await getDocs(query(myCollection, where("period", "==", format)));

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, { data: data, period: format, ...rest });
        return docRef;
      }

      const docRef = await addDoc(myCollection, { data: data, period: format, ...rest });
      return docRef;
    } catch (error) {
      throw error;
    }
  };

  const {
    mutate: saveReport,
    isLoading: isLoadingSaveReport,
    status: statusSaveReport,
  } = useMutation(async ({ data, ...rest }: IReportData) => {
    await saveReportData({ data, ...rest })
  }, {
    onSuccess: () => {
      toast.success("Sucesso ao salvar relatório",);
    },
    onError: () => {
      toast.error("Erro ao salvar relatório",);
    }
  });

  return { saveReport, isLoadingSaveReport, statusSaveReport };
};

export default useSaveReport;
