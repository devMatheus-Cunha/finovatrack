import { SideBar } from '@/components';
import React from 'react';
import { ResponsiveContainer, PieChart, Pie } from 'recharts';
import useFetchExpensesData from '../control/parts/hooks/useFetchExpensesData';


const Statistics = () => {
 const { expensesData = [] } = useFetchExpensesData()


 function separarPorTipo(arr: any) {
  const tipos = ["Essencial", "Não essencial", "Gasto Livre"];
  const resultado: any = {};

  tipos.forEach((tipo) => {
   resultado[tipo] = arr.filter((obj: any) => obj.type === tipo);
  });
  return resultado
 }

 console.log(separarPorTipo(expensesData))


 const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
 ];
 const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
 ];
 return (
  <SideBar>
   <div className='flex flex-col items-center h-[100vh] w-[100%]'>
    <ResponsiveContainer width="100%" height="100%">
     <PieChart width={400} height={400}>
      <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
     </PieChart>
    </ResponsiveContainer>
   </div>
  </SideBar>
 );
}

export default Statistics;