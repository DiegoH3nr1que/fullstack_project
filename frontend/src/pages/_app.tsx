// pages/_app.tsx
import '../styles/globals.css';
import '../styles/styles.css'
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head><title>{'Save Point'}</title>
        <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
