'use client'

import React, { useEffect } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'
import '../../styles/globals.css'

import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify'
import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react'

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          cacheTime: 1000 * 60 * 10, // cache data for 10 minutes
          staleTime: 1000 * 60 * 5, // consider data stale after 5 minutes
          refetchOnMount: true, // refetch data when component first mounts
          retry: false, // Disable automatic refetch attempts
          keepPreviousData: true
        }
      }
    })
  )

  const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false
  }

  const theme = extendTheme({ config })

  useEffect(() => {
    import('preline')
  }, [])

  return (
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>
        <ThemeProvider attribute="class">
          {children}
          <ToastContainer theme="dark" />
        </ThemeProvider>
      </ChakraProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Providers
