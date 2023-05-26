import React, { useContext } from 'react'
import SidebarButton, { SidebarButtonProps } from './sidebar-button/sidebar-button'
import { MainContext } from '../../contexts/main-context'

export interface Category {
    headerName?: string,
    buttons?: SidebarButtonProps[]
}
interface props {
  categories: Category[],
}

const renderButtons = (buttons?: SidebarButtonProps[]) => {
  return (
    <>
      {buttons?.map((item: SidebarButtonProps, index) => {
        return(
          <div key={index}>
            <SidebarButton
              name={item.name}
            />
          </div>
        )
      })}
    </>
  )
}

const Categories = ({categories}: props) => {
  return (
    <>
      {categories.map((item: Category, index) => {
        return (
          <div key={index} className='text-neutral-500 font-medium pl-5 mt-5 text-sm'>
            <div className='mb-2'>
              {item.headerName}
            </div>
            <div className=''>
              {renderButtons(item.buttons)}
            </div>
          </div>
        )
      })}
    </>
  )
}

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
const mainContext = useContext(MainContext);

  return(
    <div className='h-[50px] bg-neutral-700 flex flex-col justify-center'>
      <div className='h-[40px] w-[40px] bg-neutral-500 rounded-md ml-auto mr-2 cursor-pointer select-none'>
        <div className='h-full flex justify-center items-center text-xl' onClick={() => mainContext.setOpen(!mainContext.isOpen)}>
          {"<"}
        </div>
      </div>
    </div>
  )
}


const Sidebar = ({categories}: props) => {
  return (
    <div className='bg-neutral-900 w-[225px] h-[100vh] flex flex-col justify-between'>
      <div>
        <Header/>
        <Categories categories={categories}/>
      </div>
      <Footer/>
    </div>
  )
}

export default Sidebar