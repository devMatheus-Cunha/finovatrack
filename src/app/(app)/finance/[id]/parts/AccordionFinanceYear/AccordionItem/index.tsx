import React, { ReactNode } from 'react'

import { AccordionItem as ChakraAccordionItem } from '@chakra-ui/react'

interface AccordionItemProps {
  children: ReactNode
}

const AccordionItem: React.FC<AccordionItemProps> = ({ children }) => {
  return <ChakraAccordionItem>{children}</ChakraAccordionItem>
}

export default AccordionItem
