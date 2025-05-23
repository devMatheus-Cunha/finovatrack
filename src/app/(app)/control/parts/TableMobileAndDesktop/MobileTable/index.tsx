import { UserData } from '@/hooks/entrys/useDeletedEntry/auth/useAuth/types'
import { ExpenseData } from '@/services/expenses/getExpenses'
import {
  formatCurrencyMoney,
  formatToJavaScriptNumber
} from '@/utils/formatNumber'
import React from 'react'
import { ITypeModalExpense } from '../../../hooks/useControlModal'
import { Filter } from '@/hooks/expenses/useFetchExpensesData'
import { Empty } from '@/components'

interface IMobileTableProps {
  calculationSumValues: ExpenseData[]
  isVisibilityData: boolean
  handleOpenModal: (type?: ITypeModalExpense, data?: ExpenseData) => void
  filter: Filter
  userData: UserData
  isLoadingExpensesData?: boolean
}

const MobileTable: React.FC<IMobileTableProps> = ({
  calculationSumValues,
  handleOpenModal,
  userData,
  isVisibilityData,
  isLoadingExpensesData,
  filter
}) => {
  const skeletons = Array(5).fill(0)
  return (
    <>
      {isLoadingExpensesData ? (
        <div className="flex flex-wrap gap-4">
          {skeletons.map((_, index) => (
            <div
              key={index}
              className="h-24 rounded-lg w-full md:w-[45%] bg-gray-700 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          {calculationSumValues?.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {calculationSumValues.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenModal('edit', item)}
                  className="h-24 w-full md:w-[45%] bg-[#2D3748] rounded-lg p-4 text-white flex justify-between items-center cursor-pointer"
                >
                  <div className="flex flex-col items-start space-y-4">
                    <p className="text-ms">{item.description}</p>
                    <p className="text-ms font-semibold -mt-1">
                      {formatCurrencyMoney(
                        formatToJavaScriptNumber(item?.value),
                        userData.typeAccount === 'oneCurrency'
                          ? userData.primary_currency
                          : item.typeMoney,
                        isVisibilityData
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col items-start space-y-4 w-1/3">
                    <p
                      className={`text-ms font-medium ${
                        item.payment === 'A Pagar'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }`}
                    >
                      {item.payment}
                    </p>
                    <p className="text-ms">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Empty<Filter> filter={filter} />
          )}
        </>
      )}
    </>
  )
}

export default MobileTable
