import { ShowAndHide } from '@/components'
import { ExpenseData } from '@/services/expenses/getExpenses'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { TableColumn } from '@/components/common/Table'
import { UserData } from '@/hooks/entrys/useDeletedEntry/auth/useAuth/types'
import React from 'react'

interface ITableReportsProps {
  data: ExpenseData[]
  colums: TableColumn[]
  userData: UserData
  isVisibilityData: boolean
}

const TableReports: React.FC<ITableReportsProps> = ({
  data,
  userData,
  isVisibilityData
}) => {
  return (
    <ShowAndHide displayLg="none" displayBase="initial">
      <div className="grid grid-cols-1 gap-2 max-h-[278px] overflow-auto">
        {data?.map((item) => (
          <React.Fragment key={item.id}>
            {item.value_primary_currency && (
              <div
                key={item.id}
                className="bg-gray-700 rounded-lg p-4 h-[85px] w-full flex justify-between items-center"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-base text-white">
                    {item?.description}
                  </span>
                  <span className="text-md font-semibold text-white">
                    {formatCurrencyMoney(
                      Number(item?.value_primary_currency),
                      userData.typeAccount === 'oneCurrency'
                        ? userData.primary_currency
                        : item?.typeMoney,
                      isVisibilityData
                    )}
                  </span>
                </div>
                <div className="flex flex-col gap-1 w-1/3">
                  <span
                    className={`text-base font-medium ${item?.payment === 'A Pagar' ? 'text-red-500' : 'text-green-500'}`}
                  >
                    {item?.payment}
                  </span>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </ShowAndHide>
  )
}

export default TableReports
