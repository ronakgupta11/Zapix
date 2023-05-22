import { Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { upload } from "@spheron/browser-upload";
import SpinnerBtn from '@/components/SpinnerBtn';
import { useContext } from "react";
import { PolybaseContext } from "@/context/PolybaseProvider";
import { AuthContext } from '@/context/AuthProvider';
import Head from 'next/head';
import ProfileCard from '@/components/ProfileCard';
import PostProfile from '@/components/PostProfile';
import { useRouter } from 'next/router';


const Profile = () => {

    // const [image,setImageFile] = useState(null)
    const [name,setNameText] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const [file, setFile] = useState(null);

    const [uploadLink, setUploadLink] = useState("");

    const {setName,setImage,userID,userRecordRef} = useContext(PolybaseContext);
  const {isAuthenticated} = useContext(AuthContext)
const [user,setUser] = useState()
const [posts,setPosts] = useState([])
const router = useRouter()



  
  
  
   

      
        const handleUpload = async (file) => {
          if (!file) {
            return;
          }
      
          try {
            setIsLoading(true);
            const response = await fetch("/api/uploadToken");
            const responseJson = await response.json();
            const uploadResult = await upload([file], {
              token: responseJson.uploadToken,
            });
            setUploadLink(`${uploadResult.protocolLink}/${file?.name}`);
            console.log("uploaded....",uploadResult)
            return uploadResult
          } catch (err) {
            alert(err);
          } finally {
            setIsLoading(false);
          }
        };


    const handleFile = (e)=>{
        setFile(e.target.files[0])
    }

    const handleName = (e)=>{
        setNameText(e.target.value)
    }

    async function update(){

        
        setIsLoading(true)
        try{
        const res = await handleUpload(file)
        const imageLink = res?`${res?.protocolLink}/${file?.name}`:""
        
        await setName(name);
        await setImage(imageLink)
    }catch(err){
        alert(err)
        // setIsLoading(false)
    }finally{
        setNameText("")
        setFile(null)
        
        setIsLoading(false)
    }
    }

    useEffect(()=>{
      if(!isAuthenticated()){
        router.push("/")
    }
    userRecordRef.onSnapshot(v =>{
      const data = v.data
      setPosts(data.userPosts)
      
      setUser(data)})
  



    })

    const renderedPosts = posts?.map((p)=>{
      return(
        <PostProfile  userID = {userID} id = {p.id} imageUrl = {user?.imageUrl} name = {user?.name} />
      )
    })
  return (
    <>
    <Head>
        <title>Zapix-Profile</title>
        <meta name="description" content="Web3 Social App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
<link rel="manifest" href="/site.webmanifest"></link>
      </Head>


    <main className='w-full min-h-screen bg-white dark:bg-gray-900 p-8'>

    
    <div className='w-full' >
      <ProfileCard name={user?.name} image = {user?.imageUrl} />
      <div className='lg:w-1/2 sm:w-full mx-auto'>

      
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload Profile Image</label>
<input  onChange={handleFile} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
<div class="mt-1 mb-2 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A profile picture is useful to confirm your are logged into your account</div>
<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Enter Profile Name</label>
<input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type='text' value={name} onChange={handleName}/>
<div className='my-4'>

{isLoading?<SpinnerBtn className='mx-auto mt-4'/>:<Button onClick={update}> Update Profile</Button>}
</div>
</div>
{/* <div className='w-full'> */}

{renderedPosts}
{/* </div> */}
        </div>
        </main>
        </>
    
  )
}

export default Profile