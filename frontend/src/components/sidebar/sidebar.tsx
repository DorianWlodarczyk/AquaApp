import React from 'react'
import SidebarButton from './sidebar-button/sidebar-button'

export interface SidebarProps {
  headerName?: String,
}

const Sidebar = ({headerName}: SidebarProps) => {

  const Header = () => {
    return (
      <div>
        <div className='w-full h-[50px] flex items-center justify-center flex-col'>
          <div className='text-white text-xl '>
            AQUA FRIENDS
          </div>
        </div>
        <hr className='mx-3 h-[2px] border-0 bg-gradient-to-r from-transparent via-neutral-500 to-transparent' />
      </div>

    )
  }

  const Footer = () => {
    return(
      <div className='h-[50px] bg-neutral-700 flex flex-col justify-center'>
        <div className='h-[40px] w-[40px] bg-neutral-500 rounded-md ml-auto mr-2 cursor-pointer select-none'>
          <div className='h-full flex justify-center items-center text-xl'>
            {"<"}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-neutral-900 w-[225px] h-[100vh] flex flex-col justify-between'>
      <div>
        <Header/>
      </div>
      <Footer/>
    </div>
  )
}

export default Sidebar