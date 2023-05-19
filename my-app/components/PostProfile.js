import React, { useEffect, useState } from 'react'
import AvatarC from './AvatarC'
import Link from 'next/link'
import {IoIosHeartEmpty,IoIosHeart} from "react-icons/io"
import {BsChat} from "react-icons/bs"
import { PolybaseContext } from '@/context/PolybaseProvider'
import { useContext } from 'react'

const PostProfile = (props) => {

    
    const {addLike,userCollectionReference,postCollectionReference,userID} = useContext(PolybaseContext)
    

    const [post,setPost] = useState()
    useEffect(()=>{
        postCollectionReference.record(props.id).get().then((val)=>setPost(val.data))


    },[props.id])
    // console.log("postBy",postBy)
    const liked = post?.likedBy.includes(userID,0)
    
    const likeIcon = liked?<IoIosHeart className='h-5 w-5'/>:<IoIosHeartEmpty className='h-5 w-5'/>

  return (
    <div className='card w-1/2 border border-gray-200 dark:border-borderCol rounded-lg dark:bg-primary-focus  items-center justify-center flex flex-col  m-auto mb-4'>
    {/* user info */}
    <div class="flex items-center space-x-4 w-full rounded-tl-lg rounded-tr-lg h-16 p-4 bg-light-secondary dark:bg-secondary border-b dark:border-gray-600">
    <AvatarC image = {props.imageUrl}/>
    <div class="font-medium dark:text-white">
        <Link href={`profile/${props?.id}`}><div className='text-black dark:text-white'>{props?.name}</div></Link>
        <div class="text-sm text-gray-500 dark:text-gray-400">{post?.timeStamp}</div>
    </div>
    </div>
     {/* post info */}
    <div className='post-info w-full p-4'>
        <div className='post-text m-2 dark:text-textCol text-gray-500 italic'>
            {post?.PostContent}
        </div>
        <Link href={`/posts/${post?.id}`}><img className="m-2 rounded-lg " src={post?.PostImageUrl}></img></Link>
        
    </div>
    {/* post interaction buttton */}

    <div className='flex flex-col items-center bg-light-secondary dark:bg-secondary w-full border-t dark:border-gray-600 rounded-bl-lg rounded-br-lg'>
    <div className='post-interaction flex w-full items-center px-6 m-2 dark:bg-secondary'>
        <div className=' flex items-center mr-4'>
            <button onClick={()=>{(!liked)?addLike(post?.id):{}}}>

            {likeIcon}
            </button>
            <div className='interacion-text ml-2 text-gray-500 dark:text-white'>
                {`${post?.likes} likes`}
            </div>                
        </div>
        <div className=' flex items-center'>
        <BsChat className='h-5 w-5'/>

            <div className='interacion-text ml-2 text-gray-500 dark:text-white'>
            {`${post?.comments} comments`}
            </div>                
        </div>

    </div>
    {/* comments */}
    <div className='comments w-full m-2 pl-4 pr-4'>
        {/* <div class="relative flex w-full justify-between items-center">
            <input type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border border-gray-300 appearance-none dark:text-white bg-transparent dark:border-primary-focus dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Add Comments</label>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#2563eb" className="w-6 h-6 ml-2 -rotate-45">
<path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>

        </div> */}
        <div className='text-sm m-1 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'>
            <Link href={`/posts/${post?.id}`}>view all comments</Link>
        </div>

    </div>

        
    </div>
    </div>
  )
}

export default PostProfile