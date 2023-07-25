/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/require-default-props */

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
  infoAction,
}: InfoCardProps) {
  const { isVisibilityData } = useIsVisibilityDatas()

  return (
    <>
      <div className="h-[99px] w-[100%] flex pl-4 justify-center flex-col text-white bg-gray-800 rounded-lg">
        <div className="text-left">
          <div className="flex gap-0.5 mb-1 items-center">
            <p className="text-xs">{title}</p>
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
          <div className="-mt-1 font-sans text-2xl font-semibold">
            {infoData && isVisibilityData ? infoData : '****'}
          </div>
          <div>{contentAction && contentAction}</div>
        </div>
      </div>
    </>
  )
}

export default InfoCardMoney
