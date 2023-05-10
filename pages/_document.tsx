/* eslint-disable react/no-danger */
import {
  Html, Head, Main, NextScript,
} from 'next/document';

function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-L8G3KWJZDF"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-L8G3KWJZDF')
              `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.ssr = false;

export default Document;
