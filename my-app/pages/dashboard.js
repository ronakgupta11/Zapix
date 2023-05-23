import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import AddPostBox from '@/components/AddPost'
import PostCard from '@/components/PostCard'
import { PolybaseContext } from '@/context/PolybaseProvider'
import { AuthContext } from '@/context/AuthProvider'
import { useRouter } from 'next/router'
import Placeholder from '@/components/Placeholder'


const Dashboard = () => {
    const router = useRouter()
    const {isAuthenticated} = useContext(AuthContext);
    const {checkUser,createUser,AddPost,addLike,addComment,postCollectionReference,userID}  = useContext(PolybaseContext)
    const [allPosts,setAllPosts] = useState([])
    const [created,setCreated] = useState(false)
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
      // if(await !checkUser()){
      //   console.log("user not created, crating user...")
      //     createUser().then(v => setCreated(true))
      // }
      checkUser().then(v=>{
        if(v==0){
          // router.push(`/profile/${userID}`)
          console.log("creating user")
          createUser().then(v=>console.log(v))
          
        }
        else{
          

        }
      })

      const collectionReference =  postCollectionReference.onSnapshot(
          (newDoc) => {
            // Handle the change
          //   console.log(newDoc)
      
            const data =  newDoc?.data
            console.log(data)
            setAllPosts(data)
          },
          (err) => {
            console.log(err)
            setAllPosts([])
            // Optional error handler
          }
          
        );
      
          
      
  

      

  },[isAuthenticated(),allPosts,created])

    
  return (
    <>
      <Head>
        <title>Zapix-Dasboard</title>
        <meta name="description" content="Web3 Social App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
<link rel="manifest" href="/site.webmanifest"></link>
      </Head>
      <main className=' bg-white dark:bg-gray-900 min-h-screen p-8'>
          
        <div className='h-fit'>

        <AddPostBox/>
        </div>
          {/* <ToastC/> */}
          {/* <ToastC/> */}

          {!!allPosts.length &&<div>

          {allRenderedPost}
          </div>}
          {!allPosts.length && <Placeholder/>}
          {/* <PostPage/> */}

        
      </main>

    </>
  
  )
}

export default Dashboard