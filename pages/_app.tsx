import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'flowbite/dist/flowbite.css';
import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';


export default function App({ Component, pageProps }: AppProps) {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: 1000 * 60 * 10, // cache data for 10 minutes
        staleTime: 1000 * 60 * 5, // consider data stale after 5 minutes
        // refetchInterval: 1000 * 60 * 15, // refetch data every 15 minutes
        refetchOnMount: true, // refetch data when component first mounts
        retry: false, // Disable automatic refetch attempts
        keepPreviousData: true
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
        <ToastContainer theme='dark' />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider >
  )
}
