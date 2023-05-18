import React, { useContext } from 'react'
import { createContext } from 'react'
import { Polybase } from "@polybase/client";
import { AuthContext } from './AuthProvider';
export const PolybaseContext = createContext()



export const PolybaseProvider = ({children})=>{
  const{currentPKP,signMessage} = useContext(AuthContext);


  const db = new Polybase({
    defaultNamespace: "pk/0xf50ea4b6ca184c2a54567099bab8960e4057f80161262704102502bacb76b8029902b6bab1a9dcac5701c816db1834ec27760b2ddc6b9efaedcb3fc0906b4aea/social-web-app",
  });


  const userCollectionReference = db.collection("User");
  const postCollectionReference = db.collection("Post");
  const commentCollectionReference = db.collection("Comment");


  //check is user profile already created 
const checkUser = async(publicKey)=>{

  const records = await userCollectionReference.where("id", "==", publicKey).get();
  
  return records.data.length
}

// create new user
const createUser = async(publicKey)=>{
 
  const result = await checkUser(publicKey)
  if(!result){
    db.signer(async(data)=>{
      const signature = await signMessage(data)
      return {h:"eth-personal-sign",sig:signature}
    })
    
    await userCollectionReference.create()
    
  }
  
}

async function setName (publicKey,name) {
  db.signer(async(data)=>{
    const signature = await signMessage(data)
    return {h:"eth-personal-sign",sig:signature}
  })
  // .create(functionName, args) args array is defined by the updateName fn in collection schema
  const recordData = await userCollectionReference
    .record(publicKey)
    .call("setName", [name]);
    return recordData;
}

async function setImage (publicKey,image) {
  db.signer(async(data)=>{
    const signature = await signMessage(data)
    return {h:"eth-personal-sign",sig:signature}
  })
  // .create(functionName, args) args array is defined by the updateName fn in collection schema
  const recordData = await userCollectionReference
    .record(publicKey)
    .call("setImage", [image]);
    return recordData;
}

  return(
    <PolybaseContext.Provider
    value={{

    }}
    >
      {children}

    </PolybaseContext.Provider>
  )
}

