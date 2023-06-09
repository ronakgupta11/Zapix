import React, { useContext, useState } from 'react'
import AvatarC from '@/components/AvatarC'
import Link from 'next/link'
import {IoIosHeartEmpty,IoIosHeart} from "react-icons/io"
import {BsChat} from "react-icons/bs"
import { PolybaseContext } from '@/context/PolybaseProvider'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { nanoid } from 'nanoid/async'
import Comment from '@/components/Comment'
import SpinnerBtn from '@/components/SpinnerBtn'
import { AuthContext } from '@/context/AuthProvider'
function PostPage(props) {
    const router = useRouter();
    const postId = router.query.id
    const [post,setPost] = useState()
    const [postBy,setPostBy] = useState()
    const [commentText,setCommentText] = useState("")
    const [comments,setComments] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    // console.log(postId)
  const {isAuthenticated} = useContext(AuthContext)



      const {addComment,addLike,commentCollectionReference,postCollectionReference,userCollectionReference,userID} = useContext(PolybaseContext)


    
    const renderedComments = comments.map((c)=>{
        return(
            <Comment id = {c.id}/>
        )
    })


    useEffect(()=>{
        if(!isAuthenticated()){
            router.push("/")
        }
        postCollectionReference.record(postId).onSnapshot(
            (val)=>{
                const data = val.data
                const comments = data.allComments
                setComments(comments)
                setPost(data)}
                )
        
        
        userCollectionReference.record(post?.owner.id).get().then((val)=>setPostBy(val.data))



    },[post])
    const [liked,setLiked] = useState(!!post?.likedBy.includes(userID,0))
    function handleLike(){
        if(liked){
            return
        }
        try{
          
            setLiked(true)
            addLike(postId)
        }
        catch(err){
            alert(err)
        }
    }

    console.log(liked)
    const likeIcon = liked?<IoIosHeart className='h-5 w-5'/>:<IoIosHeartEmpty className='h-5 w-5'/>
    async function postComment(){
        setIsLoading(true)
        try{
        const id = postId
        const timeStamp="5 xyz"
        const commentId = await nanoid();
        const Text = commentText
        await addComment(id,commentId,timeStamp,Text)}
        catch(err){
            alert(err)
        }
        finally{
        setCommentText("")
    setIsLoading(false)
}


    }

    function handleComment(e){
        setCommentText(e.target.value)
    }

  return (
    <div className='bg-white dark:bg-gray-900 py-8 lg:py-16 ' >
        <section className='lg:w-1/2 sm:w-full p-12 m-auto'>
        <div class="flex items-center space-x-4 w-full border-b dark:border-gray-600  h-16 p-4">
        <AvatarC image = {postBy?.imageUrl}/>
        <div class="font-medium dark:text-white">
            <Link href={`/profile/${postBy?.id}`}><div>{postBy?.name}</div></Link>
            <div class="text-sm text-gray-500 dark:text-gray-400">{post?.timeStamp}</div>
        </div>
        </div>
         {/* post info */}
        <div className='post-info w-full p-4 border-b dark:border-gray-600 mb-2'>
            <div className='post-text m-2 dark:text-white text-gray-700 text-lg italic'>
                {post?.PostContent}
            </div>
            <img className="m-2 rounded-lg " src={post?.PostImageUrl}></img>
            
        </div>
        <div className='post-interaction flex w-full items-center justify-between p-2'>
            <div className=' flex items-center'>
                <button onClick={handleLike}>

                {likeIcon}
                </button>
                <div className='interacion-text ml-2 dark:text-white text-gray-500'>
                    {`${post?.likes} likes`}
                </div>                
            </div>
            <div className=' flex items-center'>
<BsChat className='h-5 w-5'/>

                <div className='interacion-text ml-2 dark:text-white text-gray-500'>
                {`${post?.comments} comments`}
                </div>                
            </div>

        </div>
        </section>

        <section class="comments-section">
  <div class="max-w-2xl mx-auto px-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg lg:text-2xl font-bold text-gray-700 dark:text-white">All Comments</h2>
    </div>
    
        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label for="comment" class="sr-only">Your comment</label>
            <textarea id="comment" rows="6"
                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..." required value={commentText} onChange={handleComment}></textarea>
        </div>
        {isLoading?<SpinnerBtn/>:<button onClick={postComment} type="submit"
            class="inline-flex btn btn- items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg  hover:bg-primary-800">
            Post comment
        </button>}
    
    <div className='my-4'>

        {renderedComments}
    </div>
  </div>
</section>
    </div>
  )
}

export default PostPage