import {
  useCustomDisclosure,
  useIsVisibilityDatas,
  useUserData
} from '@/hooks/globalStates'
import { useFetchReportsData } from '@/hooks/reports'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { Eye } from 'lucide-react'
import EntrysModal from './EntrysModal'
import { Card } from '@/components'
import Modal from '@/components/common/Modal'

interface CardToStatsInMonthProps {
  selectedDate: Date
}

const CardToStatsInMonth = ({ selectedDate }: CardToStatsInMonthProps) => {
  const { reportData, isLoading } = useFetchReportsData(selectedDate)
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()
  const { isOpen, onOpen, onClose } = useCustomDisclosure()

  const summaryItems = [
    {
      label: 'Total Entradas',
      value: formatCurrencyMoney(
        reportData?.totalEntrys,
        userData?.primary_currency
      ),
      showEntrysIcon: true
    },
    {
      label: 'Total Gastos',
      value: formatCurrencyMoney(
        reportData?.totalExpenses,
        userData?.primary_currency
      )
    },
    {
      label: 'Total Livre',
      value: formatCurrencyMoney(
        reportData?.totalFree,
        userData?.primary_currency
      )
    },
    {
      label: 'Total Investido',
      value: formatCurrencyMoney(
        reportData?.investments?.totalInvestments,
        userData?.primary_currency
      ),
      investments: `${reportData?.investments?.investmentPercentageFormat}`
    }
  ]

  if (userData?.typeAccount === 'hybrid') {
    summaryItems.push(
      {
        label: `Total gastos em ${userData?.secondary_currency}`,
        value: formatCurrencyMoney(
          reportData?.totalExpenseEurToReal,
          userData?.secondary_currency
        )
      },
      { label: 'Cotação Usada', value: String(reportData?.quatation ?? '') }
    )
  }

  return (
    <>
      <Card
        title="Relatorio Total"
        hasData={!!reportData}
        isLoading={isLoading}
        className="h-48 xl:min-w-96"
      >
        <div className="grid grid-cols-2 gap-6 mt-3.5">
          {summaryItems.map((card) => (
            <div key={card.label} className="flex flex-col">
              <div className="text-xs text-gray-500 flex items-center">
                {card.label}
                {card.showEntrysIcon &&
                  (reportData?.entrys?.length ?? 0) > 0 && (
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
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <EntrysModal onClose={onClose} entrys={reportData?.entrys || []} />
      </Modal>
    </>
  )
}

export default CardToStatsInMonth
