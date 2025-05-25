import { ShowAndHide } from '@/components'
import { ExpenseData } from '@/services/expenses/getExpenses'
import { UserData } from '@/hooks/entrys/useDeletedEntry/auth/useAuth/types'
import { TableColumn, TableRow } from '@/components/common/Table'

interface ITableReportsProps {
  data: ExpenseData[]
  columns: TableColumn[]
  userData: UserData
  isVisibilityData: boolean
}

const TableReports: React.FC<ITableReportsProps> = ({ data, columns }) => {
  return (
    <ShowAndHide displayLg="initial" displayBase="none">
      <table className="min-w-full text-left">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.field}
                className="px-6 py-4 text-gray-300 font-semibold text-sm border-b border-gray-600"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: TableRow, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-gray-600 last:border-b-0"
            >
              {columns.map((column) => {
                const cellStyles = column.styles
                  ? column.styles(row[column.field])
                  : {}

                const cellContent =
                  column.modifier && typeof column.modifier === 'function'
                    ? column.modifier(row[column.field], row)
                    : row[column.field]

                return (
                  <td
                    key={column.field}
                    className="px-6 py-4 font-medium whitespace-nowrap text-white"
                    style={cellStyles}
                  >
                    {cellContent}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </ShowAndHide>
  )
}

export default TableReports
