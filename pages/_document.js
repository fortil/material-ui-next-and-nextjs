import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import JssProvider from 'react-jss/lib/JssProvider';
import flush from 'styled-jsx/server';
import getPageContext from '../src/getPageContext';

class MyDocument extends Document {
  render() {
    const { pageContext } = this.props;

    return (
      <html lang="es" dir="ltr">
        <Head>
          <title>SURGAS</title>
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content={
              'user-scalable=0, initial-scale=1, ' +
              'minimum-scale=1, width=device-width, height=device-height'
            }
          />
          <link rel="manifest" href="static/manifest.json" />
          <link rel="icon" href={'static/favicono.png'} sizes="16x16" type="image/png" />
          {/* PWA primary color */}
          <meta name="theme-color" content={pageContext.theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <style>{`* {font-family: Roboto}, body {background-color: white !important}`}</style>
          {/* <script type="text/javascript">
            window.$zopim||(function(d,s){ z=$zopim=function(c) {
              z._.push(c)
            }, $=z.s=d.createElement(s),e=d.getElementsByTagName(s)[0];
              z.set=function(o){z.set._.push(o)};z._=[];z.set._=[];$.async=!0; $.setAttribute('charset','utf-8');
          $.src='https://v2.zopim.com/?5l6Adv74e7GKKsDdVIWiS6hWGS9hA6br';z.t=+new Date;$.
          type='text/javascript';e.parentNode.insertBefore($,e)})(document,'script');
          </script> */}
          <script type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
               window.$zopim||(function(d,s){var z=$zopim=function(c){
              z._.push(c)},$=z.s=
              d.createElement(s),e=d.getElementsByTagName(s)[0];z.set=function(o){z.set.
              _.push(o)};z._=[];z.set._=[];$.async=!0;$.setAttribute('charset','utf-8');
              $.src='https://v2.zopim.com/?5l6Adv74e7GKKsDdVIWiS6hWGS9hA6br';z.t=+new Date;$.
              type='text/javascript';e.parentNode.insertBefore($,e)})(document,'script');
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = ctx => {
  // Resolution order
  //
  // On the server:
  // 1. page.getInitialProps
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the server with error:
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. page.getInitialProps
  // 3. page.render

  // Get the context of the page to collected side effects.
  const pageContext = getPageContext();
  const page = ctx.renderPage(Component => props => (
    <JssProvider
      registry={pageContext.sheetsRegistry}
      generateClassName={pageContext.generateClassName}
    >
      <Component pageContext={pageContext} {...props} />
    </JssProvider>
  ));

  return {
    ...page,
    pageContext,
    styles: (
      <React.Fragment>
        <style
          id="jss-server-side"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
        />
        {flush() || null}
      </React.Fragment>
    ),
  };
};

export default MyDocument;
