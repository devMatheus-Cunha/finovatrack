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
      <table className="w-full lg:w-[500px] text-left align-middle">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.field}
                className="text-gray-300 font-medium text-xs md:text-sm border-b border-gray-600/50 px-2 py-3 align-middle whitespace-nowrap"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-600">
          {data.map((row: TableRow, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-gray-600/50 last:border-b-0 align-middle"
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
                    className="px-2 py-3 font-normal text-sm  whitespace-nowrap text-white align-middle"
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
