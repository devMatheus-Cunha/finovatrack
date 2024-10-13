import React, { ReactNode } from 'react'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
  Box,
  Icon,
  Skeleton,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { formatCurrencyMoney } from '@/utils/formatNumber'

interface InfoCardProps {
  infoData: any
  infoAction?: () => void
  actionCard?: () => void
  title: string
  contentAction?: ReactNode
  currency: any
  icon: any
  iconColor: string
  isVisibilityData: boolean
}

function InfoCardMoney({
  infoData,
  title,
  contentAction,
  infoAction,
  isVisibilityData,
  currency,
  icon,
  iconColor,
  actionCard
}: InfoCardProps) {
  const bgColor = useColorModeValue('gray.100', 'gray.700')

  return (
    <>
      {infoData ? (
        <Box
          display="flex"
          w="full"
          alignItems="center"
          bg={bgColor}
          borderRadius="md"
          py={5}
          px={{ base: 2, lg: 4 }}
          onClick={actionCard && actionCard}
          cursor={contentAction ? 'pointer' : ''}
        >
          <Stat>
            <StatLabel
              fontSize="xs"
              color="gray.500"
              alignItems="center"
              display="flex"
            >
              {title}
              {contentAction && contentAction}
              {infoAction && (
                <Icon
                  as={InfoOutlineIcon}
                  color="cyan"
                  cursor="pointer"
                  onClick={infoAction}
                  marginLeft={1}
                />
              )}
            </StatLabel>
            <StatNumber display="flex" alignItems="center">
              <Text
                fontSize={{ base: 'lg', lg: '23' }}
                fontWeight="bold"
                marginRight={1}
              >
                {formatCurrencyMoney(infoData, currency, isVisibilityData)}
              </Text>
            </StatNumber>
          </Stat>
          <Icon
            as={icon}
            boxSize={{ base: 7, md: 8, lg: 10 }}
            color={iconColor}
          />
        </Box>
      ) : (
        <Skeleton
          height={{ base: '80px', md: '84.5px' }}
          w="full"
          rounded="lg"
        />
      )}
    </>
  )
}

export default InfoCardMoney
