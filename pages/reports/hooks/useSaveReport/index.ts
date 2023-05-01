import { collection, addDoc, getDocs, query, updateDoc, where } from "firebase/firestore";

import { useMutation }from '@tanstack/react-query';
import { db } from "@/pages/lib/firebase";
import { toast } from "react-toastify";
import { ExpenseData } from "../useFecthReportsData";


export interface IReportData {
  data: ExpenseData[]
  totalInvested: string,
  totalEntrys: string,
  totalExpenses: string
  period?: string
  quatation: string
 }


const useSaveReport = () => {
const saveReportData = async ({data, ...rest}: IReportData) => {
   try {
      const today = new Date();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = String(today.getFullYear());
      const format = `${month}/${year}`;

      const myCollection = collection(db, "reports");
      const querySnapshot = await getDocs(query(myCollection, where("period", "==", format)));

      if (!querySnapshot.empty) {
         const docRef = querySnapshot.docs[0].ref;
         await updateDoc(docRef, { data: data, period: format, ...rest });
         return docRef;
      }

      const docRef = await addDoc(myCollection, {data: data, period: format, ...rest});
      return docRef;
    } catch (error) {
      throw error;
    }
};

  const {
    mutate: saveReport,
    isLoading: isLoadingSaveReport,
    status: statusSaveReport,
  } = useMutation(async ({data, ...rest}: IReportData) => {
    await saveReportData({data, ...rest})
  }, {
    onSuccess: () => {
      toast.success("Sucesso ao Salvar Relatorio", {
        position: toast.POSITION.TOP_RIGHT
      });
    },
    onError: () => {
       toast.error("Erro ao Salvar Relatorio", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  });

  return { saveReport, isLoadingSaveReport, statusSaveReport };
};

export default useSaveReport;
