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

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

export const theme = extendTheme({ config })

function Providers({ children }: React.PropsWithChildren) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
        refetchOnMount: true,
        retry: false
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </ThemeProvider>
      <ToastContainer theme="dark" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Providers
