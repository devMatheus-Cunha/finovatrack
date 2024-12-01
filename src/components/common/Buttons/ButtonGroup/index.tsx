'use client'

import React, { ReactNode } from 'react'
import { Button, HStack, useColorModeValue } from '@chakra-ui/react'

interface ButtonOption {
  onClick: () => void
  content: ReactNode
}

interface ButtonGroupProps {
  buttonOptions: ButtonOption[]
}

function ButtonGroup({ buttonOptions }: ButtonGroupProps) {
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const hoverBorderColor = useColorModeValue('gray.400', 'gray.600')
  const textColor = useColorModeValue('gray.500', 'white')

  return (
    <HStack>
      {buttonOptions?.map((item, index) => (
        <Button
          key={index}
          onClick={item?.onClick}
          variant="outline"
          p={0}
          borderColor={borderColor}
          _hover={{
            borderColor: hoverBorderColor,
            textDecoration: 'none',
            bg: 'transparent'
          }}
          color={textColor}
        >
          {item?.content}
        </Button>
      ))}
    </HStack>
  )
}

export default ButtonGroup
