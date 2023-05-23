import React, { useContext, useEffect, useState } from 'react'
import { ListGroup } from 'flowbite-react'
import SingleChat from '@/components/SingleChat'


import Head from 'next/head'
import { PolybaseContext } from '@/context/PolybaseProvider'
import { AuthContext } from '@/context/AuthProvider'
import Placeholder from '@/components/Placeholder'


function Chat() {
  const {isAuthenticated} = useContext(AuthContext)
const {userRecordRef,chatCollectionReference,userCollectionReference} = useContext(PolybaseContext)

  const[allChats,setAllChats] = useState([]);
  

  const allRenderedChats = allChats.map(c=>{
    return(
      <SingleChat id = {c.id}/>
    )
  })

  useEffect(()=>{
    if(!isAuthenticated()){
      router.push("/")
  }
    userRecordRef.onSnapshot (
      (newDoc)=>{
        console.log(newDoc)
        const chats = newDoc.data.approvedChat
        // console.log(chats)
        
        setAllChats(chats)

      },
      (err)=>{
        console.log(err)
      }
    )
    
    
  })

  return (
    <>
    <Head>
      <title>Zapix-Chat</title>
      <meta name="description" content="Web3 Social App" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
<link rel="manifest" href="/site.webmanifest"></link>
    </Head>
    <main className='bg-white dark:bg-gray-900 min-h-screen p-8'>
      {/* <NavbarC/> */}
    <div className='lg:w-1/2 sm:w-full m-auto '>

    {!!allChats.length && <ListGroup className=''>
        {allRenderedChats}
        {/* <MessageComp/> */}
        {/* <ChatInput/> */}
    </ListGroup>}
    {!allChats.length && <Placeholder/>}
    </div>
    {/* <Footer/> */}
    </main>
    </>
      )
}

export default Chat