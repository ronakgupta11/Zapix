
`

@public
collection User {

  id: string;
  publicKey: PublicKey;
  name?: string; 
  imageUrl?: string ;
  friends: Users[];
  userPosts: Post[];
  

  constructor () {
    this.id = ctx.publicKey.toHex();
    this.friends = [];
    this.publicKey = ctx.publicKey;
    this.userPosts = [];
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

    if (ctx.publicKey != this.publicKey) {
      error('You are not the creator of this record.');
    }
    this.friends.push(user);
  }
  function addPost(post:Post){
     if (ctx.publicKey != this.publicKey) {
      error('You are not the creator of this record.');
    }
    this.userPosts.push(post);
  }
}

  @public
  collection Post {
    id: string;
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
      this.PostContent = PostContent;
      this.PostImageUrl = PostImageUrl;
      this.owner = owner;
      this.timeStamp = timestamp;
      this.like = 0;
      this.comments = 0;
      this.likedBy = [];
      this.allComments = [];
    }

    function addLike(publicKey:string){
      this.likes+=1;
      this.likedBy.push(publicKey);
    }

    function addComment(comment:Comment){
      this.comments.push(comment);
    }
    function delete(){
      if(this.owner.publicKey != ctx.publicKey){
        error("you can not delete");
        
      }
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

//create collection for chat and in chat messages 
// this will not be public collection as only two users will have access
    
    
  }`