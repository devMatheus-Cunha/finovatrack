'use client'

import { Spinner } from '@chakra-ui/react'
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
        <div className="flex h-screen w-full items-center justify-center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="cyan.500"
            size="xl"
          />
        </div>
      ) : (
        { children }
      )}
    </>
  )
}
export default Loading
