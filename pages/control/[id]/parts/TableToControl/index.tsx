import { TypeAccount } from '@/hooks/useAuth/types';
import { ExpenseData, Filter } from '../../hooks/useFetchExpensesData';
import { ITypeModal } from '../../types';
import { validateColumsHeadProps } from '../../utils';
import { formatCurrencyMoney } from '@/utils/formatCurrencyMoney';
import { Fragment } from 'react';
import { ButtonGroup, Empty } from '@/components';
import { PencilSimpleLine, Trash } from '@phosphor-icons/react';

interface ITableToControl {
 typeAccount: TypeAccount
 calculationSumValues: ExpenseData[]
 isVisibilityData: boolean
 handleOpenModal: (type?: ITypeModal, data?: ExpenseData) => void
 filter: Filter
}

const TableToControl = ({
 calculationSumValues,
 typeAccount,
 handleOpenModal,
 isVisibilityData,
 filter,
}: ITableToControl) => {
 return (
  <div className="relative overflow-y-auto sm:rounded-lg h-[63vh] w-[100%] bg-gray-800">
   {
    calculationSumValues?.length > 0 ? (
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
        calculationSumValues.map((item, index) => (
         <Fragment key={index}>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
           <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item.description}
           </th>
           {
            (typeAccount === "euro" || typeAccount === "hybrid") && (
             <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {item.euro_value !== 0 && isVisibilityData ? formatCurrencyMoney(item.euro_value, "euro") : "-"}
             </th>
            )
           }

           {
            (typeAccount === "real" || typeAccount === "hybrid") && (
             <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {item.real_value !== 0 && isVisibilityData ? formatCurrencyMoney(item.real_value, "real") : "-"}
             </th>
            )
           }
           <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item.type}
           </th>
           {
            typeAccount === "hybrid" && (
             <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {item.typeMoney}
             </th>
            )
           }
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
     <Empty<Filter> filter={filter} />
    )
   }

  </div>
 );
}

export default TableToControl;