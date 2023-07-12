/* eslint-disable @next/next/inline-script-id */
/* eslint-disable react/no-danger */

'use client'

import '../styles/globals.css'
import 'flowbite/dist/flowbite.css'
import 'react-toastify/dist/ReactToastify.css'

import Providers from '@/utils/reactQuery/provider'
import React from 'react'

import 'react-datepicker/dist/react-datepicker.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify'
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-L8G3KWJZDF"
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-L8G3KWJZDF')
              `,
        }}
      />
      <body suppressHydrationWarning>
        <Providers>
          <ThemeProvider attribute="class">
            <div className="hidden md:block">{children}</div>
            <div className=" md:hidden flex flex-col gap-4 justify-center items-center h-screen text-center p-4">
              <h1 className="text-4xl text-red-600 italic font-bold">
                Atenção!
              </h1>
              <p>
                Estamos trabalhando para lançar em breve uma versão mobile do
                nosso sistema, permitindo que você acesse facilmente todas as
                funcionalidades pelo seu smartphone, mesmo quando estiver em
                movimento.
              </p>
              <p className="italic text-gray-300 font-bold text-sm">
                Aproveite todos os benefícios da nossa plataforma gratuitamente
                acessando-a em um laptop ou tablet.
              </p>
            </div>

            <ToastContainer theme="dark" />
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
      </body>
    </html>
  )
}
