import { Heading, VStack, Text } from '@chakra-ui/react'
import React from 'react'

const EmptyWithoutReport: React.FC = () => {
  return (
    <VStack
      alignItems="center"
      justifyContent="center"
      overflowY="auto"
      borderRadius="lg"
      h={{ base: 'auto', md: '45vh' }}
      w={{ base: '100%', lg: '2xl' }}
      p={{ base: '4', lg: '0' }}
      bg="gray.700"
    >
      <Heading
        mt={4}
        fontSize={{ base: 'xl', lg: 26 }}
        fontWeight="bold"
        color="white"
      >
        Nenhum relatório gerado
      </Heading>
      <Text mt={2} fontSize={{ base: 'sm', lg: 'md' }} color="gray.300">
        Não há dados disponíveis para este período.
      </Text>
    </VStack>
  )
}

export default EmptyWithoutReport
