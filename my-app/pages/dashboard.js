import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import AddPostBox from '@/components/AddPost'
import PostCard from '@/components/PostCard'
import { PolybaseContext } from '@/context/PolybaseProvider'
import { AuthContext } from '@/context/AuthProvider'
import { useRouter } from 'next/router'


const Dashboard = () => {
    const router = useRouter()
    const {isAuthenticated,currentPKP,signMessage} = useContext(AuthContext);
    const {checkUser,createUser,AddPost,addLike,addComment,postCollectionReference,userID}  = useContext(PolybaseContext)
    const [allPosts,setAllPosts] = useState([])

    const allRenderedPost = allPosts.map((post)=>{
        const data = post.data
        const isLiked = data.likedBy.includes(userID,0)
        return(
            <PostCard 
            key = {data.id}
            id = {data.id}
            content = {data.PostContent}
            postImage = {data.PostImageUrl}
            likes = {data.likes}
            comments = {data.comments}
            timeStamp = {data.timeStamp}
            postBy = {data.owner}
            isLiked = {isLiked}
            />
        )
    })





    useEffect(()=>{
        if(!isAuthenticated()){
            router.push("/")
        }
        if(!checkUser()){
            createUser()
        }
        const collectionReference =  postCollectionReference.onSnapshot(
            (newDoc) => {
              // Handle the change
            //   console.log(newDoc)
        
              const data =  newDoc?.data
              setAllPosts(data)
            },
            (err) => {
              console.log(err)
              setAllPosts([])
              // Optional error handler
            }
            
          );
        
            
        
    

        

    },[isAuthenticated(),allPosts])

    
  return (
    <>
      <Head>
        <title>App Name-Dasboard</title>
        <meta name="description" content="Web3 Social App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=' bg-white dark:bg-primary min-h-screen '>
          
          
        <AddPostBox/>
          {/* <ToastC/> */}
          {/* <ToastC/> */}
          {allRenderedPost}
          {/* <PostPage/> */}

        
      </main>

    </>
  
  )
}

export default Dashboard