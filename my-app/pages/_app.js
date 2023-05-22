import '@/styles/globals.css'
import NavbarC from '@/components/NavbarC'
import Head from 'next/head'
import { AuthProvider } from '@/context/AuthProvider'
import { PolybaseProvider } from '@/context/PolybaseProvider'
import Footer from '@/components/Footer'

export default function App({ Component,  pageProps }) {
  return(
    <>
    <Head>
    <title>Zapix</title>
        <meta name="description" content="Web3 Social App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
<link rel="manifest" href="/site.webmanifest"></link>
    </Head>


    <AuthProvider>
      <PolybaseProvider>
      <div>

        <NavbarC/>

        <Component {...pageProps} />
        <Footer/>
          
      </div>
      </PolybaseProvider>
      </AuthProvider>

  </>
  )
}
