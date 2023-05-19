import '@/styles/globals.css'
import NavbarC from '@/components/NavbarC'
import Head from 'next/head'
import { AuthProvider } from '@/context/AuthProvider'
import { PolybaseProvider } from '@/context/PolybaseProvider'

export default function App({ Component,  pageProps }) {
  return(
    <>
    <Head>
      <title>Template App</title>
    </Head>

    {/* <ContextProvider> */}
    <AuthProvider>
      <PolybaseProvider>
      <div>
        {/* <Notifications /> */}
        <NavbarC/>

          <Component {...pageProps} />
          
      </div>
      </PolybaseProvider>
      </AuthProvider>
    {/* </ContextProvider> */}
  </>
  )
}
