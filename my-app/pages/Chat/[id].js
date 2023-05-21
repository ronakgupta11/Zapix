import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { PolybaseContext } from '@/context/PolybaseProvider';
import MessageComp from '@/components/MessageComp';
import ChatInput from '@/components/ChatInput';

function chatId() {

  const router = useRouter()
  const id = router.query.id;
  const chatWith = router.query.chatWith
  const {chatCollectionReference,messageCollectionReference,userID} = useContext(PolybaseContext)
  const [allMessages,setAllMessages] = useState([])

  useEffect(()=>{
    chatCollectionReference.record(id).onSnapshot(
      (newDoc)=>{
        const chat = newDoc.data;
        const messages = chat.allMessages
        setAllMessages(messages)

      },
      (err)=>console.log(err)
    )

    

  })

  const allRenderedMessages = allMessages.map((m)=>{
    return(
    <MessageComp id = {m.id}/>
      )
  })
  return (
    <div className='w-full h-screen bg-white dark:bg-gray-900 p-8'>

    <div className='w-1/2 m-auto h-full border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 p-4 flex flex-col  justify-around'>
      <div className='h-4/5 w-full'>

        {allRenderedMessages}
      </div>
        <ChatInput chatId = {id} chatWith = {chatWith}/>

    </div>
    </div>

  )
}

export default chatId