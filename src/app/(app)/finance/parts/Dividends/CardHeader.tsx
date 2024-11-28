import { CardHeader as CardHeaderChakra, Heading } from '@chakra-ui/react'
import { ArrowsCounterClockwise } from '@phosphor-icons/react'
import React from 'react'

export const CardHeader = ({
  refetchDividendsData
}: {
  refetchDividendsData: () => void
}) => {
  return (
    <CardHeaderChakra display="flex" justifyContent="space-between" pb={0}>
      <Heading color="white" size="md">
        Dividendos
      </Heading>
      <button
        type="button"
        onClick={() => refetchDividendsData()}
        className="hover:text-gray-400"
      >
        <ArrowsCounterClockwise
          size={20}
          color="#eee2e2"
          className="hover:opacity-75"
        />
      </button>
    </CardHeaderChakra>
  )
}
