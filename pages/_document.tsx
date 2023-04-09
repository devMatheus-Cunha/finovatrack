import { Html, Head, Main, NextScript } from 'next/document'
import SideBar from '@/templates/SideBar'

export default function Document() {

  return (
    <Html lang="en">
      <Head />
      <body>
        <SideBar>
          <Main />
        </SideBar>
        <NextScript />
      </body>
    </Html>
  )
}
