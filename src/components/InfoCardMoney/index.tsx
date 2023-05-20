/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/require-default-props */

'use client';

import React, { ReactNode } from 'react';
import { useIsVisibilityDatas } from '@/hooks/globalStates';

interface InfoCardProps {
 infoData: string
 title: string
 contentAction?: ReactNode
}

function InfoCardMoney({ infoData, title, contentAction }: InfoCardProps) {
  const { isVisibilityData } = useIsVisibilityDatas();
  return (
    <div className="w-[25%] h-[11vh] focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center  px-4 py-2.5 bg-gray-800 focus:ring-gray-700">
      <div className="text-left">
        <div className="mb-1 text-xs">{title}</div>
        <div className="-mt-1 font-sans text-2xl font-semibold">
          {
     infoData && isVisibilityData ? infoData : '****'
    }
        </div>
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
