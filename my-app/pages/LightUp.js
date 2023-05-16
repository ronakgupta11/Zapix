import React from 'react'
import { ethers } from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';

function LightUp() {


    const encryptionSignature = async() =>{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const messageRequested = (await lighthouse.getAuthMessage(address)).data.message;
        const signedMessage = await signer.signMessage(messageRequested);
        return({
          signedMessage: signedMessage,
          publicKey: address
        });
      }


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
    const sig = await encryptionSignature();
    const response = await lighthouse.uploadEncrypted(
      e,
      "be74ef67.6a825190433a450a872e651c54303d6f",
      sig.publicKey,
      sig.signedMessage,
      progressCallback
    );
    console.log(response);
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
    const cid = "QmSYRjGMpcWXURuDNhzsomYMRaU1YxpFUbAhmAFwYLG43D";

    // Then get auth message and sign
    // Note: the owner of the file should sign the message.
    const {publicKey, signedMessage} = await signAuthMessage();

    const publicKeyUserB = ["0x201Bcc3217E5AA8e803B41d1F5B6695fFEbD5CeD"];
    
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
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const publicKey = (await signer.getAddress()).toLowerCase();
    const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
    const signedMessage = await signer.signMessage(
      messageRequested
    );
    return({publicKey: publicKey, signedMessage: signedMessage});
  }



  

  return (
    <div className="App">
      <input onChange={e=>uploadFileEncrypted(e)} type="file" />
      <button onClick={()=>shareFile()}>share file</button>
    </div>
  );
}




export default LightUp