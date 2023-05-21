import React, { useInsertionEffect } from 'react'
import { PolybaseContext } from '@/context/PolybaseProvider'
import { useContext } from 'react'
import { useEffect,useState } from 'react'
import PostCard from '@/components/PostCard'
import ProfileCard from '@/components/ProfileCard'
import { useRouter } from 'next/router'
import PostProfile from '@/components/PostProfile'

const ProfilePage = (props) => {
    const router = useRouter()
    const uid = router.query.id
    

    const{userCollectionReference,postCollectionReference,userID} = useContext(PolybaseContext);

    // const [userPosts,setUserPosts] = useState([]);
    const [user,setUser] = useState();

    useEffect(()=>{
        userCollectionReference.record(uid).get().then((v)=>setUser(v.data))
        
        
            
            
        // setUserPosts(userPosts)
        
        
    },[user])



    const allRenderedPost = user?.userPosts.map((p)=>{
        return(
            <PostProfile id ={p.id} name = {user?.name} imageUrl = {user?.imageUrl}/>
        )
    })
  return (

    
    <div className=' bg-white dark:bg-gray-900 p-8'>

            
         <ProfileCard name={user?.name} image = {user?.imageUrl} id = {user?.id} desc = {user?.userPosts.length} />
        {allRenderedPost}
    </div>

  )
}

export default ProfilePage