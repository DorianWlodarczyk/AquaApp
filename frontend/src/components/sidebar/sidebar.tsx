import React from 'react'

export interface SidebarProps {
  headerName?: String,
}

const Sidebar = ({headerName}: SidebarProps) => {

  const Header = () => {
    return (
      <div>header</div>
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
    <div className='bg-neutral-900 w-[200px] h-[100vh] flex flex-col justify-between'>
      <Header/>
      <Footer/>
    </div>
  )
}

export default Sidebar

