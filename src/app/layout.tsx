/* eslint-disable @next/next/inline-script-id */

'use client'

import '../styles/globals.css'
import '@mantine/core/styles.css'
import 'react-toastify/dist/ReactToastify.css'

import Providers from '@/utils/reactQuery/provider'
import React, { useEffect } from 'react'
import { ChakraProvider, ThemeConfig, extendTheme } from '@chakra-ui/react'

import 'react-datepicker/dist/react-datepicker.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import Script from 'next/script'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false
  }

  const theme = extendTheme({ config })

  useEffect(() => {
    import('preline')
  }, [])
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-L8G3KWJZDF"
        />
        <Script src="./node_modules/preline/dist/preline.js" />
        <Script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-L8G3KWJZDF')
              `
          }}
        />
      </head>

      <body suppressHydrationWarning>
        <Providers>
          <MantineProvider forceColorScheme="dark">
            <ChakraProvider theme={theme}>
              <ThemeProvider attribute="class">
                <div>{children}</div>
                <ToastContainer theme="dark" />
              </ThemeProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </ChakraProvider>
          </MantineProvider>
        </Providers>
      </body>
    </html>
  )
}
