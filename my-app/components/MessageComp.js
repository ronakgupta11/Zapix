import React from 'react'

function MessageComp() {
  return (
    <div className='flex flex-col items-center justify-center p-2 text-gray-500 dark:text-white border-t border-b dark:border-gray-600'>
        <div>from: </div>
        <img className='h-64 rounded-lg mx-auto my-4' src="favicon.ico">
        </img>
        <div>hry thid is sample caht</div>
    </div>
  )
}

export default MessageComp