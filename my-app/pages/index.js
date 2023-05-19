import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import NavbarC from '@/components/NavbarC'
import AddPost from '@/components/AddPost'
import PostCard from '@/components/PostCard'
import PostPage from '@/components/PostPage'
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=' bg-white dark:bg-primary min-h-screen '>
          
          <div>
            This is Home Page
          </div>
          <div>
            <Link href={"/Explore"}>navigate</Link>
          </div>
          
          {/* <AddPost/> */}
          {/* <ToastC/> */}
          {/* <ToastC/> */}
          {/* <PostCard/> */}
          {/* <PostPage/> */}

        
      </main>

    </>
  )
}
