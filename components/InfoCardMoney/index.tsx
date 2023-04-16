import React, { ReactNode } from 'react';

interface InfoCardProps {
 infoData: string
 title: string
 contentAction?: ReactNode
}

const InfoCardMoney = ({ infoData, title, contentAction }: InfoCardProps) => {
 return (
  <div className="w-[25%] h-[10vh] focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center  px-4 py-2.5 dark:bg-gray-700  dark:focus:ring-gray-700">
   <div className="text-left">
    <div className="mb-1 text-xs">{title}</div>
    <div className="-mt-1 font-sans text-2xl font-semibold">{infoData}</div>
    <div>
     {
      contentAction && contentAction
     }
    </div>
   </div>
  </div>
 );
}

export default InfoCardMoney;