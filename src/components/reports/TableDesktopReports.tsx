import { ShowAndHide } from '@/components'
import { ExpenseData } from '@/services/expenses/getExpenses'
import React from 'react'
import { UserData } from '@/hooks/entrys/useDeletedEntry/auth/useAuth/types'
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { TableColumn, TableRow } from '../common/Table'

interface ITableReportsProps {
  data: ExpenseData[]
  columns: TableColumn[]
  userData: UserData
  isVisibilityData: boolean
}

const TableReports: React.FC<ITableReportsProps> = ({ data, columns }) => {
  return (
    <ShowAndHide displayLg="initial" displayBase="none">
      <TableContainer
        bg={{ lg: 'gray.700' }}
        h="45vh"
        rounded="md"
        overflowY="auto"
        w="2xl"
      >
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              {columns.map((column) => (
                <Th key={column.field}>{column.header}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row: TableRow, rowIndex) => (
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
        </Table>
      </TableContainer>
    </ShowAndHide>
  )
}

export default TableReports
