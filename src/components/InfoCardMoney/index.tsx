import React, { ReactNode } from 'react'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { Box, HStack, Icon, Spacer, Text } from '@chakra-ui/react'

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
  return (
    <Box
      height={{ base: '80px', md: '99px' }}
      width={{ base: '45%', lg: '100%' }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      paddingLeft={4}
      color="white"
      bg="gray.700"
      rounded="lg"
    >
      <HStack spacing={1} marginBottom={1} alignItems="center">
        <Text fontSize={{ base: '11px', md: 'ms' }}>{title}</Text>{' '}
        {infoAction && (
          <Icon
            as={InfoOutlineIcon}
            color="blue.400"
            cursor="pointer"
            onClick={infoAction}
            boxSize={4}
          />
        )}
        <Spacer />
      </HStack>
      <Text
        marginTop={-1}
        fontSize={{ base: 'md', md: '2xl' }}
        fontWeight="semibold"
      >
        {infoData}
      </Text>
      <Text fontSize={{ base: '12px', md: 'ms' }} marginTop={1}>
        {contentAction && contentAction}
      </Text>
    </Box>
  )
}

export default InfoCardMoney

InfoCardMoney
