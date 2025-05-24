'use client'

import { UserData } from '@/hooks/entrys/useDeletedEntry/auth/useAuth/types'
import { useIsVisibilityDatas } from '@/hooks/globalStates'
import { Eye } from '@phosphor-icons/react'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import EntrysModal from './EntrysModal'
import { Modal } from '@/components/common/Modal'
import { useCustomDisclosure } from '@/hooks/globalStates'

interface IInfoCardsToControl {
  userData: UserData
  data: any
  isLoading: boolean
}

function InfoCardsToReport({ userData, data }: IInfoCardsToControl) {
  const { isVisibilityData } = useIsVisibilityDatas()
  const { isOpen, onOpen, onClose } = useCustomDisclosure()

  const summaryItems = [
    {
      label: 'Total Entradas',
      value: formatCurrencyMoney(data?.totalEntrys, userData?.primary_currency),
      showEntrysIcon: true
    },
    {
      label: 'Total Gastos',
      value: formatCurrencyMoney(
        data?.totalExpenses,
        userData?.primary_currency
      )
    },
    {
      label: 'Total Livre',
      value: formatCurrencyMoney(data?.totalFree, userData?.primary_currency)
    },
    {
      label: 'Total Investido',
      value: formatCurrencyMoney(
        data?.investments?.totalInvestments,
        userData?.primary_currency
      ),
      investments: `${data?.investments?.investmentPercentageFormat}`
    }
  ]

  if (userData?.typeAccount === 'hybrid') {
    summaryItems.push(
      {
        label: `Total gastos em ${userData?.secondary_currency}`,
        value: data?.totalExpenseEurToReal
      },
      { label: 'Cotação Usada', value: data?.quatation }
    )
  }

  return (
    <>
      <div className="bg-gray-700 rounded-md h-[200px] w-full p-4 flex flex-col">
        <div className="flex justify-between items-center pb-0">
          <h2 className="text-lg font-semibold text-white">Relatorio Total</h2>
        </div>
        <div className="flex-1 pt-0">
          <div className="grid grid-cols-2 gap-6 mt-3.5">
            {summaryItems.map((card) => (
              <div key={card.label} className="flex flex-col">
                <div className="text-xs text-gray-500 flex items-center">
                  {card.label}
                  {card.showEntrysIcon && data?.entrys?.length > 0 && (
                    <button
                      type="button"
                      onClick={onOpen}
                      className="ml-2 text-cyan-400 hover:text-cyan-300 focus:outline-none"
                    >
                      <Eye size={16} />
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg lg:text-xl text-white font-bold">
                    {isVisibilityData
                      ? card.value ||
                        formatCurrencyMoney(
                          0,
                          userData.primary_currency,
                          isVisibilityData
                        )
                      : '****'}
                  </span>
                  {card.investments && (
                    <span className="flex items-center text-green-400 text-xs font-semibold">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                      {card.investments}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <EntrysModal onClose={onClose} entrys={data?.entrys || []} />
      </Modal>
    </>
  )
}

export default InfoCardsToReport
