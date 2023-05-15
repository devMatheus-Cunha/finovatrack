/* eslint-disable no-useless-catch */

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { IReportData } from '@/service/reports/getReport';
import { saveReportService } from '@/service/reports/saveReport';
import { useParams } from 'next/navigation';

export default function useSaveReport() {
  const router = useParams();

  const {
    mutate: saveReport,
    isLoading: isLoadingSaveReport,
    status: statusSaveReport,
  } = useMutation(async (data: IReportData) => {
    await saveReportService(data, router.id);
  }, {
    onSuccess: () => {
      toast.success('Sucesso ao salvar relatório');
    },
    onError: () => {
      toast.error('Erro ao salvar relatório');
    },
  });

  return {
    saveReport,
    isLoadingSaveReport,
    statusSaveReport,
  };
}
