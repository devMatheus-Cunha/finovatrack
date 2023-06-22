/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */

'use client';

import { UserData } from '@/hooks/auth/useAuth/types';
import { formatCurrencyMoney } from '@/utils/formatNumber';
import { Fragment } from 'react';
import { ButtonGroup, Empty } from '@/components';
import { PencilSimpleLine, Trash } from '@phosphor-icons/react';
import { ExpenseData, Filter } from '@/hooks/expenses/useFetchExpensesData';
import { columsHeadProps } from '../../utils';
import { ITypeModal } from '../../types';

interface ITableToControl {
 calculationSumValues: ExpenseData[]
 isVisibilityData: boolean
 handleOpenModal: (type?: ITypeModal, data?: ExpenseData) => void
 filter: Filter
 userData: UserData
}

function TableToControl({
  calculationSumValues,
  handleOpenModal,
  isVisibilityData,
  filter,
  userData,
}: ITableToControl) {
  return (
    <div className="relative overflow-y-auto sm:rounded-lg h-[63vh] w-[100%] bg-gray-800">
      {
    calculationSumValues?.length > 0 ? (
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-md uppercase bg-gray-800 text-gray-400 border-b border-gray-700">
          <tr>
            {
        columsHeadProps(userData.primary_currency, userData.secondary_currency).map((item: { field: string, header: string }) => (
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
            <tr className="bg-white border-b bg-gray-800 border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                {item.description}
              </th>
              {
            (userData.primary_currency) && (
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
              {item.value_primary_currency !== 0 && isVisibilityData ? formatCurrencyMoney(item.value_primary_currency, userData.primary_currency) : '-'}
            </th>
            )
           }

              {
            (userData.secondary_currency) && (
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
              {item.value_secondary_currency !== 0 && isVisibilityData ? formatCurrencyMoney(item.value_secondary_currency, userData.secondary_currency) : '-'}
            </th>
            )
           }
              <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                {item.type}
              </th>

              {
            item.description !== 'Totais' ? (
              <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                <ButtonGroup buttonOptions={[
                  {
                    onClick: () => {
                      handleOpenModal('edit', item);
                    },
                    content: <PencilSimpleLine color="#eee2e2" />,
                  },
                  {
                    onClick: () => {
                      handleOpenModal('delete', item);
                    },
                    content: <Trash color="#eee2e2" />,
                  },
                ]}
                />
              </th>
            ) : (
              <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white" />
            )
           }
            </tr>
          </Fragment>
        ))
       }
        </tbody>
      </table>
    ) : (
      <Empty<Filter> filter={filter} />
    )
   }

    </div>
  );
}

export default TableToControl;
