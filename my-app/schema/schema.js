`


@public
collection User {

  id: string;
  publicKey: PublicKey;
  name?: string; 
  imageUrl?: string ;
  friends: Users[];
  userPosts: Post[];
  approvedChat: Chat[];
  
  
  

  constructor (id:string) {
    this.id = id;
    this.friends = [];
    this.publicKey = ctx.publicKey;
    this.userPosts = [];
    this.approvedChat = [];
  }

  function setName (name: string) {
    if (ctx.publicKey != this.publicKey) {
      error('You are not the creator of this record.');
    }
    this.name = name;
  }
  function setImage (imageUrl: string) {

    if (ctx.publicKey != this.publicKey) {
      error('You are not the creator of this record.');
    }
    this.imageUrl = imageUrl;
  }
  function addFriend (user: User) {

    this.friends.push(user);
  }
  function addPost(post:Post){
     if (ctx.publicKey != this.publicKey) {
      error('You are not the creator of this record.');
    }
    this.userPosts.push(post);
  }
  function createChat(chat:Chat){
    this.approvedChat.push(chat);
    
  }
  del(){
    selfdestruct();
  }

}

@public
collection Post {
  

  id: string;
  ownerID:string;
  publicKey: PublicKey;
  timeStamp:string;
  owner:User;
  PostContent: string;
  PostImageUrl:string;
  likes: number;
  comments: number;
  likedBy: string[];
  allComments: Comment[];

  constructor (id: string, PostContent: string,PostImageUrl: string,owner:User,timestamp:string) {
    this.id = id;
    this.ownerID = ctx.publicKey.toHex();
    this.publicKey = ctx.publicKey;
    this.PostContent = PostContent;
    this.PostImageUrl = PostImageUrl;
    this.owner = owner;
    this.timeStamp = timestamp;
    this.likes = 0;
    this.comments = 0;
    this.likedBy = [];
    this.allComments = [];
    }

    function addLike(likeBy:string){
      this.likes+=1;
      this.likedBy.push(likeBy);
    }

    function addComment(comment:Comment){
      this.comments+=1;
      this.allComments.push(comment);
    }
    function del(){
     
      selfdestruct();
    }
  }


@public
collection Comment{
    id:string;
    timeStamp:string;
    content:string;
    postBy:User;
    constructor(id:string,timestamp:string,content:string,postby:User){
      this.id = id;
      this.timeStamp = timestamp;
      this.content = content;
      this.postBy = postby;
    }
}

@public
collection Message{
  id:string;
  message:string;
  msgImageCID:string;
  constructor(id:string,message:string,msgImageCID:string){
    this.id = id;
    this.message = message;
    this.msgImageCID = msgImageCID;
    
  }
  
    
  }

@public 
collection Chat{
  id:string;
  creator:User;
  chatWith:User;
  allMessages:Message[];
  constructor(id:string,creator:User,chatWith:User){
    this.id = id;
    this.creator = creator;
    this.chatWith = chatWith;
    this.allMessages = [];
    
  }
  function addMessage(message:Message){
    
    this.allMessages.push(message);
    
  }
}

//create collection for chat and in chat messages 
// this will not be public collection as only two users will have access

  
    
    
  `