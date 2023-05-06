import { collection, getDocs } from "firebase/firestore";

import { useQuery, useQueryClient }from '@tanstack/react-query';
import { db } from "@/service/firebase";;

interface IData {
  value: number;
  id?: string;
}

export const useFetchEntrysData = (id?: string) => {
  const fetchEntrysData = async () => {
      const querySnapshot = await getDocs(collection(db, "users", String(id), "entrys"));
      const docsArray: IData[] = [];
      querySnapshot.forEach((doc) => {
        docsArray.push({ id: doc.id, ...doc.data() } as any);
      });
      return docsArray;
  };
  const {
    data: entrysData,
    isLoading: isLoadingEntrysData,
    status: statusEntrysData,
    refetch: refetchEntrysData,
  } = useQuery(["entrys_data"], async () => await fetchEntrysData(), {
     enabled:!!id,
  });

  return {
    entrysData,
    isLoadingEntrysData,
    statusEntrysData,
    refetchEntrysData,
  };
};

export default useFetchEntrysData;