import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import NavbarC from '@/components/NavbarC'
import AddPost from '@/components/AddPost'
import PostCard from '@/components/PostCard'

import Footer from '@/components/Footer'
import ToastC from '@/components/ToastC'
import Link from 'next/link'
// import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>App Name</title>
        <meta name="description" content="Web3 Social App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
<link rel="manifest" href="/site.webmanifest"></link>
      </Head>
      <main className=' bg-white dark:bg-primary min-h-screen p-8 '>
          
          {/* <div>
            This is Home Page
          </div>
          <div>
            <Link href={"/LightUp"}>navigate</Link>
          </div> */}
          
          {/* <AddPost/> */}
          {/* <ToastC/> */}
          <ToastC/>
          {/* <PostCard/> */}
          {/* <PostPage/> */}

        
      </main>

    </>
  )
}
