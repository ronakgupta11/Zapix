import React from 'react'
import { ethers } from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthProvider';
import { Button } from 'flowbite-react';
import { PolybaseContext } from '@/context/PolybaseProvider';

function LightUp() {
  const {currentPKP,signMessage} = useContext(AuthContext)
  const {userID} = useContext(PolybaseContext)
  const {checkUser,createUser,setName,setImage,addPost,deleteUser,addLike,addComment,deletePost,createMessage,addMessageToChat,createChat} = useContext(PolybaseContext)
  const [fileURL, setFileURL] = React.useState(null);

    // const encryptionSignature = async() =>{
    //     // const provider = new ethers.providers.Web3Provider(window.ethereum);
    //     // const signer = provider.getSigner();
    //     // const address = await signer.getAddress();
    //     const address = currentPKP?.ethAddress
    //     const messageRequested = (await lighthouse.getAuthMessage(address)).data.message;
    //     // const signedMessage = await signer.signMessage(messageRequested);
    //     const signedMessage = await signMessage(messageRequested);
    //     console.log(signedMessage)
    //     return({
    //       signedMessage: signedMessage,
    //       publicKey: address
    //     });
    //   }

console.log("uid:",userID)
console.log("PKP:",currentPKP)
      const progressCallback = (progressData) => {
        let percentageDone =
          100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
        console.log(percentageDone);
      };


        /* Deploy file along with encryption */
  const uploadFileEncrypted = async(e) =>{
    /*
       uploadEncrypted(e, accessToken, publicKey, signedMessage, uploadProgressCallback)
       - e: js event
       - accessToken: your API key
       - publicKey: wallets public key
       - signedMessage: message signed by the owner of publicKey
       - uploadProgressCallback: function to get progress (optional)
       
    */


  try{
    // const sig = await encryptionSignature();
    const sig = await signAuthMessage();
    console.log("sig:",sig)
    const response = await lighthouse.uploadEncrypted(
      e,
      "be74ef67.6a825190433a450a872e651c54303d6f",
      sig.publicKey,
      sig.signedMessage,
      progressCallback
    );
    console.log(response);
  }catch(err){
    console.log(err)
  }
    /*
      output:
        data: {
          Name: "c04b017b6b9d1c189e15e6559aeb3ca8.png",
          Size: "318557",
          Hash: "QmcuuAtmYqbPYmPx3vhJvPDi61zMxYvJbfENMjBQjq7aM3"
        }
      Note: Hash in response is CID.
    */
  }

  const shareFile = async() =>{
    const cid = "";

    // Then get auth message and sign
    // Note: the owner of the file should sign the message.
    const {publicKey, signedMessage} = await signAuthMessage();

    const publicKeyUserB = [""];
    
    const res = await lighthouse.shareFile(
      publicKey,
      publicKeyUserB,
      cid,
      signedMessage
    );

    console.log(res)
    /*
      data: {
        cid: "QmTTa7rm2nMjz6wCj9pvRsadrCKyDXm5Vmd2YyBubCvGPi",
        shareTo: ["0x201Bcc3217E5AA8e803B41d1F5B6695fFEbD5CeD"],
        status: "Success"
      }
    */
    /*Visit: 
        https://files.lighthouse.storage/viewFile/<cid>  
      To view encrypted file
    */
  }

  const signAuthMessage = async() =>{
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    console.log (currentPKP?.ethAddress.toLowerCase())
    const publicKey = userID.toLowerCase();
    const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
    const signedMessage = await signMessage(
      messageRequested
    );
    return({publicKey: publicKey, signedMessage: signedMessage});
  }


    /* Decrypt file */
    const decrypt = async() =>{
      // Fetch file encryption key
      const cid = "Qma9LnKhbw2nXfvMFDpibzRu8mHfnLhJ5QJaS1phnBg7Vb"; //replace with your IPFS CID
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


  

  return (
    <div className="App">
      <input onChange={e=>uploadFileEncrypted(e)} type="file" />
      <button onClick={()=>shareFile()}>share file</button>
      <button onClick={()=>decrypt()}>decrypt</button>
      <Button onClick={()=>createUser()}>create User</Button>
      <Button onClick={()=>checkUser()}>check User</Button>
      <Button onClick={()=>setName("John Uncle")}>set Name</Button>
      <Button onClick={()=>setImage("this is new image url")}>set Image</Button>
      <Button onClick={()=>addPost("new-5","post content update","post image url update","24 nov timeStamp")}>add Post</Button>
      <Button onClick={()=>addLike("new-4")}>add Like</Button>
      <Button onClick={()=>deletePost("0xac901f63ab60a1e95fdee48cb3f1e68a81aa85c26885b899ff10c57ab803493642590112339b8ede02a57a96c3eda5cf7d8e5eb8a7b3e85dc117f4b33fb29cc8")}>del POst</Button>
      <Button onClick={()=>deleteUser()}>del user</Button>
      <Button onClick={()=>addComment("new-4","new-c2","24 nov timeStamp","commment content")}>add comment</Button>
      <Button onClick={()=>createChat("new-chat-created","0x1c55af66f3ECF228d00a6Ea2d93D93b7B8F29CeF")}>create chat</Button>
      <Button onClick={()=>createMessage("new-message","message text","message image url")}>create message</Button>
      <Button onClick={()=>addMessageToChat("new-chat-eth","new-message")}>add message to caht</Button>
      {
        fileURL?
          <a href={fileURL} target="_blank">viewFile</a>
        :
          null
      }
    </div>
  );
}




export default LightUp