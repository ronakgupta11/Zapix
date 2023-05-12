import React from 'react'
import Avatar from './Avatar'
import Link from 'next/link'

function PostPage(props) {
    const liked = false
    const likeIcon = liked?<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb" className="w-6 h-6">
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  </svg>:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffffff" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
</svg>
  return (
    <div >
        <section className='w-1/2 p-12 m-auto'>
        <div class="flex items-center space-x-4 w-full  h-16 p-4">
        <Avatar image = {props.image}/>
        <div class="font-medium dark:text-white">
            <div>Ronak Gupta</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">2 hours ago</div>
        </div>
        </div>
         {/* post info */}
        <div className='post-info w-full p-4'>
            <div className='post-text m-2 text-white text-lg italic'>
                this is a test post card
            </div>
            <Link href={"/"}><img className="m-2 rounded-lg " src='favicon.ico'></img></Link>
            
        </div>
        <div className='post-interaction flex w-full items-center justify-between m-2'>
            <div className=' flex items-center'>
                {likeIcon}
                <div className='interacion-text ml-2 text-white'>
                    12 likes
                </div>                
            </div>
            <div className=' flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffffff" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
</svg>

                <div className='interacion-text ml-2 text-white'>
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