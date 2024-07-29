import Providers from '@/utils/reactQuery/provider'
import { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'FinovaTrack - Home',
  description:
    'Domine suas finanças em várias moedas. Registre, edite e acompanhe suas informações financeiras de forma simples e eficiente. Adicione e edite seus gastos facilmente. Cálculo automático de entradas, gastos e saldo. Registre suas entradas de valor. Salve relatórios completos dos seus gastos. Controle de múltiplas moedas: Defina a moeda principal da sua conta para a conversão automática de valores.',
  keywords: [
    'finanças',
    'moedas',
    'controle financeiro',
    'gastos',
    'entradas',
    'saldo'
  ],
  authors: {
    name: 'Matheus Cunha',
    url: 'https://www.linkedin.com/in/devmatheusgr/'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
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

                gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_CODE})
              `
          }}
        />
      </head>

      <body suppressHydrationWarning>
        <Providers>
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  )
}
