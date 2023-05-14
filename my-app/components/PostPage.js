import React from 'react'
import Avatar from './AvatarC'
import Link from 'next/link'
import {IoIosHeartEmpty,IoIosHeart} from "react-icons/io"
import {BsChat} from "react-icons/bs"

function PostPage(props) {
    const liked = false
    const likeIcon = liked?<IoIosHeart className='h-5 w-5'/>:<IoIosHeartEmpty className='h-5 w-5'/>
  return (
    <div >
        <section className='w-1/2 p-12 m-auto'>
        <div class="flex items-center space-x-4 w-full border-b dark:border-gray-600  h-16 p-4">
        <Avatar image = {props.image}/>
        <div class="font-medium dark:text-white">
            <div>Ronak Gupta</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">2 hours ago</div>
        </div>
        </div>
         {/* post info */}
        <div className='post-info w-full p-4 border-b dark:border-gray-600 mb-2'>
            <div className='post-text m-2 text-white text-lg italic'>
                this is a test post card
            </div>
            <Link href={"/"}><img className="m-2 rounded-lg " src='favicon.ico'></img></Link>
            
        </div>
        <div className='post-interaction flex w-full items-center justify-between p-2'>
            <div className=' flex items-center'>
                {likeIcon}
                <div className='interacion-text ml-2 dark:text-white text-gray-500'>
                    12 likes
                </div>                
            </div>
            <div className=' flex items-center'>
<BsChat className='h-5 w-5'/>

                <div className='interacion-text ml-2 dark:text-white text-gray-500'>
                    0 comments
                </div>                
            </div>

        </div>
        </section>

        <section class="bg-white dark:bg-gray-900 py-8 lg:py-16 comments-section">
  <div class="max-w-2xl mx-auto px-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">All Comments</h2>
    </div>
    <form class="mb-6">
        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label for="comment" class="sr-only">Your comment</label>
            <textarea id="comment" rows="6"
                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..." required></textarea>
        </div>
        <button type="submit"
            class="inline-flex btn btn-primary bg-buttonCol items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg  hover:bg-primary-800">
            Post comment
        </button>
    </form>

    <article class="p-6 mb-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
        <footer class="flex justify-between items-center mb-2">
            <div class="flex items-center">
                <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
                        class="mr-2 w-6 h-6 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                        alt="Bonnie Green"/>Bonnie Green</p>
                <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-03-12"
                        title="March 12th, 2022">Mar. 12, 2022</time></p>
            </div>

        </footer>
        <p class="text-gray-500 dark:text-gray-400">The article covers the essentials, challenges, myths and stages the UX designer should consider while creating the design strategy.</p>

    </article>
  </div>
</section>
    </div>
  )
}

export default PostPage