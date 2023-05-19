import React, { useInsertionEffect } from 'react'
import { PolybaseContext } from '@/context/PolybaseProvider'
import { useContext } from 'react'
import { useEffect,useState } from 'react'
import PostCard from '@/components/PostCard'
import ProfileCard from '@/components/ProfileCard'
import { useRouter } from 'next/router'

const ProfilePage = () => {
    const router = useRouter()
    const uid = router.query.id
    const{userCollectionReference,postCollectionReference,userID} = useContext(PolybaseContext);

    const [userPosts,setUserPosts] = useState([]);
    const [user,setUser] = useState();

    useEffect(()=>{
        const user = userCollectionReference.record(uid).get().then((v)=>v.data)
        
        const userPosts = user.then((u)=>u.userPosts.map((p)=>postCollectionReference.record(p.id).get().then(v=>v.data)))
        setUser(user)
            
            
        setUserPosts(userPosts)
        
        
    },[])



    const allRenderedPost = userPosts.then((up)=>up.map((data)=>{
        console.log("d:",data)
        
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
    }))
  return (
    <div>
        <ProfileCard/>
        {allRenderedPost}
    </div>

  )
}

export default ProfilePage