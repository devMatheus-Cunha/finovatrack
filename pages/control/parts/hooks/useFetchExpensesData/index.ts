import { collection, getDocs, query, where } from "firebase/firestore";

import { useQuery }from '@tanstack/react-query';
import { db } from "@/pages/lib/firebase";

export interface IData {
  description: string;
  real_value: number;
  euro_value: number;
  type: string;
  typeMoney: string;
  id?: string;
}

export const useFetchExpensesData = (filter = "") => {
  const fetchExpensesData = async () => {
    const docsArray: IData[] = [];
    let querySnapshot;

    if (filter) {
      querySnapshot = query(
        collection(db, "expenses"),
        where("type", "==", filter)
      );
    } else {
      querySnapshot = collection(db, "expenses");
    }

    const get = await getDocs(querySnapshot);

    get.forEach((doc) => {
      docsArray.push({ id: doc.id, ...doc.data() } as any);
    });

    return docsArray;
  };

  const {
    data: expensesData,
    isLoading: isLoadingExpensesData,
    status: statusExpensesData,
    refetch: refetchExpensesData,
  } = useQuery(["expenses_data", filter], fetchExpensesData);

  return {
    expensesData,
    isLoadingExpensesData,
    statusExpensesData,
    refetchExpensesData,
  };
};

export default useFetchExpensesData;
