import React, { useState } from 'react'
import { Card } from 'flowbite-react'
import Link from 'next/link'
import { Button } from 'flowbite-react'
import { useContext } from 'react'
import { PolybaseContext } from '@/context/PolybaseProvider'
import { nanoid } from 'nanoid/async'
import { useRouter } from 'next/router'
function ProfileCard(props) {
  const router = useRouter()

  
  

 
  const {userID,createChat} = useContext(PolybaseContext)
  const [isLoading,setIsLoading] = useState(false)
  async function createNewChat(){
    setIsLoading(true)
    try{
    const id = await nanoid()
    const chatWith = props.id
    await createChat(id,chatWith);
    console.log("create new chat");}
    catch(err){
      alert(err)
    }
    finally{
      setIsLoading(false)
    }
  }
  return (
    <div className="max-w-sm mx-auto mb-4">
    <Card>
  
      <div className="flex flex-col items-center pb-10">
        <img
          className="mb-3 h-24 w-24 rounded-full shadow-lg"
          src={props.image}
          alt={props.name}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {props.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {props.desc} posts
        </span>
        <div className="mt-4 flex space-x-3 lg:mt-6">
          
          {(userID === props.id)?<Button
            onClick={()=>router.push("/profile")}
            className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update Profile
          </Button>:
          <Button
            onClick={()=>createNewChat()}
            className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add friend
          </Button>}
          {!(userID === props.id) && <Link
            href="/Chat"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Message
          </Link>}
        </div>
      </div>
    </Card>
  </div>
  )
}

export default ProfileCard