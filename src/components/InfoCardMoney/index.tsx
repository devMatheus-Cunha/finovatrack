'use client'

import React, { ReactNode } from 'react'
import { useIsVisibilityDatas } from '@/hooks/globalStates'
import { Info } from '@phosphor-icons/react'

interface InfoCardProps {
  infoData: string
  infoAction?: () => void
  title: string
  contentAction?: ReactNode
}

function InfoCardMoney({
  infoData,
  title,
  contentAction,
  infoAction
}: InfoCardProps) {
  const { isVisibilityData } = useIsVisibilityDatas()

  return (
    <>
      <div className="h-[80px] md:h-[99px] w-[45%] lg:w-[100%] flex pl-4 justify-center flex-col text-white bg-gray-800 rounded-lg">
        <div className="flex gap-0.5 mb-1 items-center">
          <p className="text-[11px] md:text-ms">{title}</p>
          {infoAction && (
            <div className="-translate-y-1.5">
              <Info
                size={16}
                color="#0891b2"
                className="cursor-pointer"
                onClick={infoAction}
              />
            </div>
          )}
        </div>
        <div className="-mt-1 font-sans text-md md:text-2xl font-semibold">
          {infoData && isVisibilityData ? infoData : '****'}
        </div>
        <div className="text-[12px] md:text-ms">
          {contentAction && contentAction}
        </div>
      </div>
    </>
  )
}

export default InfoCardMoney
