import { collection, getDocs, query, where } from "firebase/firestore";

import { useQuery }from '@tanstack/react-query';
import { db } from "@/pages/lib/firebase";
import { useState } from "react";
import { useUser } from "@/hooks/useUserData";

export interface ExpenseData {
 id: string;
 type: "Essencial" | "Não essencial" | "Gasto Livre";
 description: string;
 value: string;
 euro_value: number;
 real_value: number;
 typeMoney: "Real" | "Euro";
}

export type Filter = "Essencial" | "Não essencial" | "Gasto Livre" | ""

export const useFetchExpensesData = () => {
  const [filter, setFilter] = useState<Filter>("")
  const { data: authData } = useUser();

  const fetchExpensesData = async (value: string) => {
    const docsArray: ExpenseData[] = [];
    let querySnapshot;

    if (value) {
      querySnapshot = query(
        collection(db, "users", authData?.id || "" , "expenses"),
        where("type", "==", value)
      );
    } else {
      querySnapshot = collection(db, "users", authData?.id || "" , "expenses");
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
    queryFn: () => fetchExpensesData(filter),
    keepPreviousData: true,
    enabled: !!authData?.id,
  });

  return {
    expensesData,
    isLoadingExpensesData,
    statusExpensesData,
    refetchExpensesData,
    setFilter,
    filter,
  };
};

export default useFetchExpensesData;
