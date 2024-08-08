import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'

export type StatusRequestProps = 'idle' | 'error' | 'loading' | 'success'

interface LoadingProps {
  children: React.ReactNode
  loading?: boolean
}

function Loading({ children, loading }: LoadingProps) {
  return (
    <>
      {loading ? (
        <Flex height="100vh" width="100%" align="center" justify="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="cyan.500"
            size="xl"
          />
        </Flex>
      ) : (
        { children }
      )}
    </>
  )
}
export default Loading
