import React, { useMemo } from 'react';
import useFetchExpensesData, { ExpenseData } from '../control/parts/hooks/useFetchExpensesData';
import { SideBar } from '@/components';
import { ResponsivePie } from '@nivo/pie';
import { useQuery } from '@tanstack/react-query';

interface SeparatedExpense {
 value: number;
 label: string;
}

const Statistics = () => {
 // const { expensesData = [] } = useFetchExpensesData()

 // const separateByType = useMemo((): SeparatedExpense[] => {
 //  const types = ["Essencial", "Não essencial", "Gasto livre"];
 //  const separatedArray = types.map((type) => {
 //   return {
 //    type: type,
 //    objects: expensesData.filter((obj) => obj.type === type),
 //   };
 //  });

 //  return separatedArray.map((typeObj) => {
 //   const totalValue = typeObj.objects.reduce((accumulator, obj) => {
 //    const value = parseFloat(obj.value || "0");
 //    return accumulator + value;
 //   }, 0);
 //   return {
 //    value: totalValue,
 //    label: typeObj.type,
 //    id: typeObj.type,
 //    color: "hsl(20, 70%, 50%)"
 //   };
 //  })
 // }, [])

 // const {
 //  data,
 // } = useQuery({
 //  queryKey: ["separate_by_type"],
 //  initialData: separateByType,
 //  keepPreviousData: true
 // });

 return (
  <SideBar>
   <div className='flex flex-col items-center h-[100vh] w-[100%]'>
    {/* <ResponsivePie
     data={separateByType}
     margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
     innerRadius={0.5}
     padAngle={0.7}
     cornerRadius={3}
     activeOuterRadiusOffset={8}
     borderWidth={1}
     borderColor={{
      from: 'color',
      modifiers: [
       [
        'darker',
        0.2
       ]
      ]
     }}
     arcLinkLabelsSkipAngle={10}
     arcLinkLabelsTextColor="#ffffff"
     arcLinkLabelsThickness={2}
     arcLinkLabelsColor={{ from: 'color' }}
     arcLabelsSkipAngle={10}
     arcLabelsTextColor={{
      from: 'color',
      modifiers: [
       [
        'darker',
        2
       ]
      ]
     }}
     defs={[
      {
       id: 'dots',
       type: 'patternDots',
       background: 'inherit',
       color: 'rgba(255, 255, 255, 0.3)',
       size: 4,
       padding: 1,
       stagger: true
      },
      {
       id: 'lines',
       type: 'patternLines',
       background: 'inherit',
       color: 'rgba(255, 255, 255, 0.3)',
       rotation: -45,
       lineWidth: 6,
       spacing: 10
      }
     ]}
     fill={[
      { match: { id: 'ruby' }, id: 'dots' },
      { match: { id: 'c' }, id: 'dots' },
      { match: { id: 'go' }, id: 'dots' },
      { match: { id: 'python' }, id: 'dots' },
      { match: { id: 'scala' }, id: 'lines' },
      { match: { id: 'lisp' }, id: 'lines' },
      { match: { id: 'elixir' }, id: 'lines' },
      { match: { id: 'javascript' }, id: 'lines' }
     ]}
     legends={[
      {
       anchor: 'bottom',
       direction: 'row',
       justify: false,
       translateX: 0,
       translateY: 56,
       itemsSpacing: 0,
       itemWidth: 100,
       itemHeight: 18,
       itemTextColor: '#999',
       itemDirection: 'left-to-right',
       itemOpacity: 1,
       symbolSize: 18,
       symbolShape: 'circle',
       effects: [
        {
         on: 'hover',
         style: {
          itemTextColor: '#000'
         }
        }
       ]
      }
     ]}
    /> */}
   </div>
  </SideBar>
 );
}

export default Statistics;