import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { TableColumn } from '@/components/common/Table'
import { optionsCurrencyKeyAndValue } from '@/utils/configCurrency'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import TableDesktopReports from './TableDesktopReports'
import TableMobileReports from './TableMobileReports'
import { useFetchReportsData } from '@/hooks/reports'
import { Card } from '@/components'

interface CardToTableExpensesProps {
  selectedDate: Date
}

const CardToTableExpenses = ({ selectedDate }: CardToTableExpensesProps) => {
  const { reportData, isLoading } = useFetchReportsData(selectedDate)
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
        header: 'Categoria',
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

  return (
    <Card
      title="Gastos"
      isLoading={isLoading}
      hasData={!!reportData?.data}
      className="h-[45vh] overflow-x-auto w-full max-w-2xl xl:h-[48vh]"
    >
      <>
        <TableDesktopReports
          data={reportData?.data ?? []}
          columns={columsHeadProps()}
          userData={userData}
          isVisibilityData={isVisibilityData}
        />
        <TableMobileReports
          data={reportData?.data ?? []}
          colums={columsHeadProps()}
          userData={userData}
          isVisibilityData={isVisibilityData}
        />
      </>
    </Card>
  )
}

export default CardToTableExpenses
