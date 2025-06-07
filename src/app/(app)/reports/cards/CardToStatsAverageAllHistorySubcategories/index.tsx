import React, { useMemo, useState } from 'react'
import useFetchReportsToYearData from '@/hooks/reports/useFetchReportsToYearData'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { Card } from '@/components'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { useFetchReportsData } from '@/hooks/reports'
import { categoryOptions } from '@/components/control/modals/expenseModalContent/utilts'

// Um ícone simples para a mensagem. Você pode substituir por um da sua biblioteca (ex: Heroicons, Lucide).
const InfoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
    />
  </svg>
)

interface CardStatsAverageAllHistorySubcategoriesProps {
  selectedDate: Date
}

const CardStatsAverageAllHistorySubcategories = ({
  selectedDate
}: CardStatsAverageAllHistorySubcategoriesProps) => {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()
  const { year } = useFetchReportsData(selectedDate)
  const { reportDataToYear, isLoading } = useFetchReportsToYearData(
    String(year)
  )
  const [selectedCategory, setSelectedCategory] = useState('')

  const categoriesForSelect = useMemo(() => {
    if (!reportDataToYear?.mediaExpenseToSubcategory) {
      return []
    }
    return categoryOptions.filter((cat) => {
      const hasSubcategories = cat.subcategories && cat.subcategories.length > 0
      if (!cat.disabled && hasSubcategories) {
        const subcategoryData =
          reportDataToYear.mediaExpenseToSubcategory[cat.value]
        if (!subcategoryData) return false
        return cat.subcategories?.some(
          (sub) => (subcategoryData[sub.value] || 0) > 0
        )
      }
      return false
    })
  }, [reportDataToYear])

  const avgTotal = selectedCategory
    ? reportDataToYear?.mediaExpenseToCategory?.[selectedCategory] || 0
    : 0

  const filteredSubcategories = useMemo(() => {
    if (!selectedCategory || !reportDataToYear?.mediaExpenseToSubcategory) {
      return []
    }
    const selectedCategoryInfo = categoryOptions.find(
      (cat) => cat.value === selectedCategory
    )
    if (!selectedCategoryInfo?.subcategories) {
      return []
    }
    return selectedCategoryInfo.subcategories
      .map((sub) => ({
        subcategory: sub.label,
        average:
          reportDataToYear?.mediaExpenseToSubcategory?.[selectedCategory]?.[
            sub.value
          ] || 0
      }))
      .filter((sub) => sub.average > 0)
  }, [selectedCategory, reportDataToYear])

  const showEmptyState = !isLoading && categoriesForSelect.length === 0

  return (
    <Card
      title="Médias Detalhadas por Subcategoria"
      isLoading={isLoading}
      hasData={true}
      className="w-full h-70"
    >
      {showEmptyState ? (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
          <InfoIcon className="w-12 h-12 text-blue-500 mb-3" />
          <h3 className="font-bold text-white text-lg mb-1">
            Análises Detalhadas Aguardam!
          </h3>
          <p className="text-gray-400 text-sm max-w-xs">
            Quando você registrar despesas com subcategorias, as médias de
            gastos de cada uma aparecerão aqui para uma análise aprofundada.
          </p>
        </div>
      ) : (
        // <-- SEÇÃO ANTIGA: Conteúdo principal do card -->
        <div className="flex flex-col gap-2 mt-4">
          <div className="bg-gray-800/50 rounded-xl p-4 shadow mb-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 mb-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione uma categoria</option>
              {categoriesForSelect.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>

            {selectedCategory && (
              <>
                <div className="text-sm text-gray-400 mb-1 text-center">
                  Total Médio da Categoria:
                </div>
                <div className="text-xl font-extrabold text-white tracking-tight text-center">
                  {isVisibilityData
                    ? formatCurrencyMoney(avgTotal, userData.primary_currency)
                    : '****'}
                </div>
              </>
            )}
          </div>

          {selectedCategory && filteredSubcategories.length > 0 && (
            <div className="bg-gray-800/60 rounded-xl p-4 shadow">
              <div className="text-sm text-gray-400 mb-3 text-center">
                Média por Subcategoria:
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredSubcategories.map((sub) => (
                  <li
                    key={sub.subcategory}
                    className="flex items-center justify-between bg-gray-800/50 rounded-lg px-3 py-2"
                  >
                    <span className="text-gray-300 text-xs font-medium truncate max-w-[120px]">
                      {sub.subcategory}
                    </span>
                    <span className="text-white text-base font-semibold">
                      {isVisibilityData
                        ? formatCurrencyMoney(
                            sub.average,
                            userData.primary_currency
                          )
                        : '****'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}

export default CardStatsAverageAllHistorySubcategories
