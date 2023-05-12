
import React, { useRef, useState } from "react";

import { upload } from "@spheron/browser-upload";

function AddPost() {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadLink, setUploadLink] = useState("");
    const [dynamicLink, setDynamicLink] = useState("");
    const [textContent,setTextContent] = useState("");


    const handleFileChange = async (event) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        setFile(selectedFile);
        setUploadLink("");
        setDynamicLink("");
        handleUpload(selectedFile)
        
      };
    
      const handleSelectFile = () => {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      };
    
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
    
          setUploadLink(uploadResult.protocolLink);
          setDynamicLink(uploadResult.dynamicLinks[0]);
          console.log("uploaded....",uploadResult)
        } catch (err) {
          alert(err);
        } finally {
          setIsLoading(false);
        }
      };

  return (
    <div className='card w-1/2 h-64 text-white  m-auto'>
        
<form>
   <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
       <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
           <label for="comment" class="sr-only">Your comment</label>
           <textarea id="comment" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0  dark:text-white dark:placeholder-gray-400" placeholder="Write your Thoughts..."></textarea>
       </div>
       <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
           <button  type="submit" class= " add-post-btn inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800" >
               Add Post
           </button>
           <div class="flex pl-0 space-x-1 sm:pl-2">
               <button type="button" class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                   <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"></path></svg>
                   <span class="sr-only">Attach file</span>
               </button>
                  
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
</form>
{file ? file?.name : "No file selected"}
<p>xyz</p>
{/* <p class="ml-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p> */}
{uploadLink && (
                  <a
                    className="text-sm mt-4 -rotate-2"
                    href={`${uploadLink}/${file?.name}`}
                    target="__blank"
                  >
                    {`${uploadLink}/${file?.name}`}
                  </a>
                )}
                <p>
                    new
                </p>
                {dynamicLink && (
                  <a
                    className="text-sm mt-4 -rotate-2"
                    href={`https://${dynamicLink}`}
                    target="__blank"
                  >
                    {dynamicLink}
                  </a>
                )}

    </div>
  )
}

export default AddPost