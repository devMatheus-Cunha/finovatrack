import { useUserData } from '@/hooks/globalStates'
import { IReportData } from '@/services/reports/getReport'
import InfoCardsToReport from './InfoCardsToReport'

const CardToStatsInMonth = ({
  isLoading,
  reportData
}: {
  isLoading: boolean
  reportData: IReportData | null | undefined
}) => {
  const { userData } = useUserData()

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl rounded-md bg-gray-700 h-[214px] lg:h-[200px] animate-pulse" />
    )
  }

  return (
    <>
      {reportData?.data && reportData?.data.length > 0 ? (
        <div>
          <InfoCardsToReport
            data={reportData}
            userData={userData}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center overflow-y-auto rounded-md w-full max-w-2xl h-[214px] lg:h-[200px] bg-gray-700 p-4 lg:p-0">
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

export default CardToStatsInMonth
