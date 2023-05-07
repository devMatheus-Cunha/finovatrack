/* eslint-disable react/no-array-index-key */
import { Button, SideBar } from '@/components';
import { FolderOpen } from '@phosphor-icons/react';
import { Fragment } from 'react';
import DatePicker from 'react-datepicker';
import formatCurrencyMoney from '@/utils/formatCurrencyMoney';
import { useRouter } from 'next/router';
import useFecthReportsData from './hooks/useFecthReportsData';

const columsHeadProps = [
  {
    header: 'Descrição',
    field: 'description',
  },
  {
    header: 'Valor Euro',
    field: 'euro_value',
  },
  {
    header: 'Valor Real',
    field: 'real_value',
  },
  {
    header: 'Tipo',
    field: 'type',
  },
  {
    header: 'Moeda',
    field: 'typeMoney',
  },
];

interface Query {
 id: string;
}

function Reports() {
  const router = useRouter();
  const { id } = router.query as unknown as Query;

  const {
    reportData,
    selectedPeriod,
    setSelectedPeriod,
    setPeriod,
  } = useFecthReportsData(id);

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
    <SideBar>
      <div className="h-[100vh] pt-8 w-[100%]">
        <div className="flex items-center flex-col w-[100%] gap-10">
          <div className=" p-7 flex h-auto gap-4 bg-gray-800 rounded-lg flex-col w-[34%]">
            <h2>Escolha um período para solicitar um relatório:</h2>
            <div className="flex gap-4 bg-gray-800 rounded-lg  justify-center">
              <div>
                <DatePicker
                  selected={selectedPeriod}
                  onChange={(date: Date) => onChangeDate(date)}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  className="border ext-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <Button
                type="button"
                onClick={() => onSubmit(selectedPeriod)}
                className="font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600 dark:border-gray-700"
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
             <span className="italic">{data?.period}</span>
           </h1>
           <div className="flex gap-4">
             <h1 className="dark:text-gray-300">
               Total Entradas:
               <span className="italic dark:text-white">{data.totalEntrys}</span>
             </h1>
             <h1 className="dark:text-gray-300">
               Total Saídas:
               <span className="italic dark:text-white">{data.totalExpenses}</span>
             </h1>
             <h1 className="dark:text-gray-300">
               Total Investido:
               <span className="italic dark:text-white">{data.totalInvested}</span>
             </h1>
             <h1 className="dark:text-gray-300">
               Cotação Usada:
               <span className="italic dark:text-white">{data.quatation}</span>
             </h1>
           </div>
           <div className="relative overflow-y-auto sm:rounded-lg h-[63vh] w-[100%] bg-gray-800">
             {
           data?.data?.length > 0 ? (
             <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
               <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                 <tr>
                   {
                columsHeadProps.map((item) => (
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
                     <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       {item.euro_value !== 0 ? formatCurrencyMoney(item.euro_value, 'euro') : '-'}
                     </th>
                     <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       {item.real_value !== 0 ? formatCurrencyMoney(item.real_value, 'real') : '-'}
                     </th>
                     <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       {item.type}
                     </th>
                     <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       {item.typeMoney}
                     </th>
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

    </SideBar>
  );
}

export default Reports;
