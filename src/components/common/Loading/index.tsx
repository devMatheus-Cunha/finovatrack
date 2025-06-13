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
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-blue-500 animate-spin animation-delay-150"></div>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  )
}
export default Loading
