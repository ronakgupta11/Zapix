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
      <title>Template App</title>
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
