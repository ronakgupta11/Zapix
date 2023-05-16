import '@/styles/globals.css'
import NavbarC from '@/components/NavbarC'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return(
    <>
    <Head>
      <title>Template App</title>
    </Head>

    {/* <ContextProvider> */}
      <div className="">
        {/* <Notifications /> */}
        <NavbarC/>

          <Component {...pageProps} />
          
      </div>
    {/* </ContextProvider> */}
  </>
  )
}
