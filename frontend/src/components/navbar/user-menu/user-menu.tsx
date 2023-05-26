import React from 'react'

const UserMenu = () => {
  return (
    <div className='flex items-center h-full cursor-pointer mr-3'>
      <div
        className='flex items-center justify-center w-[35px] h-[35px] text-white rounded-full font-bold'
        style={{
          background: 'linear-gradient(131deg, rgba(74, 108, 243, 1) 0%, rgba(57, 188, 245, 1) 21%, rgba(118, 91, 219, 1) 79%, rgba(74, 108, 243, 1) 100%)'
        }}>
        R
      </div>
    </div>
  )
}

export default UserMenu