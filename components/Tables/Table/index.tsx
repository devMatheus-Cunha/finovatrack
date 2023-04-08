import React from 'react';
import { Table as TableFlowBite, TableProps } from 'flowbite-react'
import TableHead, { ColumsHeadProps, ITableHeadProps } from '../TableHead';
import TableBody, { ColumsBodyProps, ITableBodyProps } from '../TableBody';


interface ITableProps extends TableProps {
 columsHeadProps: ColumsHeadProps[]
 columsBodyProps: any
 data: any
}

const Table = ({ columsHeadProps, columsBodyProps, data, ...props }: ITableProps) => {
 return (
  <TableFlowBite {...props}>
   <TableHead columsHeadProps={columsHeadProps} {...props} />
   <TableBody columsBodyProps={columsBodyProps} data={data} />
  </TableFlowBite>
 );
}

export default Table;