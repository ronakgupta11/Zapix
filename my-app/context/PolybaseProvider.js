import React, { useContext } from 'react'
import { createContext } from 'react'
import { Polybase } from "@polybase/client";
import { AuthContext } from './AuthProvider';
export const PolybaseContext = createContext()



export const PolybaseProvider = ({children})=>{
  const{currentPKP,signMessage} = useContext(AuthContext);


  const db = new Polybase({
    defaultNamespace: "pk/0xf50ea4b6ca184c2a54567099bab8960e4057f80161262704102502bacb76b8029902b6bab1a9dcac5701c816db1834ec27760b2ddc6b9efaedcb3fc0906b4aea/new-social-app-2",
  });


  const userCollectionReference = db.collection("User");
  // const userID = "0x"+currentPKP?.publicKey.slice(4)
  const userID = currentPKP?.ethAddress;
  const userRecordRef = userCollectionReference.record(userID);
  const postCollectionReference = db.collection("Post");
  const commentCollectionReference = db.collection("Comment");
  const chatCollectionReference = db.collection("Chat");
  const messageCollectionReference = db.collection("Message");


  //check is user profile already created 
const checkUser = async()=>{

  const records = await userCollectionReference.where("id", "==", userID).get();
  console.log("pub key",currentPKP?.publicKey)
  console.log(records.data.length)
  
  return records.data.length

}

// create new user
const createUser = async()=>{
 
  
  
    db.signer(async(data)=>{
      const signature = await signMessage(data)
      return {h:"eth-personal-sign",sig:signature}
    })
    
    const res = await userCollectionReference.create([userID])
    console.log("user create",res)
    
  
  
}

async function setName (name) {
  db.signer(async(data)=>{
    const signature = await signMessage(data)
    return {h:"eth-personal-sign",sig:signature}
  })
  // .create(functionName, args) args array is defined by the updateName fn in collection schema
  const recordData = await userRecordRef.call("setName", [name]);
    return recordData;
}

async function setImage (image) {
  db.signer(async(data)=>{
    const signature = await signMessage(data)
    return {h:"eth-personal-sign",sig:signature}
  })
  // .create(functionName, args) args array is defined by the updateName fn in collection schema
  const recordData = await userRecordRef
    .call("setImage", [image]);
    return recordData;
}

async function addFriend(friendPK){
  db.signer(async(data)=>{
    const signature = await signMessage(data)
    return {h:"eth-personal-sign",sig:signature}
  })
  const recordData = await userRecordRef
    .call("addFriend", [await userCollectionReference.record(friendPK).get()]);
    return recordData;

}

async function createPost(id,PostContent,PostImageUrl,timeStamp){
  db.signer(async(data)=>{
    const signature = await signMessage(data)
    return {h:"eth-personal-sign",sig:signature}
  })
  const user = db.collection("User").record(userID)
  
   const recordData = await postCollectionReference.create([id,PostContent,PostImageUrl,user,timeStamp])
return recordData;
}

async function addPost(id,PostContent,PostImageUrl,timeStamp){
  db.signer(async(data)=>{
    const signature = await signMessage(data)
    return {h:"eth-personal-sign",sig:signature}
  })
  const res = await createPost(id,PostContent,PostImageUrl,timeStamp);
  const postId = res.data.id;

  const postRef =  postCollectionReference.record(postId);
  const response = await userRecordRef.call("addPost",[postRef])
  return response
}

async function addLike(postId){
  db.signer(async(data)=>{
    const signature = await signMessage(data)
    return {h:"eth-personal-sign",sig:signature}
  })
  const res = await postCollectionReference.record(postId).call("addLike",[userID])
}

async function createComment(id,timeStamp,content){
  db.signer(async(data)=>{
    const signature = await signMessage(data)
    return {h:"eth-personal-sign",sig:signature}
  })
  const user = userRecordRef;
  const res = await commentCollectionReference.create([id,timeStamp,content,user])
  return res;

}
async function addComment(postId,id,timeStamp,content){
  db.signer(async(data)=>{
    const signature = await signMessage(data)
    return {h:"eth-personal-sign",sig:signature}
  })
  const res = await createComment(id,timeStamp,content);
  const commentId = res.data.id;

  const commentRef =  commentCollectionReference.record(commentId);
  const response = await postCollectionReference.record(postId).call("addComment",[commentRef])
  return response
}

async function deletePost(postId){
  db.signer(async(data)=>{
    const signature = await signMessage(data)
    return {h:"eth-personal-sign",sig:signature}
  })

  const res = await postCollectionReference.record(postId).call("del",[])
  return res
}
async function createChat(id,chatWithID){

  db.signer(async(data)=>{
    const signature = await signMessage(data)
    return {h:"eth-personal-sign",sig:signature}
  })
  const creator = userRecordRef;
  const chatWith = userCollectionReference.record(chatWithID)

  const res = await chatCollectionReference.create([id,creator,chatWith])

  const createdChat =  chatCollectionReference.record(id);
  // add chat to both users 
  const res1 = await userRecordRef.call("createChat",[createdChat])
  const res2 = await userCollectionReference.record(chatWithID).call("createChat",[createdChat])


  console.log("chat created and added to both user approved chat list")

  return res
}




async function createMessage(id,message,messageImage){
  db.signer(async(data)=>{
    const signature = await signMessage(data)
    return {h:"eth-personal-sign",sig:signature}
  })
  await messageCollectionReference.create([id,message,messageImage])
  console.log("message created");


}
async function addMessageToChat(chatId,messageId){
  const msg = messageCollectionReference.record(messageId);
  await chatCollectionReference.record(chatId).call("addMessage",[msg])


}
async function deleteUser(){
  db.signer(async(data)=>{
    const signature = await signMessage(data)
    return {h:"eth-personal-sign",sig:signature}
  })
  await userRecordRef.call("del",[])
}
  return(
    <PolybaseContext.Provider
    value={{
      checkUser,
      createUser,
      setName,
      setImage,
      addFriend,
      addPost,
      addLike,
      addComment,
      deletePost,
      createChat,
      createMessage,
      addMessageToChat,
      deleteUser,
      postCollectionReference,
      userCollectionReference,
      userRecordRef,
      commentCollectionReference,
      chatCollectionReference,
      messageCollectionReference,
      userID,
      
      


    }}
    >
      {children}

    </PolybaseContext.Provider>
  )
}

