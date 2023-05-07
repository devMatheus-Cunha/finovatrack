import { TypeAccount } from '@/hooks/useAuth/types';
import { ExpenseData } from '../../hooks/useFetchExpensesData';
import { ITypeModal } from '../../types';
import { columsHeadProps } from '../../utils';
import { formatCurrencyMoney } from '@/utils/formatCurrencyMoney';
import { Fragment } from 'react';
import { ButtonGroup } from '@/components';
import { PencilSimpleLine, Trash } from '@phosphor-icons/react';

interface ITableToControl {
 typeAccount: TypeAccount
 calculationSumValues: ExpenseData[]
 isVisibilityData: boolean
 handleOpenModal: (type?: ITypeModal, data?: ExpenseData) => void
}

const TableToControl = ({
 calculationSumValues,
 typeAccount,
 handleOpenModal,
 isVisibilityData,
}: ITableToControl) => {
 return (
  <div className="relative overflow-y-auto sm:rounded-lg h-[63vh] w-[100%] bg-gray-800">
   {
    calculationSumValues?.length > 0 ? (
     <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
       <tr>
        {
         columsHeadProps.map((item) => (
          <>
           <th scope="col" className="px-6 py-3" key={item.field}>
            {item.header}
           </th>
          </>
         ))
        }
       </tr>
      </thead>
      <tbody>
       {
        calculationSumValues.map((item, index) => (
         <Fragment key={index}>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
           <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item.description}
           </th>
           {
            typeAccount !== "euro" && (
             <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {item.euro_value !== 0 && isVisibilityData ? formatCurrencyMoney(item.euro_value, "euro") : "-"}
             </th>
            )
           }

           {
            typeAccount !== "euro" && (
             <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {item.real_value !== 0 && isVisibilityData ? formatCurrencyMoney(item.real_value, "real") : "-"}
             </th>
            )
           }
           <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item.type}
           </th>
           <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item.typeMoney}
           </th>
           {
            item.description !== "Totais" ? (
             <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <ButtonGroup buttonOptions={[
               {
                onClick: () => {
                 handleOpenModal("edit", item)
                },
                content: <PencilSimpleLine color="#eee2e2" />
               },
               {
                onClick: () => {
                 handleOpenModal("delete", item)
                },
                content: <Trash color="#eee2e2" />
               }
              ]} />
             </th >
            ) : (
             <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" />
            )
           }
          </tr >
         </Fragment>
        ))
       }
      </tbody>
     </table >
    ) : (
     <div className='flex justify-center items-center h-full'>
      <h1 className='text-2xl'>Não a nenhum dado na tabela!</h1>
     </div>
    )
   }

  </div>
 );
}

export default TableToControl;