import React, { useEffect, useState } from 'react'
import { ListGroup } from 'flowbite-react'
import AvatarC from './AvatarC'
import { PolybaseContext } from '@/context/PolybaseProvider'
import { useContext } from 'react'
import { useRouter } from 'next/router'

function SingleChat(props) {
  const router = useRouter()
  const [chat,setChat] = useState()
  const[user,setUser] = useState()
  const [chatwithuserId,setchatwithUserId] = useState()
  const {chatCollectionReference,userCollectionReference,userID} = useContext(PolybaseContext)
  useEffect(()=>{
    chatCollectionReference.record(props.id).get().then(
      (newDoc)=>{
        const chat = newDoc.data
        // console.log("chat:",chat)

        const chatWithId = (userID===chat.chatWith.id)?chat.creator.id:chat.chatWith.id;
        setchatwithUserId(chatWithId)
        
        setChat(chat)
      }

    )
    userCollectionReference.record(chatwithuserId).get().then(
      v => {
        console.log(v.data)
        setUser(v.data)}
    )

  })

  function handleClick(){
    const id = chat?.id;
    const chatWith = chatwithuserId;

    router.push({
      pathname:`/Chat/${id}`,
      query:{id,chatWith}
    })

  }

  return (
    <button onClick={()=>{handleClick()}} type="button" class="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
        <AvatarC image={user?.imageUrl}/>
        {/* <svg aria-hidden="true" class="w-4 h-4 mr-2 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg> */}
        <div className='ml-4'>
            {user?.name}
            
            </div>
    </button>
  )
}

export default SingleChat