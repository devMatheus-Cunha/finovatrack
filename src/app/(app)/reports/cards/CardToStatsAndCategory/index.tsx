import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { useFetchReportsData } from '@/hooks/reports'
import { Button, Card, Charts } from '@/components'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { blueHexShades } from '@/utils/colors'
import { Eye } from 'lucide-react'
import EntrysModal from './EntrysModal'
import Modal from '@/components/common/Modal'
import { useCustomDisclosure } from '@/hooks/globalStates'
import { useState } from 'react'

interface CardToStatsAndCategoryProps {
  selectedDate: Date
}

interface ProcessedCategory {
  value: number
  label: string
  hasSubcategory: boolean
  subcategories: { [name: string]: number }
}

// --- ALTERAÇÃO 1: Nova interface para o detalhe da subcategoria ---
interface SubcategoryDetail {
  parentLabel: string
  subLabel: string
  expenses: any[]
}

const CardToStatsAndCategory = ({
  selectedDate
}: CardToStatsAndCategoryProps) => {
  const { reportData, isLoading } = useFetchReportsData(selectedDate)
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()

  // Modal de Entradas (existente)
  const {
    isOpen: isEntrysModalOpen,
    onOpen: onEntrysModalOpen,
    onClose: onEntrysModalClose
  } = useCustomDisclosure()

  // Modal de detalhes da Categoria (mostra subcategorias)
  const [selectedCategory, setSelectedCategory] =
    useState<ProcessedCategory | null>(null)

  // --- ALTERAÇÃO 2: Novo estado para o modal de despesas da subcategoria ---
  const [subcategoryDetails, setSubcategoryDetails] =
    useState<SubcategoryDetail | null>(null)

  const summaryItems = [
    {
      label: 'Entradas',
      value: formatCurrencyMoney(
        reportData?.totalEntrys,
        userData?.primary_currency
      ),
      showEntrysIcon: true
    },
    {
      label: 'Gastos',
      value: formatCurrencyMoney(
        reportData?.totalExpenses,
        userData?.primary_currency
      )
    },
    {
      label: 'Livre',
      value: formatCurrencyMoney(
        reportData?.totalFree,
        userData?.primary_currency
      )
    },
    {
      label: 'Investido',
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
        label: `gastos em ${userData?.secondary_currency}`,
        value: formatCurrencyMoney(
          reportData?.totalExpenseEurToReal,
          userData?.secondary_currency
        )
      },
      { label: 'Cotação Usada', value: String(reportData?.quatation ?? '') }
    )
  }

  const data = reportData?.data ?? []

  function sumToCategory(expenses: any[]): ProcessedCategory[] {
    const result: {
      [category: string]: {
        total: number
        subcategories: { [name: string]: number }
      }
    } = {}

    for (const expense of expenses) {
      if (expense.category === 'Investimentos') continue

      const { category, value_primary_currency, subcategory } = expense

      if (!result[category]) {
        result[category] = { total: 0, subcategories: {} }
      }

      result[category].total += value_primary_currency

      if (subcategory && subcategory.label) {
        const subLabel = subcategory.label
        if (!result[category].subcategories[subLabel]) {
          result[category].subcategories[subLabel] = 0
        }
        result[category].subcategories[subLabel] += value_primary_currency
      }
    }

    return Object.keys(result).map((category) => ({
      value: result[category].total,
      label: category,
      subcategories: result[category].subcategories,
      hasSubcategory: Object.keys(result[category].subcategories).length > 0
    }))
  }

  // --- ALTERAÇÃO 3: Nova função para abrir o modal de detalhes da subcategoria ---
  const handleSubcategoryClick = (parentLabel: string, subLabel: string) => {
    const relevantExpenses = data.filter(
      (expense) =>
        expense.category === parentLabel &&
        expense.subcategory?.label === subLabel
    )
    setSubcategoryDetails({ parentLabel, subLabel, expenses: relevantExpenses })
  }

  const processedCategories = sumToCategory(data)

  const blueHexKeys = Object.keys(blueHexShades)
  const chartData = processedCategories.map((category, index) => ({
    label: category.label,
    value: category.value,
    color:
      blueHexShades[
        blueHexKeys[index % blueHexKeys.length] as keyof typeof blueHexShades
      ]
  }))

  const renderSummaryCard = (card: any) => (
    <div
      key={card.label}
      className="flex flex-col bg-gray-800/50 rounded-xl p-4 shadow-md flex-1"
    >
      <div className="text-sm text-gray-300 flex items-center mb-1">
        {card.label}
        {card.showEntrysIcon && (reportData?.entrys?.length ?? 0) > 0 && (
          <button
            type="button"
            onClick={onEntrysModalOpen}
            className="ml-2 text-cyan-400 hover:text-cyan-300 focus:outline-none transition-colors duration-200"
          >
            <Eye size={18} />
          </button>
        )}
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-lg text-white font-bold">
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
  )

  return (
    <>
      <Card
        title="Relatório Mensal"
        hasData={!!reportData}
        isLoading={isLoading}
        className="w-full min-h-96 xl:min-w-96"
      >
        <div className="flex flex-col gap-8 mt-4">
          <div className="flex flex-wrap gap-3 w-full">
            {summaryItems.map(renderSummaryCard)}
          </div>

          <div className="border-t border-gray-700 mt-4">
            <h3 className="text-center text-xl font-semibold text-white mb-4">
              Análise Detalhada por Categoria
            </h3>
            <div className="flex flex-col items-center justify-center gap-8">
              <div className="w-full lg:w-1/2 flex justify-center">
                <Charts.PieChartCircle
                  data={chartData}
                  total={chartData.reduce((acc, item) => acc + item.value, 0)}
                  currency={userData.primary_currency}
                  isVisibilityData={isVisibilityData}
                  showTooltip
                />
              </div>
              <div className="w-full">
                <div className="flex flex-wrap justify-around gap-3">
                  {processedCategories.map((item) => (
                    <div
                      key={item.label}
                      className="text-white bg-gray-800/50 rounded-xl px-3 py-2.5 shadow-md flex-1 min-w-[115px] max-w-[220px]"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <span className="text-xs opacity-70">
                            {item.label}
                          </span>
                          {item.hasSubcategory && (
                            <button
                              type="button"
                              onClick={() => setSelectedCategory(item)}
                              className="ml-2 text-cyan-400 hover:text-cyan-300 focus:outline-none transition-colors duration-200"
                            >
                              <Eye size={18} />
                            </button>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-base lg:text-md font-semibold">
                            {formatCurrencyMoney(
                              Number(item.value),
                              userData.primary_currency,
                              isVisibilityData
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={isEntrysModalOpen}
        onClose={onEntrysModalClose}
        isCentered
        size="xl"
        title="Detalhes das Entradas"
      >
        <EntrysModal
          onClose={onEntrysModalClose}
          entrys={reportData?.entrys || []}
        />
      </Modal>

      <Modal
        isOpen={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
        isCentered
        size="lg"
        title={`Detalhes de: ${selectedCategory?.label || ''}`}
      >
        <div className="flex flex-wrap gap-3 py-2">
          {selectedCategory &&
            Object.entries(selectedCategory.subcategories).map(
              ([subLabel, subValue]) => (
                <div
                  key={subLabel}
                  className="flex flex-col bg-gray-800/50 rounded-xl p-3 shadow-md flex-1 min-w-[140px] text-left"
                >
                  <span className="text-sm text-gray-300 mb-1">{subLabel}</span>
                  <span className="text-md text-white font-bold">
                    {formatCurrencyMoney(
                      Number(subValue),
                      userData.primary_currency,
                      isVisibilityData
                    )}
                  </span>
                </div>
              )
            )}
        </div>
        <div className="px-0 py-6 flex justify-end gap-3">
          <Button variant="cancel" onClick={() => setSelectedCategory(null)}>
            Fechar
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default CardToStatsAndCategory
