'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GlobalLoading from './components/GlobalLoading'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import '@fancyapps/ui/dist/fancybox/fancybox.css'

export default function Providers({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  )

  // useEffect(() => {
  //   let Fancybox

  //   import('@fancyapps/ui').then((module) => {
  //     Fancybox = module.Fancybox

  //     Fancybox.bind("[data-fancybox='gallery']", {})

  //     return () => {
  //       Fancybox?.destroy()
  //     }
  //   })
  // }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer position="top-right" />
      <GlobalLoading />
      {children}
    </QueryClientProvider>
  )
}
