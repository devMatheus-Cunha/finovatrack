/* eslint-disable react/no-danger */

'use client';

import '../styles/globals.css';
import 'flowbite/dist/flowbite.css';
import 'react-toastify/dist/ReactToastify.css';

import Providers from '@/utils/reactQuery/provider';
import React from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
      <body
        suppressHydrationWarning
      >
        <Providers>
          <ThemeProvider attribute="class">
            {children}
            <ToastContainer theme="dark" />
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
      </body>
    </html>
  );
}
