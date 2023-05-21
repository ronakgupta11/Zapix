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
    <div>
        {allRenderedMessages}
        <ChatInput chatId = {id} chatWith = {chatWith}/>

    </div>
  )
}

export default chatId