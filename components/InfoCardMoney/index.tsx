import React from 'react';

interface InfoCardProps {
 infoData: number
 title: string
}

const InfoCardMoney = ({ infoData, title }: InfoCardProps) => {
 return (
  <div className="w-[20%] h-[10vh]  bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center  px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
   <div className="text-left">
    <div className="mb-1 text-xs">{title}</div>
    <div className="-mt-1 font-sans text-2xl font-semibold">{`R$ ${infoData}`}</div>
   </div>
  </div>
 );
}

export default InfoCardMoney;