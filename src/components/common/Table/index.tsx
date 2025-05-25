import React, { ReactNode } from 'react'

export interface TableColumn {
  header: string
  field: string
  modifier?: (value: any, props: Record<string, any>) => ReactNode
  styles?: (value: any) => React.CSSProperties
}

export interface TableRow {
  [key: string]: any
}

interface TableProps {
  columns: TableColumn[]
  data: TableRow[]
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="bg-gray-700 h-[63vh] rounded-md overflow-y-auto w-full">
      <table className="min-w-full">
        <thead className="border-b border-gray-600">
          <tr>
            {columns.map((column) => (
              <th
                key={column.field}
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-600">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-600">
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
    </div>
  )
}

export default Table
