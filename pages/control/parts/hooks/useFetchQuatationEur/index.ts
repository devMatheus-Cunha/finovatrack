import { db } from "@/pages/lib/firebase";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { useMutation, useQuery }from '@tanstack/react-query';

type CurrentQuotation = {
  current_quotation: number;
  date: string;
  result_calculation: number;
  status: boolean;
};

export const convertEurosToReais = (quatationEur = 0, valueEur = 0) => {
  const tax = 2.11 / 100;
  const valorEmReais = valueEur * quatationEur;
  const valorTotalComTaxa = valorEmReais + valueEur * quatationEur * tax;
  return valorTotalComTaxa;
};

const useFetchQuatationEur = (amount: string) => {
  const upadtedQuotation = async (data: Record<string, any>) => {
    try {
      const myCollection = doc(db, "quotation", "last_quotation_data");
      const docRef = await updateDoc(myCollection, data);
      return docRef;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQuatationRateFromAPI = async () => {
    const myHeaders = new Headers();
    myHeaders.append("apikey", process.env.NEXT_PUBLIC_API_KEY_EXCHANGE || "");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const response = await fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=brl&from=eur&amount=${amount}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return {
      result_calculation: convertEurosToReais(data.info.rate, Number(amount)),
      current_quotation: data.info.rate,
      date: data?.date,
      status: data.success,
    };
  };

  const fetchLastQuotationData = async () => {
    const docRef = doc(db, "quotation", "last_quotation_data");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data as CurrentQuotation;
    } else {
      return null;
    }
  };

  const { data: lastQuatationData, refetch: refetchLastQuotationData } =
    useQuery(["last_quotation_data"], async () => await fetchLastQuotationData());

  const { mutate: addlastQuotation } = useMutation(upadtedQuotation, {
    onSuccess: async () => await refetchLastQuotationData(),
  });

  const { refetch: refetchQuationData } = useQuery({
    queryKey: ["quatation_data"],
    queryFn: fetchQuatationRateFromAPI,
    enabled: false,
    cacheTime: 0,
    onSuccess: (res) => {
      addlastQuotation(res);
    },
  });

  return { lastQuatationData, refetchQuationData };
};

export default useFetchQuatationEur;
