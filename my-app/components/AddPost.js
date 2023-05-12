
import React, { useRef, useState } from "react";

import { upload } from "@spheron/browser-upload";
import { Polybase } from "@polybase/client";


const db = new Polybase({
  defaultNamespace: "pk/0xf50ea4b6ca184c2a54567099bab8960e4057f80161262704102502bacb76b8029902b6bab1a9dcac5701c816db1834ec27760b2ddc6b9efaedcb3fc0906b4aea/social-web-app",
});


function AddPost() {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadLink, setUploadLink] = useState("");
    const [textContent,setTextContent] = useState("");
    const [uploadingPost,setUploadingPost] = useState(false);

    const uploadPost = async()=>{
      console.log("btn clicked")
  
      try {
        setUploadingPost(true);
        await createColectionRecord();

      }catch(err){
        alert(err);
      } finally {
        setUploadingPost(false);
        setFile(null);
        setUploadLink("")
        setTextContent("")
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
    
        try {
          setIsLoading(true);
          const response = await fetch("/api/uploadToken");
          const responseJson = await response.json();
          const uploadResult = await upload([file], {
            token: responseJson.uploadToken,
          });
          setUploadLink(`${uploadResult.protocolLink}/${file?.name}`);
          console.log("uploaded....",uploadResult)
        } catch (err) {
          alert(err);
        } finally {
          setIsLoading(false);
        }
      };


      const createColectionRecord = async()=>{
        await db.collection("PostData").create(["new-post-1-1", textContent,uploadLink]); 
        console.log("created record");
    }

  return (
    <div className='card w-1/2 h-64 text-white  m-auto'>
        

   <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
       <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
           <label for="comment" class="sr-only">Your comment</label>
           <textarea value={textContent} onChange={handleTextChange} id="comment" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0  dark:text-white dark:placeholder-gray-400" placeholder="Write your Thoughts..."></textarea>
       </div>
       {file && <div className=" bg-gray-800 p-1">
        {isLoading?<div role="status" className="mx-auto w-full">
    <svg  aria-hidden="true" class="w-8 h-8 m-auto my-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>:<img  className="m-auto rounded-lg max-h-80 max-w-1/2" src={uploadLink}/>}
             </div>}
       <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">

           <button disabled={isLoading} type="submit" onClick={uploadPost} class= " add-post-btn inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800" >
               Add Post
           </button>
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

export default AddPost