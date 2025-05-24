import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import Slider from 'react-slick'
import useFetchReportsToYearData from '@/hooks/reports/useFetchReportsToYearData_'

const CardToStatsInYear = ({ year }: { year: string }) => {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()
  const { reportDataToYear, isLoading } = useFetchReportsToYearData(year)

  const investmentPercentage =
    reportDataToYear &&
    (
      (reportDataToYear?.totalInvestments / reportDataToYear?.totalEntrys) *
      100
    ).toFixed(2)

  const summaryItems = [
    {
      label: 'Total Entradas',
      value: reportDataToYear?.totalEntrys
    },
    {
      label: 'Total Gastos',
      value: reportDataToYear?.totalExpenses
    },
    {
      label: 'Total Livre',
      value: reportDataToYear?.totalFree
    },
    {
      label: 'Total Investido',
      value: reportDataToYear?.totalInvestments,
      investments: `${investmentPercentage}%`
    }
  ]

  if (isLoading) {
    return <div className="w-full rounded-md bg-gray-700 h-40 animate-pulse" />
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: false,
    arrowsPadding: 0,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 700,
        settings: {
          arrows: true,
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  }

  return (
    <>
      {reportDataToYear ? (
        <div className="bg-gray-700 lg:h-40 rounded-md shadow-none w-full">
          <div className="flex items-end gap-3 pb-0 px-4 pt-4">
            <div>
              <span className="text-gray-400 text-sm">Ano {year}</span>
              <h2 className="text-lg font-semibold text-white">
                Relatorio Anual
              </h2>
            </div>
          </div>

          <div className="pt-4 lg:pt-0 px-2">
            <Slider {...settings} className="w-full">
              {summaryItems.map((card, index) => (
                <div key={index} className="p-2 lg:p-1">
                  <div className="flex w-full items-center bg-gray-700 rounded-md py-4 px-2 lg:px-4">
                    <div className="w-full">
                      <div className="text-xs text-gray-500">{card.label}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg lg:text-xl underline text-white font-bold">
                          {formatCurrencyMoney(
                            card.value,
                            userData.primary_currency,
                            isVisibilityData
                          )}
                        </span>
                        {card.investments && (
                          <span className="hidden md:flex items-center text-green-400 text-xs font-semibold mb-0">
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
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center overflow-y-auto rounded-md w-full h-40 bg-gray-700">
          <span className="mt-4 font-bold text-xl lg:text-[26px] text-white">
            Nenhum relatório gerado
          </span>
          <span className="mt-2 text-sm lg:text-md text-gray-300">
            Não há dados disponíveis para este período.
          </span>
        </div>
      )}
    </>
  )
}

export default CardToStatsInYear
