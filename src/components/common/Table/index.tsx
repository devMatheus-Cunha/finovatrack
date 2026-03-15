import type { ReactNode, CSSProperties } from 'react'

export interface TableColumn {
  header: string
  field: string
  modifier?: (value: any, props?: any) => ReactNode
  styles?: (value: any) => CSSProperties
}

export interface TableRow {
  [key: string]: any
}

interface TableProps {
  columns: TableColumn[]
  data: TableRow[]
  rowClassName?: (row: TableRow) => string
  rowStyles?: (row: TableRow) => React.CSSProperties
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  rowClassName,
  rowStyles
}) => {
  return (
    <table className="w-full min-w-[600px] text-left align-middle border-separate border-spacing-0">
      <thead className="border-b border-gray-600/50 ">
        <tr className="align-middle">
          {columns.map((column) => {
            const headerStyles = column.styles?.(undefined) || {}
            const headerAlign = headerStyles.textAlign as string | undefined

            return (
              <th
                key={column.field}
                className={`px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider align-middle ${
                  headerAlign === 'right'
                    ? 'text-right'
                    : headerAlign === 'center'
                      ? 'text-center'
                      : 'text-left'
                }`}
              >
                {column.header}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-600">
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={`hover:bg-gray-600 align-middle ${rowClassName?.(row) ?? ''}`}
            style={rowStyles?.(row)}
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
                  className="px-6 py-4 text-[14px] whitespace-nowrap text-white"
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
  )
}

export default Table
