import React from 'react'
import {
  AccordionButton as AccordionButtonChakra,
  AccordionIcon,
  Text
} from '@chakra-ui/react'

const AccordionButton: React.FC<{
  year: string
}> = ({ year }) => {
  return (
    <AccordionButtonChakra>
      <Text flex="1" textAlign="left" fontWeight="bold" fontSize="larger">
        {`Finanças ${year}`}
      </Text>
      <AccordionIcon />
    </AccordionButtonChakra>
  )
}

export default AccordionButton
