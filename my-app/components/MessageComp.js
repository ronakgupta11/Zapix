import { PolybaseContext } from '@/context/PolybaseProvider'
import { Button, Spinner } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react'
import lighthouse from '@lighthouse-web3/sdk';
import { AuthContext } from '@/context/AuthProvider';
import {BsFillPlayFill} from "react-icons/bs"


function MessageComp(props) {
  const [message,setMessage] = useState()
  const [fileURL, setFileURL] = useState("");
  const [inImageView,setInImageView] = useState(false)
  const [isLoading,setIsLoading] = useState(false)


  const {messageCollectionReference,userID} = useContext(PolybaseContext)
  const {signMessage} = useContext(AuthContext)
  useEffect(()=>{
    messageCollectionReference.record(props.id).get().then(
      (newDoc)=>{
        const msg = newDoc.data
        setMessage(msg)

      }
    )

  })

  const signAuthMessage = async() =>{
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    const publicKey = userID.toLowerCase();
    const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
    const signedMessage = await signMessage(
      messageRequested
    );
    return({publicKey: publicKey, signedMessage: signedMessage});
  }


    /* Decrypt file */
    const decrypt = async() =>{
      setIsLoading(true)
      try{
      // Fetch file encryption key
      const cid = message?.msgImageCID; //replace with your IPFS CID
      const {publicKey, signedMessage} = await signAuthMessage();
      /*
        fetchEncryptionKey(cid, publicKey, signedMessage)
          Parameters:
            CID: CID of the file to decrypt
            publicKey: public key of the user who has access to file or owner
            signedMessage: message signed by the owner of publicKey
      */
      const keyObject = await lighthouse.fetchEncryptionKey(
        cid,
        publicKey,
        signedMessage
      );
  
      // Decrypt file
      /*
        decryptFile(cid, key, mimeType)
          Parameters:
            CID: CID of the file to decrypt
            key: the key to decrypt the file
            mimeType: default null, mime type of file
      */
     
      const fileType = "image/jpeg";
      const decrypted = await lighthouse.decryptFile(cid, keyObject.data.key, fileType);
      console.log(decrypted)
      /*
        Response: blob
      */
  
      // View File
      const url = URL.createObjectURL(decrypted);
      console.log(url);
      setFileURL(url);
      }
      catch(err){
        alert(err)
      }
      finally{
        setIsLoading(false)
      }
    }

    async function handleView(){
      await decrypt()
      setInImageView(true)
    }

  return (
    <div className='flex flex-col items-center justify-center p-2 text-gray-500 dark:text-white border-t border-b dark:border-gray-600'>
        {/* <div>from: </div> */}
        <div>
        {!inImageView  && !isLoading && <Button className='rounded-xlg bg-gray-400' onClick={handleView}>
         <BsFillPlayFill/>
          View photo
          
          </Button>}
        {isLoading && <Spinner/>}
        {inImageView && !isLoading && <img className='h-64 rounded-lg mx-auto my-4' src={fileURL}>
        </img>}
        </div>
        <div>{message?.message}</div>
    </div>
  )
}

export default MessageComp