import React, { ReactComponentElement } from 'react';
import { Table, TableHeadCellProps, TableHeadProps } from 'flowbite-react';


export interface ColumsHeadProps extends TableHeadCellProps {
 field: string
 header: string
}

export interface ITableHeadProps {
 headprops?: TableHeadProps
 columsHeadProps: ColumsHeadProps[]
}

const TableHead = ({ columsHeadProps, headprops }: ITableHeadProps) => {
 return (
  <Table.Head {...headprops}>
   {columsHeadProps.map((props) => (
    <Table.HeadCell key={props.field} {...props}>
     {props.header}
    </Table.HeadCell>
   ))}
  </Table.Head>
 );
}

export default TableHead;