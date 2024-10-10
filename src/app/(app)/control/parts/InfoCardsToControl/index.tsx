'use client'

import { InfoCardMoney } from '@/components'
import React from 'react'
import { UserData } from '@/hooks/auth/useAuth/types'

import { IEntrysData } from '@/hooks/entrys/useFetchEntrysData'
import { useIsVisibilityDatas } from '@/hooks/globalStates'
import { Box } from '@chakra-ui/react'

interface IInfoCardsToControl {
  userData: UserData
  totalEntrys: number
  entrysData: IEntrysData[]
  totalExpensesEurToReal: number
  totalExpensesEurSumRealToReal: number
  infoAction?: () => void
  onOpenTotalEntrys: any
}

function InfoCardsToControl({
  userData,
  totalEntrys,
  entrysData,
  totalExpensesEurToReal,
  totalExpensesEurSumRealToReal,
  infoAction,
  onOpenTotalEntrys
}: IInfoCardsToControl) {
  const { isVisibilityData } = useIsVisibilityDatas()
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      gap={6}
      sx={{
        '@media (min-width: 1024px)': {
          flexWrap: 'nowrap'
        }
      }}
    >
      <InfoCardMoney
        infoData={totalEntrys}
        title="Total Entradas"
        currency={userData.primary_currency}
        isVisibilityData={isVisibilityData}
        contentAction={
          <>
            {entrysData?.length > 0 && (
              <button
                onClick={() => onOpenTotalEntrys()}
                className={'text-xs italic  hover:text-gray-400 text-gray-300'}
              >
                Visualizar
              </button>
            )}
          </>
        }
      />
      {userData.typeAccount === 'hybrid' && (
        <InfoCardMoney
          infoData={totalExpensesEurToReal}
          infoAction={infoAction}
          isVisibilityData={isVisibilityData}
          currency={userData.secondary_currency}
          title={`Total Gastos ${userData.secondary_currency}`}
        />
      )}
      <InfoCardMoney
        infoData={totalExpensesEurSumRealToReal}
        title="Total Gastos"
        isVisibilityData={isVisibilityData}
        currency={userData.primary_currency}
      />
      <InfoCardMoney
        infoData={totalEntrys - totalExpensesEurSumRealToReal}
        currency={userData.primary_currency}
        title="Total Livre"
        isVisibilityData={isVisibilityData}
      />
    </Box>
  )
}

export default InfoCardsToControl
