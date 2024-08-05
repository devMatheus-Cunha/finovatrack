import { UserData } from '@/hooks/auth/useAuth/types'
import { ExpenseData } from '@/services/expenses/getExpenses'
import {
  formatCurrencyMoney,
  formatToJavaScriptNumber
} from '@/utils/formatNumber'
import React from 'react'
import { IHandleControlModalExpenseFunction } from '../../hooks/useControlModal'

interface IMobileTableProps {
  expensesData: ExpenseData[]
  handleOpenModal: IHandleControlModalExpenseFunction
  userData: UserData
  isVisibilityData: boolean
}

const MobileTable: React.FC<IMobileTableProps> = ({
  expensesData,
  handleOpenModal,
  userData,
  isVisibilityData
}) => {
  return (
    <div className="lg:hidden flex flex-nowrap flex-col md:flex-wrap md:flex-row gap-4">
      {expensesData.map((item) => (
        <>
          <div
            onClick={() => handleOpenModal('edit', item)}
            className="flex h-[85px] w-[100%] md:w-[45%] text-white bg-gray-800 rounded-lg justify-between items-center p-4"
          >
            <div className="flex flex-col gap-4 ">
              <p className="text-ms">{item.description}</p>
              <p className="-mt-1 font-sans text-m font-semibold">
                {formatCurrencyMoney(
                  formatToJavaScriptNumber(item?.value),
                  userData.typeAccount === 'oneCurrency'
                    ? userData.primary_currency
                    : item.typeMoney,
                  isVisibilityData
                )}
              </p>
            </div>
            <div className="flex flex-col gap-4 text-left w-[33%]">
              <p
                className={`font-medium text-ms ${
                  item.payment === 'A Pagar'
                    ? ' text-red-500'
                    : 'text-green-500'
                }`}
              >
                {item.payment}
              </p>
              <p className="text-ms">{item.category}</p>
            </div>
          </div>
        </>
      ))}
    </div>
  )
}

export default MobileTable
