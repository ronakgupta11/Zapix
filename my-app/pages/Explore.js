import React, { useState,useEffect } from 'react'
import { Polybase } from "@polybase/client";
import PostCard from '@/components/PostCard';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
const db = new Polybase({
  defaultNamespace: "pk/0xf50ea4b6ca184c2a54567099bab8960e4057f80161262704102502bacb76b8029902b6bab1a9dcac5701c816db1834ec27760b2ddc6b9efaedcb3fc0906b4aea/social-web-app",
});

function Explore() {
  const [postData,setPostData] = useState([])
  const postDataRef = db.collection("PostData")


  useEffect(()=>{
        postDataRef
        .onSnapshot(
            querySnapshot =>{
              console.log(querySnapshot)
                const postList = [];
                querySnapshot.data.map((doc)=>{
                    postList.push(doc.data)
                })
                setPostData(postList);
                console.log(postList)
                // console.log(todos)
            }
        )
    },[])

    const posts = postData.map(
      (post)=>{
        return(
          <PostCard textContent = {post.PostContent} image = {post.PostImageUrl}/>
        )
      }
    )


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='pt-24 bg-primary min-h-screen'>
          <Navbar/>
        

          {posts}
        
          <Footer/>
        
      </main>

    </>

  )
}

export default Explore