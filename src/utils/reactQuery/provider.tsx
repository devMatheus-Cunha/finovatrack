'use client'

import React from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          cacheTime: 1000 * 60 * 10, // cache data for 10 minutes
          staleTime: 1000 * 60 * 5, // consider data stale after 5 minutes
          // refetchInterval: 1000 * 60 * 15, // refetch data every 15 minutes
          refetchOnMount: true, // refetch data when component first mounts
          retry: false, // Disable automatic refetch attempts
          keepPreviousData: true,
        },
      },
    }),
  )

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Providers
