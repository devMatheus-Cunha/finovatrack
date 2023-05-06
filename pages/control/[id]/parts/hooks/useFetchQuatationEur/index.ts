import { UserData } from "@/hooks/useAuth/types";
import { db } from "@/service/firebase";;
import { doc, getDoc, setDoc, updateDoc } from "@firebase/firestore";
import { useMutation, useQuery } from '@tanstack/react-query';
import React from "react";
import { toast } from "react-toastify";

type CurrentQuotation = {
  current_quotation: number;
  date: string;
  result_calculation: number;
  status: boolean;
};

export const convertEurosToReais = (quatationEur?: number, valueEur?: number) => {
  if (!quatationEur || !valueEur) return 0
  const tax = 2.11 / 100;
  const valorEmReais = valueEur * quatationEur;
  const valorTotalComTaxa = valorEmReais + valueEur * quatationEur * tax;
  return valorTotalComTaxa ?? 0;
};

const useFetchQuatationEur = (amount: string, id?: string) => {
  const toastId: any = React.useRef(null);

  const updateQuotationData = async (data: Record<string, any>) => {
    try {
      if (!id) {
        throw new Error("User not logged in");
      }

      const docRef = doc(db, "users", id, "quotation", "last_quotation_data");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, data);
        return "Document updated successfully";
      } else {
        await setDoc(docRef, data, { merge: true });
        return "Document created successfully";
      }
    } catch (error) {
      throw error;
    }
  };

  const fetchQuatationRateFromAPI = async (value: string) => {
    const myHeaders = new Headers();
    myHeaders.append("apikey", process.env.NEXT_PUBLIC_API_KEY_EXCHANGE || "")

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
      throw new Error("Network response was not ok")
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
    const docRef = doc(db, "users", String(id), "quotation", "last_quotation_data")
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data as CurrentQuotation;
    } else {
      return undefined;
    }
  };

  const { data: lastQuatationData, refetch: refetchLastQuotationData } =
    useQuery(["last_quotation_data"], async () => await fetchLastQuotationData(), { enabled: !!id, });

  const { mutate: addLastQuotation } = useMutation(updateQuotationData, {
    onSuccess: async () => await refetchLastQuotationData(),
  });

  const { refetch: refetchQuationData } = useQuery({
    queryKey: ["quatation_data"],
    queryFn: () => fetchQuatationRateFromAPI(amount),
    enabled: false,
    cacheTime: 0,
    onSuccess: (res) => {
      addLastQuotation(res);
      toast.update(toastId.current, {
        type: 'success',
        render: 'Sucesso ao atualizar cotação',
        className: 'rotateY animated',
        autoClose: 5000,
      })
      toastId.current = null;
    },
    onError: () => {
      toast.update(toastId.current, {
        type: 'error',
        render: 'Erro ao atualizar cotação',
        autoClose: 5000,
      });
      toastId.current = null;
    },
  });
  return { lastQuatationData, refetchQuationData };
};

export default useFetchQuatationEur;
