import React from 'react'
import { PolybaseContext } from '@/context/PolybaseProvider'
import { useContext } from 'react'
import { useEffect,useState } from 'react'

const Comment = (props) => {
    const {commentCollectionReference,userCollectionReference} = useContext(PolybaseContext)
    const id = props.id
    const [comment,setComment] = useState()
    const [user,setUser] = useState()
    useEffect(()=>{
        commentCollectionReference.record(id).get().then((val)=>setComment(val))
        userCollectionReference.record(comment?.data.postBy.id).get().then((v)=>setUser(v))

    },[])

  return (
    <article class="p-6 mb-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
    <footer class="flex justify-between items-center mb-2">
        <div class="flex items-center">
            <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
                    class="mr-2 w-6 h-6 rounded-full"
                    src={user?.data.imageUrl}
                    alt=""/>{user?.data.name}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-03-12"
                    title="March 12th, 2022">{comment?.data.timeStamp}</time></p>
        </div>

    </footer>
    <p class="text-gray-500 dark:text-gray-400">{comment?.data.content}</p>

</article>
  )
}

export default Comment