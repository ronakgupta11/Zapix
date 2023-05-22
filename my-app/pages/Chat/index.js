import React, { useContext, useEffect, useState } from 'react'
import { ListGroup } from 'flowbite-react'
import SingleChat from '@/components/SingleChat'
import ChatInput from '@/components/ChatInput'
import MessageComp from '@/components/MessageComp'

import Head from 'next/head'
import { PolybaseContext } from '@/context/PolybaseProvider'
import { AuthContext } from '@/context/AuthProvider'


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
      <title>App Name - Chat</title>
      <meta name="description" content="Web3 Social App" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className='bg-white dark:bg-primary min-h-screen p-8'>
      {/* <NavbarC/> */}
    <div className='lg:w-1/2 sm:w-full m-auto '>

    <ListGroup className=''>
        {allRenderedChats}
        {/* <MessageComp/> */}
        {/* <ChatInput/> */}
    </ListGroup>
    </div>
    {/* <Footer/> */}
    </main>
    </>
      )
}

export default Chat