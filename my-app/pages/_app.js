import '@/styles/globals.css'
import NavbarC from '@/components/NavbarC'
import Head from 'next/head'
import { AuthProvider } from '@/context/AuthProvider'

export default function App({ Component,  pageProps }) {
  return(
    <>
    <Head>
      <title>Template App</title>
    </Head>

    {/* <ContextProvider> */}
    <AuthProvider>
      <div>
        {/* <Notifications /> */}
        <NavbarC/>

          <Component {...pageProps} />
          
      </div>
      </AuthProvider>
    {/* </ContextProvider> */}
  </>
  )
}
