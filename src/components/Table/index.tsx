import React, { ReactNode } from 'react'
import {
  Table as TableChakra,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from '@chakra-ui/react'

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
    <TableContainer>
      <TableChakra variant="simple">
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column.field}>{column.header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {columns.map((column) => {
                const cellStyles = column.styles
                  ? column.styles(row[column.field])
                  : {}

                const cellContent =
                  column.modifier && typeof column.modifier === 'function'
                    ? column.modifier(row[column.field], row)
                    : row[column.field]

                return (
                  <Td
                    key={column.field}
                    px="6"
                    py="4"
                    fontWeight="medium"
                    whiteSpace="nowrap"
                    color="white"
                    style={cellStyles}
                  >
                    {cellContent}
                  </Td>
                )
              })}
            </Tr>
          ))}
        </Tbody>
      </TableChakra>
    </TableContainer>
  )
}

export default Table
