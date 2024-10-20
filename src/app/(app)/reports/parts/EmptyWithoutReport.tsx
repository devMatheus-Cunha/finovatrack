import { Heading, VStack, Text } from '@chakra-ui/react'
import React from 'react'

const EmptyWithoutReport: React.FC = () => {
  return (
    <VStack
      h="full"
      alignItems="center"
      justifyContent="center"
      overflowY="auto"
      minH={{ base: 'auto', md: '62vh' }}
      borderRadius={{ sm: 'lg' }}
      w="100%"
      bg={{ lg: 'gray.700' }}
    >
      <Heading
        mt={4}
        size={{ base: 'md', md: 'xl' }}
        fontWeight="bold"
        color="white"
      >
        Nenhum relatório gerado
      </Heading>
      <Text mt={2} fontSize="md" color="gray.300">
        Não há dados disponíveis para este período.
      </Text>
    </VStack>
  )
}

export default EmptyWithoutReport
