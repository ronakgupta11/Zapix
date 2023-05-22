import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { PolybaseContext } from '@/context/PolybaseProvider';
import MessageComp from '@/components/MessageComp';
import ChatInput from '@/components/ChatInput';
import { AuthContext } from '@/context/AuthProvider';
import AvatarC from '@/components/AvatarC';
import Link from 'next/link';

function Chat() {
  const {isAuthenticated} = useContext(AuthContext);

  const router = useRouter()
  const id = router.query.id;
  const chatWith = router.query.chatWith
  const [user,setUser] = useState()
  const {chatCollectionReference,messageCollectionReference,userID,userCollectionReference} = useContext(PolybaseContext)
  const [allMessages,setAllMessages] = useState([])

  useEffect(()=>{
    if(!isAuthenticated()){
      router.push("/")
    }

    chatCollectionReference.record(id).onSnapshot(
      (newDoc)=>{
        const chat = newDoc.data;
        const messages = chat.allMessages
        setAllMessages(messages)

      },
      (err)=>console.log(err)
    )
    userCollectionReference.record(chatWith).get().then((val)=>setUser(val.data))


    

  })

  const allRenderedMessages = allMessages.map((m)=>{
    return(
    <MessageComp id = {m.id}/>
      )
  })
  return (
    <div className='w-full  bg-white dark:bg-gray-900 p-8'>

    <div className='lg:w-1/2 sm:w-full m-auto border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 p-4 flex flex-col  justify-around'>
    <div class=" fixed top-1 flex items-center space-x-4 w-full border-b dark:border-gray-600  h-16 p-4">
        <AvatarC image = {user?.imageUrl}/>
        <div class="font-medium dark:text-white">
            <Link href={`/profile/${user?.id}`}><div>{user?.name}</div></Link>
            {/* <div class="text-sm text-gray-500 dark:text-gray-400">{post?.timeStamp}</div> */}
        </div>
        </div>
      <div className='h-screen w-full overflow-y-scroll'>

        {allRenderedMessages}
      </div>
        <ChatInput className="fixed bottom-1" chatId = {id} chatWith = {chatWith}/>

    </div>
    </div>

  )
}

export default Chat