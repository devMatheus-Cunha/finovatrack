/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */

'use client';

import { FolderOpen } from '@phosphor-icons/react';
import { Fragment, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Button } from '@/components';
import { formatCurrencyMoney } from '@/utils/formatNumber';
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates';
import { useFetchReportsData } from '@/hooks/reports';
import { validateColumsHeadProps } from './utils';
import { validaTextForTypeAccount } from '../../control/[id]/utils';

function Reports() {
  const { userData: { id, typeAccount } } = useUserData();
  const [selectedPeriod, setSelectedPeriod] = useState(new Date());
  const { isVisibilityData } = useIsVisibilityDatas();

  const {
    reportData,
    setPeriod,
  } = useFetchReportsData(id);

  const [data] = reportData ?? [];

  function onChangeDate(date: Date) {
    setSelectedPeriod(
      date,
    );
  }

  const onSubmit = (date: Date) => {
    const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
      month: '2-digit',
      year: 'numeric',
    });

    setPeriod(formattedDate);
  };

  return (
    <div className="h-[100vh] w-[100%]">
      <div className="flex items-center flex-col w-[100%] gap-10 p-3">
        <div className="p-4 flex h-auto gap-4 bg-gray-800 rounded-lg flex-col">
          <h2>Escolha um período para solicitar um relatório:</h2>
          <div className="flex gap-4 bg-gray-800 rounded-lg justify-center">
            <div>
              <DatePicker
                selected={selectedPeriod}
                onChange={(date: Date) => onChangeDate(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                className="border ext-sm rounded-lg w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <Button
              type="button"
              onClick={() => onSubmit(selectedPeriod)}
              className="font-medium rounded-lg text-sm p-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600 dark:border-gray-700"
            >
              <div className="flex gap-2 justify-center items-center">
                <FolderOpen size={20} color="#eee2e2" />
                Solicitar Relatório
              </div>
            </Button>
          </div>
        </div>
        <div className="w-[95%]">
          {
       data ? (
         <div className="flex flex-col gap-4">
           <h1 className="text-xl">
             Relatório referente ao período
             {' '}
             <span className="italic">{data?.period}</span>
           </h1>
           <div className="flex gap-4">
             <h1 className="dark:text-gray-300">
               {validaTextForTypeAccount[typeAccount]?.titleEntrys}
               {' '}
               <span className="italic dark:text-white">{isVisibilityData ? data.totalEntrys : '****'}</span>
             </h1>
             <h1 className="dark:text-gray-300">
               {validaTextForTypeAccount[typeAccount]?.titleExpensesEurToReal}
               {' '}
               <span className="italic dark:text-white">{isVisibilityData ? data.totalExpenseEurToReal : '****'}</span>
             </h1>
             <h1 className="dark:text-gray-300">
               {validaTextForTypeAccount[typeAccount]?.titleExpenses}
               {' '}
               <span className="italic dark:text-white">{isVisibilityData ? data.totalExpenses : '****'}</span>
             </h1>
             <h1 className="dark:text-gray-300">
               {validaTextForTypeAccount[typeAccount]?.totalFree}
               {' '}
               <span className="italic dark:text-white">{isVisibilityData ? data.totalInvested : '****'}</span>
             </h1>
             {
                      typeAccount === 'hybrid' && (
                        <h1 className="dark:text-gray-300">
                          Cotação Usada:
                          {' '}
                          <span className="italic dark:text-white">{data.quatation}</span>
                        </h1>
                      )
             }

           </div>
           <div className="relative overflow-y-auto sm:rounded-lg h-[62vh] w-[100%] bg-gray-800">
             {
           data?.data?.length > 0 ? (
             <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
               <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                 <tr>
                   {
                validateColumsHeadProps[typeAccount].map((item: { field: string, header: string }) => (
                  <th scope="col" className="px-6 py-3" key={item.field}>
                    {item.header}
                  </th>
                ))
               }
                 </tr>
               </thead>
               <tbody>
                 {
               data.data.map((item, index) => (
                 <Fragment key={index}>
                   <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                     <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       {item.description}
                     </th>
                     {
            (typeAccount === 'euro' || typeAccount === 'hybrid') && (
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {item.euro_value !== 0 && isVisibilityData ? formatCurrencyMoney(item.euro_value, 'euro') : '-'}
            </th>
            )
           }

                     {
            (typeAccount === 'real' || typeAccount === 'hybrid') && (
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {item.real_value !== 0 && isVisibilityData ? formatCurrencyMoney(item.real_value, 'real') : '-'}
            </th>
            )
           }
                     <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       {item.type}
                     </th>
                     {
            typeAccount === 'hybrid' && (
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {item.typeMoney}
            </th>
            )
           }

                   </tr>
                 </Fragment>
               ))
              }
               </tbody>
             </table>
           ) : (
             <div className="flex justify-center items-center h-full">
               <h1 className="text-2xl">Não a nenhum dado na tabela!</h1>
             </div>
           )
          }

           </div>
         </div>
       ) : (
         <div className="flex justify-center items-center h-full">
           <h1 className="text-2xl">Nenhum relatório gerado para este período</h1>
         </div>
       )
      }
        </div>
      </div>
    </div>
  );
}

export default Reports;
