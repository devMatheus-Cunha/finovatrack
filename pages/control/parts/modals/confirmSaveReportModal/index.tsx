import React from 'react';
import { ExpenseData } from '../../hooks/useFetchExpensesData';
import { ArchiveBox, FolderPlus } from '@phosphor-icons/react';

interface IConfirmSaveReportModal {
 onSubmit: (data: ExpenseData[]) => void
 onCancel: () => void
 initialData: ExpenseData[]
}

const ConfirmSaveReportModal = ({ onSubmit, onCancel, initialData }: IConfirmSaveReportModal) => {
 return (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 z-50 w-1/4">
   <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
    <div className="p-5 gap-3 text-center flex flex-col justify-center items-center">
     <FolderPlus size={52} color="#eee2e2" />
     <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
      Essa ação irá salvar todos os dados abaixo como fechamento do mês atual. Caso já exista um relatório salvo para este mês, ele será substituído por este.
     </h3>
     <div className='flex gap-3'>
      <button
       onClick={onCancel}
       data-modal-hide="popup-modal"
       type="button"
       className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
      >
       Cancelar
      </button>
      <button
       data-modal-hide="popup-modal"
       type="submit"
       onClick={() => onSubmit(initialData)}
       className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5">
       Confirmar
      </button>
     </div>
    </div>
   </div>
  </div >
 );
}

export default ConfirmSaveReportModal;