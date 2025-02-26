'use client'

import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface ShowAndHideProps {
  children: ReactNode
  displayLg?: 'initial' | 'none'
  displayBase?: 'initial' | 'none'
}

const ShowAndHide: React.FC<ShowAndHideProps> = ({
  children,
  displayLg = 'initial',
  displayBase = 'none'
}) => {
  return <Box display={{ base: displayBase, lg: displayLg }}>{children}</Box>
}

export default ShowAndHide
