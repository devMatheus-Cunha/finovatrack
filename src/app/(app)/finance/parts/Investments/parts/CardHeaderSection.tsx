import React from 'react'
import { CardHeader, Heading } from '@chakra-ui/react'
import { ArrowsCounterClockwise } from '@phosphor-icons/react'

interface CardHeaderSectionProps {
  onRefetch: () => void
}

const CardHeaderSection = ({ onRefetch }: CardHeaderSectionProps) => (
  <CardHeader display="flex" justifyContent="space-between" pb={0}>
    <Heading size="md">Investimenos Tranding 212</Heading>
    <button type="button" onClick={onRefetch} className="hover:text-gray-400">
      <ArrowsCounterClockwise
        size={20}
        color="#eee2e2"
        className="hover:opacity-75"
      />
    </button>
  </CardHeader>
)

export default CardHeaderSection
