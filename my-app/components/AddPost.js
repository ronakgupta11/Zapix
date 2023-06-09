
import React, { useRef, useState } from "react";
import { nanoid } from 'nanoid/async'

import { upload } from "@spheron/browser-upload";

import SpinnerBtn from "./SpinnerBtn";
import { useContext } from "react";
import { PolybaseContext } from "@/context/PolybaseProvider";






function AddPostBox() {

    const {addPost} = useContext(PolybaseContext)
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadLink, setUploadLink] = useState("");
    const [textContent,setTextContent] = useState("");
    const [uploadingPost,setUploadingPost] = useState(false);

    const uploadPost = async()=>{
      
      setUploadingPost(true);
      try {
        
        
        const postId = await nanoid();
        const postContent = textContent;
        const image = uploadLink;
        const timeStamp = "24 nov"
  
        await addPost(postId,postContent,image,timeStamp)

      }catch(err){
        alert(err);
        setUploadingPost(false)
      } finally {
        setFile(null);
        setUploadLink("")
        setTextContent("")
        setUploadingPost(false);
      }

    }



    const handleFileChange = async (event) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        setFile(selectedFile);
        setUploadLink("");

        handleUpload(selectedFile)
        
      };
    
      const handleSelectFile = () => {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      };

      const handleTextChange = (e)=>{
        setTextContent(e.target.value)
      }
    
      const handleUpload = async (file) => {
        if (!file) {
          return;
        }
        setIsLoading(true);
        
        try {
          const response = await fetch("/api/uploadToken");
          const responseJson = await response.json();
          const uploadResult = await upload([file], {
            token: responseJson.uploadToken,
          });
          setUploadLink(`${uploadResult.protocolLink}/${file?.name}`);
          console.log("uploaded....",uploadResult)
        } catch (err) {
          alert(err);
          setIsLoading(false)
        } finally {
          setIsLoading(false);
        }
      };




  return (
    <div className='card lg:w-1/2 sm:w-full text-white mx-auto'>
        

   <div class="w-full mb-4 border border-gray-200 rounded-lg h-fit bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
       <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
           <label for="comment" class="sr-only">Your comment</label>
           <textarea value={textContent} onChange={handleTextChange} id="comment" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0  dark:text-white dark:placeholder-gray-400" placeholder="Write your Thoughts..."></textarea>
       </div>
       {file && !isLoading &&<div className="bg-white dark:bg-gray-800 p-1">
        <img  className="m-auto rounded-lg max-h-80 max-w-1/2" src={uploadLink}/>
             </div>}
       <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">

           {(isLoading || uploadingPost) ? <SpinnerBtn/>: <button disabled={isLoading} type="submit" onClick={uploadPost} class= " add-post-btn inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800" >
               Add Post
           </button>}
           <div class="flex pl-0 space-x-1 sm:pl-2">
              
                  
               <button onClick={handleSelectFile} type="button" class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">


                   <svg  aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
                   <input
                    id="file"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="w-full h-full"
                    style={{ display: "none" }}
                    />

                   <span class="sr-only">Upload image</span>
               </button>
           </div>
       </div>
   </div>


    </div>
  )
}

export default AddPostBox