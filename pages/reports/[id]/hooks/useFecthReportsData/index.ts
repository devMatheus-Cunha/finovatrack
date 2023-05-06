import { collection, getDocs, query, where } from "firebase/firestore";

import { useQuery } from '@tanstack/react-query';
import { db } from "@/service/firebase";;
import { useState } from "react";
import { IReportData } from "../useSaveReport";

export const useFecthReportsData = (id?:string) => {

 const [selectedPeriod, setSelectedPeriod] = useState(new Date())
 const [period, setPeriod] = useState('')

  const fetchExpensesData = async (value: string) => {
    const docsArray: IReportData[] = [];
    let querySnapshot;

    if (value) {
      querySnapshot = query(
        collection(db, "users", String(id) , "reports"),
        where("period", "==", value)
      );
     const get = await getDocs(querySnapshot);
     get.forEach((doc) => {
       docsArray.push({ id: doc.id, ...doc.data() } as any);
     });
     return docsArray;
    } 
     return []
  };

  const {
    data: reportData,
    isLoading: isLoadingReportData,
    status: statusReportData,
    refetch: refetchReportData,
  } = useQuery({
    queryKey: ["report_data", period],
    queryFn: () => fetchExpensesData(period),
    keepPreviousData: true,
    enabled: !!period,
  });

  return {
    reportData,
    isLoadingReportData,
    statusReportData,
    refetchReportData,
    selectedPeriod,
   setSelectedPeriod,
    setPeriod,
  };
};

export default useFecthReportsData;
