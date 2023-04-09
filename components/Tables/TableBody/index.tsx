import React, { ReactComponentElement } from 'react';
import { Table, TableRowProps, TableBodyProps } from 'flowbite-react';


export interface ColumsBodyProps extends TableRowProps {
 header: string
}

export interface ITableBodyProps {
 bodyprops?: TableBodyProps
 columsBodyProps: any[]
 data: any
}

const TableBody = ({ columsBodyProps, bodyprops, data }: ITableBodyProps) => {


 const newData = data.map((item: any) => {
  const obj: { [key: string]: any } = {};
  columsBodyProps.forEach((prop) => {
   const field: any = prop.field;
   obj[field] = item[field];
  });
  return obj;
 });


 return (
  <Table.Body {...bodyprops}>
   <Table>
    <Table.Body>
     {newData?.map((props: any, index: number) => (
      <React.Fragment key={index}>
       {Object.keys(props).map((key) => (
        <Table.Row key={key}>
         <Table.Cell className="whitespace-nowrap font-medium text-white">
          {props[key]}
         </Table.Cell>
        </Table.Row>
       ))}
      </React.Fragment>
     ))}
    </Table.Body>
   </Table>
  </Table.Body >
 );
}

export default TableBody;