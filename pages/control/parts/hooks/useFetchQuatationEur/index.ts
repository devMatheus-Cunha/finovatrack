import { db } from "@/pages/lib/firebase";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { useMutation, useQuery }from '@tanstack/react-query';
import React from "react";
import { toast } from "react-toastify";

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
  const toastId: any = React.useRef(null);

  const upadtedQuotation = async (data: Record<string, any>) => {
    try {
      const myCollection = doc(db, "quotation", "last_quotation_data");
      const docRef = await updateDoc(myCollection, data);
      return docRef;
    } catch (error) {
      console.log(error);
    }
  };

const fetchQuatationRateFromAPI = async (value: string) => {
  const myHeaders = new Headers();
  myHeaders.append("apikey", process.env.NEXT_PUBLIC_API_KEY_EXCHANGE || "");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  if (toastId.current === null) {
    toastId.current = toast('Atualizando Cotação...', { autoClose: false });
  }

    const response = await fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=brl&from=eur&amount=${value}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return {
      result_calculation: convertEurosToReais(data.info.rate, Number(value)),
      current_quotation: data.info.rate,
      date: data?.date,
      status: data.success,
    }
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

  const { mutate: addLastQuotation } = useMutation(upadtedQuotation, {
    onSuccess: async () => await refetchLastQuotationData(),
  });

  const { refetch: refetchQuationData, fetchStatus } = useQuery({
    queryKey: ["quatation_data"],
    queryFn: () => fetchQuatationRateFromAPI(amount),
    enabled: false,
    cacheTime: 0,
    onSuccess: (res) => {
      addLastQuotation(res);
       toast.update(toastId.current, {
        type: 'success',
        render: 'Sucesso ao Atualizar Cotação',
        className: 'rotateY animated',
        autoClose: 5000,
       })
      toastId.current = null;
    },
    onError: () => {
      toast.update(toastId.current, {
        type: 'error',
        render: 'Erro ao Atualizar Cotação',
        autoClose: 5000,
      });
      toastId.current = null;
    },
  });
  return { lastQuatationData, refetchQuationData };
};

export default useFetchQuatationEur;
