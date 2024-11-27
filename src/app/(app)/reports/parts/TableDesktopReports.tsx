import { ShowAndHide } from '@/components'
import { ExpenseData } from '@/services/expenses/getExpenses'
import React from 'react'
import Table, { TableColumn } from '@/components/Table'
import { UserData } from '@/hooks/entrys/useDeletedEntry/auth/useAuth/types'

interface ITableReportsProps {
  data: ExpenseData[]
  colums: TableColumn[]
  userData: UserData
  isVisibilityData: boolean
}

const TableReports: React.FC<ITableReportsProps> = ({ data, colums }) => {
  return (
    <ShowAndHide displayLg="initial" displayBase="none">
      <Table columns={colums} data={data} />
    </ShowAndHide>
  )
}

export default TableReports
