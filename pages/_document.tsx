import { Sidebar } from 'flowbite-react'
import { Html, Head, Main, NextScript } from 'next/document'
import SideBar from '@/templates/sideBar'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div className='bg-gray-900'>
          <SideBar>
            <Main />
          </SideBar>
          <NextScript />
        </div>
      </body>
    </Html>
  )
}
