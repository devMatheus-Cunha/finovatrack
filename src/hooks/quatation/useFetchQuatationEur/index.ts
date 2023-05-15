/* eslint-disable no-return-await */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {
  QueryObserverResult, RefetchOptions, RefetchQueryFilters, useMutation, useQuery,
} from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { getQuatationRateFromAPI } from '@/service/quatation/getQuatationRateFromAPI';
import { updateQuotationData } from '@/service/quatation/updateQuotationData';
import { getLastQuotationData } from '@/service/quatation/getLastQuotationData';

export type RefetchQuationDataType = <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<{
  result_calculation: number;
  current_quotation: any;
  date: any;
  status: any;
}, unknown>>

const useFetchQuatationEur = (amount: number) => {
  const router = useParams();
  const toastId: any = React.useRef(null);

  const { data: lastQuatationData, refetch: refetchLastQuotationData } = useQuery(
    ['last_quotation_data', router.id],
    async () => await getLastQuotationData(router.id),
    { enabled: !!router.id },
  );

  const { mutate: addLastQuotation } = useMutation(
    (data: Record<string, any>) => updateQuotationData(router.id, data),
    {
      onSuccess: async () => await refetchLastQuotationData(),
    },
  );

  const { refetch: refetchQuationData } = useQuery({
    queryKey: ['quatation_data'],
    queryFn: async () => {
      if (toastId.current === null) {
        toastId.current = toast('Atualizando Cotação...', { autoClose: false });
      }
      return await getQuatationRateFromAPI(amount === 0 ? 1 : amount);
    },
    enabled: false,
    cacheTime: 0,
    onSuccess: (res) => {
      addLastQuotation(res);
      toast.update(toastId.current, {
        type: 'success',
        render: 'Sucesso ao atualizar cotação',
        className: 'rotateY animated',
        autoClose: 5000,
      });
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
