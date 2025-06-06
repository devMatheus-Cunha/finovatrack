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
      <div className="overflow-x-auto  mt-4 rounded-xl shadow-lg bg-gray-800/50">
        <table className="w-full min-w-[600px] text-left align-middle border-separate border-spacing-0">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.field}
                  className="text-gray-300 font-semibold text-xs md:text-sm border-b border-gray-700 px-4 py-3 bg-gray-800/50 first:rounded-tl-xl last:rounded-tr-xl"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {data.map((row: TableRow, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-800/40 transition-colors border-b border-gray-800 last:border-b-0 align-middle"
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
                      className="px-4 py-3 font-normal text-sm whitespace-nowrap text-white align-middle"
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
      </div>
    </ShowAndHide>
  )
}

export default TableReports
