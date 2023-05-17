import '@/styles/globals.css'
import NavbarC from '@/components/NavbarC'
import Head from 'next/head'
import { SessionProvider } from "next-auth/react"

export default function App({ Component,  pageProps: { session, ...pageProps }, }) {
  return(
    <>
    <Head>
      <title>Template App</title>
    </Head>

    {/* <ContextProvider> */}
    <SessionProvider session={session}>
      <div>
        {/* <Notifications /> */}
        <NavbarC/>

          <Component {...pageProps} />
          
      </div>
      </SessionProvider>
    {/* </ContextProvider> */}
  </>
  )
}
