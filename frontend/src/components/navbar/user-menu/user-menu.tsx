import React, { useState } from 'react'
import NavbarButton from '../navbar-button/navbar-button';

const UserMenu = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className='flex items-center h-full cursor-pointer mr-3'>
        <div className='rounded-full w-[43px] h-[43px] hover:bg-neutral-200 flex items-center justify-center'>
          <button
            onClick={() => setOpen(!isOpen)}
            className='flex items-center justify-center w-[35px] h-[35px] text-white text-lg rounded-full font-bold'
            style={{
              background: 'linear-gradient(131deg, rgba(74, 108, 243, 1) 0%, rgba(57, 188, 245, 1) 21%, rgba(118, 91, 219, 1) 79%, rgba(74, 108, 243, 1) 100%)'
            }}>
            R
          </button>
        </div>
      </div>

      {isOpen &&
        <div className='min-w-[150px] absolute right-[15px] top-[60px] bg-neutral-800 rounded-lg'>
          <NavbarButton
            text='Konto'
          />

          <NavbarButton
            text='Wyloguj'
          />
        </div>
      }
    </>

  )
}

export default UserMenu