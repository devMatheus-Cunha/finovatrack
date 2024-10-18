'use client'

import React from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'

import { ToastContainer } from 'react-toastify'
import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'

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

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider>
        <ChakraProvider theme={theme}>
          {children}
          <ToastContainer theme="dark" />
        </ChakraProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Providers
