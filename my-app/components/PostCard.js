
import React from 'react'
import AvatarC from './AvatarC'
import Link from 'next/link'
import {IoIosHeartEmpty,IoIosHeart} from "react-icons/io"
import {BsChat} from "react-icons/bs"


function PostCard(props) {
    const liked = true
//     const likeIcon = liked?<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb" className="w-6 h-6">
//     <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
//   </svg>:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffffff" className="w-6 h-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
// </svg>
const likeIcon = liked?<IoIosHeart className='h-5 w-5'/>:<IoIosHeartEmpty className='h-5 w-5'/>

  

  return (
    <div className='card w-1/2 border border-gray-200 dark:border-borderCol rounded-lg dark:bg-primary-focus  items-center justify-center flex flex-col  m-auto mb-4'>
        {/* user info */}
        <div class="flex items-center space-x-4 w-full rounded-tl-lg rounded-tr-lg h-16 p-4 bg-light-secondary dark:bg-secondary border-b dark:border-gray-600">
        <AvatarC image = {props.image}/>
        <div class="font-medium dark:text-white">
            <div className='text-black dark:text-white'>Ronak Gupta</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">2 hours ago</div>
        </div>
        </div>
         {/* post info */}
        <div className='post-info w-full p-4'>
            <div className='post-text m-2 dark:text-textCol text-gray-500 italic'>
                {props.textContent}
            </div>
            <Link href={"/"}><img className="m-2 rounded-lg " src={props.image}></img></Link>
            
        </div>
        {/* post interaction buttton */}

        <div className='flex flex-col items-center bg-light-secondary dark:bg-secondary w-full border-t dark:border-gray-600 rounded-bl-lg rounded-br-lg'>
        <div className='post-interaction flex w-full items-center px-6 m-2 dark:bg-secondary'>
            <div className=' flex items-center mr-4'>
                {likeIcon}
                <div className='interacion-text ml-2 text-gray-500 dark:text-white'>
                    12 likes
                </div>                
            </div>
            <div className=' flex items-center'>
            <BsChat className='h-5 w-5'/>

                <div className='interacion-text ml-2 text-gray-500 dark:text-white'>
                    0 comments
                </div>                
            </div>

        </div>
        {/* comments */}
        <div className='comments w-full m-2 pl-4 pr-4'>
            {/* <div class="relative flex w-full justify-between items-center">
                <input type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border border-gray-300 appearance-none dark:text-white bg-transparent dark:border-primary-focus dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Add Comments</label>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#2563eb" className="w-6 h-6 ml-2 -rotate-45">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>

            </div> */}
            <div className='text-sm m-1 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'>
                <Link href={"/"}>view all comments</Link>
            </div>

        </div>

            
        </div>

    </div>
  )
}

export default PostCard