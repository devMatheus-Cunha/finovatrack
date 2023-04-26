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
  const fetchExpensesData = async (value: string) => {
    const docsArray: IData[] = [];
    let querySnapshot;

    if (value) {
      querySnapshot = query(
        collection(db, "expenses"),
        where("type", "==", value)
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
  } = useQuery({
    queryKey: ["expenses_data", filter],
    queryFn: ({queryKey}) => fetchExpensesData(queryKey[1])
  });

  return {
    expensesData,
    isLoadingExpensesData,
    statusExpensesData,
    refetchExpensesData,
  };
};

export default useFetchExpensesData;
