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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
