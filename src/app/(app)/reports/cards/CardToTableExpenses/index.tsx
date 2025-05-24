import { IReportData } from '@/services/reports/getReport'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { TableColumn } from '@/components/common/Table'
import { optionsCurrencyKeyAndValue } from '@/utils/configCurrency'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import EmptyWithoutReport from './EmptyWithoutReport'
import TableDesktopReports from './TableDesktopReports'
import TableMobileReports from './TableMobileReports'

const CardToTableExpenses = ({
  isLoading,
  reportData
}: {
  isLoading: boolean
  reportData: IReportData | null | undefined
}) => {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()

  const columsHeadProps = (): TableColumn[] => {
    const columns = [
      {
        header: 'Descrição',
        field: 'description'
      },
      {
        header: optionsCurrencyKeyAndValue[userData.primary_currency],
        field: 'value_primary_currency',
        modifier: (value: number) =>
          formatCurrencyMoney(
            value,
            userData?.primary_currency,
            isVisibilityData
          )
      },
      {
        header: 'category',
        field: 'category',
        modifier: (value: string) => value ?? '-'
      }
    ]

    if (userData.typeAccount === 'hybrid') {
      columns.splice(2, 0, {
        header: optionsCurrencyKeyAndValue[userData.secondary_currency],
        field: 'value_secondary_currency',
        modifier: (value: number) =>
          formatCurrencyMoney(
            value,
            userData.secondary_currency,
            isVisibilityData
          )
      })
    }

    return columns
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl rounded-md bg-gray-700 h-[278px] lg:h-[45vh] animate-pulse" />
    )
  }

  return (
    <div className="w-full">
      {reportData?.data && reportData?.data.length > 0 ? (
        <>
          <TableDesktopReports
            data={reportData?.data}
            columns={columsHeadProps()}
            userData={userData}
            isVisibilityData={isVisibilityData}
          />
          <TableMobileReports
            data={reportData?.data}
            colums={columsHeadProps()}
            userData={userData}
            isVisibilityData={isVisibilityData}
          />
        </>
      ) : (
        <EmptyWithoutReport />
      )}
    </div>
  )
}

export default CardToTableExpenses
