import React, { ReactNode } from 'react'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { Box, HStack, Icon, Skeleton, Spacer, Text } from '@chakra-ui/react'
import { formatCurrencyMoney } from '@/utils/formatNumber'

interface InfoCardProps {
  infoData: any
  infoAction?: () => void
  title: string
  contentAction?: ReactNode
  currency: any
  isVisibilityData: boolean
}

function InfoCardMoney({
  infoData,
  title,
  contentAction,
  infoAction,
  isVisibilityData,
  currency
}: InfoCardProps) {
  console.log(infoData)
  return (
    <>
      {infoData ? (
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
            {formatCurrencyMoney(infoData, currency, isVisibilityData)}
          </Text>
          <Text fontSize={{ base: '12px', md: 'ms' }} marginTop={1}>
            {contentAction && contentAction}
          </Text>
        </Box>
      ) : (
        <Skeleton
          height={{ base: '80px', md: '99px' }}
          width={{ base: '45%', lg: '100%' }}
          rounded="lg"
        />
      )}
    </>
  )
}

export default InfoCardMoney

InfoCardMoney
