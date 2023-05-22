import { Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { upload } from "@spheron/browser-upload";
import SpinnerBtn from '@/components/SpinnerBtn';
import { useContext } from "react";
import { PolybaseContext } from "@/context/PolybaseProvider";
import { AuthContext } from '@/context/AuthProvider';
import Head from 'next/head';



const Profile = () => {

    // const [image,setImageFile] = useState(null)
    const [name,setNameText] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const [file, setFile] = useState(null);

    const [uploadLink, setUploadLink] = useState("");

    const {setName,setImage} = useContext(PolybaseContext);
  const {isAuthenticated} = useContext(AuthContext)




  
  
  
   

      
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
        const imageLink = `${res?.protocolLink}/${file?.name}`
        
        await setName(name);
        await setImage(imageLink)
    }catch(err){
        console.log(err)
        setIsLoading(false)
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
    })
  return (
    <>
    <Head>
        <title>App Name-Profile</title>
        <meta name="description" content="Web3 Social App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


    <main className='w-full h-screen bg-white dark:bg-gray-900 p-8'>

    
    <div className='lg:w-1/2 sm:w-full mx-auto' >
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload Profile Image</label>
<input  onChange={handleFile} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
<div class="mt-1 mb-2 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A profile picture is useful to confirm your are logged into your account</div>
<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Enter Profile Name</label>
<input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type='text' value={name} onChange={handleName}/>
<div className='my-4'>

{isLoading?<SpinnerBtn className='mx-auto mt-4'/>:<Button onClick={update}> Update Profile</Button>}
</div>
        </div>
        </main>
        </>
    
  )
}

export default Profile