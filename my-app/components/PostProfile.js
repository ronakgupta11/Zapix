import React, { useEffect, useState } from 'react'
import AvatarC from './AvatarC'
import Link from 'next/link'
import {IoIosHeartEmpty,IoIosHeart} from "react-icons/io"
import {BsChat} from "react-icons/bs"
import { PolybaseContext } from '@/context/PolybaseProvider'
import { useContext } from 'react'
import {MdDelete} from "react-icons/md"

const PostProfile = (props) => {

    
    const {addLike,postCollectionReference,userID,deletePost} = useContext(PolybaseContext)
    

    const [post,setPost] = useState()
    useEffect(()=>{
        postCollectionReference.record(props.id).get().then((val)=>setPost(val.data))


    },[props.id])
    // console.log("postBy",postBy)
    const [liked,setLiked] = useState(!!post?.likedBy.includes(userID,0))
    
    const likeIcon = liked?<IoIosHeart className='h-5 w-5 text-red'/>:<IoIosHeartEmpty className='h-5 w-5 text-red-50'/>

    function handleLike(){
        if(liked){
            return
        }
        try{
          
            setLiked(true)
            addLike(props.id)
        }
        catch(err){
            alert(err)
        }
    }

    async function deleteP(){
        await deletePost(props.id)

    }

  return (
    <div className='card lg:w-1/2 sm:w-full border border-gray-200 dark:border-borderCol rounded-lg dark:bg-primary-focus  items-center justify-center flex flex-col  m-auto mb-4'>
    {/* user info */}
    <div class="flex items-center space-x-4 w-full rounded-tl-lg rounded-tr-lg h-16 p-4 bg-light-secondary dark:bg-secondary border-b dark:border-gray-600">
    <AvatarC image = {props.imageUrl}/>
    <div class="font-medium dark:text-white">
        <Link href={`profile/${props?.userID}`}><div className='text-black dark:text-white'>{props?.name}</div></Link>
        <div class="text-sm text-gray-500 dark:text-gray-400">{post?.timeStamp}</div>
    </div>
    </div>
     {/* post info */}
    <div className='post-info w-full p-4'>
        <div className='post-text m-2 dark:text-textCol text-gray-500 italic'>
            {post?.PostContent}
        </div>
        <Link href={`/posts/${post?.id}`}><img className="m-2 rounded-lg max-h-72 " src={post?.PostImageUrl}></img></Link>
        
    </div>
    {/* post interaction buttton */}

    <div className='flex flex-col items-center bg-light-secondary dark:bg-secondary w-full border-t dark:border-gray-600 rounded-bl-lg rounded-br-lg'>
    <div className='post-interaction flex w-full items-center px-6 m-2 dark:bg-secondary'>
        <div className=' flex items-center mr-4'>
            <button onClick={handleLike}>

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
    <div className='comments w-full m-2 pl-4 pr-4 flex items-center justify-between'>

        <div className='text-sm m-1 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'>
            <Link href={`/posts/${post?.id}`}>view all comments</Link>
        </div>
{ (userID === props.userID)  &&  <button onClick={deleteP}>

        <MdDelete className='h-8 w-8'/>
    </button>}


    </div>

        
    </div>
    </div>
  )
}

export default PostProfile