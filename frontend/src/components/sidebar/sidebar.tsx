import React, { useContext } from 'react'
import SidebarButton, { SidebarButtonProps } from './sidebar-button/sidebar-button'
import { MainContext } from '../../contexts/main-context'
import style from './sidebar.module.css'
export interface Category {
  headerName?: string,
  buttons?: SidebarButtonProps[]
}
interface props {
  categories: Category[],
}

const Sidebar = ({ categories }: props) => {
  const mainContext = useContext(MainContext);

  const renderButtons = (buttons?: SidebarButtonProps[]) => {
    return (
      <>
        {buttons?.map((item: SidebarButtonProps, index) => {
          return (
            <div key={index} className=''>
              <SidebarButton
                name={item.name}
              />
            </div>
          )
        })}
      </>
    )
  }

  const Categories = ({ categories }: props) => {
    return (
      <>
        {categories.map((item: Category, index) => {
          return (
            <div key={index} className='text-neutral-500 font-medium mt-5 text-sm' style={{
              paddingLeft: mainContext.isOpen ? '10px' : '0px'
            }}>
              <div className='mb-2'>
                {mainContext.isOpen ? item.headerName : ''}
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
          <div className='text-white text-center' style={{
            fontSize: mainContext.isOpen ? '1.25rem' : '0.7rem'
          }}>
            AQUA FRIENDS
          </div>
        </div>
        <hr className='mx-3 h-[2px] border-0 bg-gradient-to-r from-transparent via-neutral-500 to-transparent' />
      </div>
    )
  }

  const Footer = () => {
    return (
      <div className='h-[50px] bg-neutral-700 flex flex-col justify-center'>
        <div className='h-[40px] w-[40px] bg-neutral-500 rounded-md ml-auto mr-2 cursor-pointer select-none'>
          <div className='h-full flex justify-center items-center text-xl' onClick={() => mainContext.setOpen(!mainContext.isOpen)}>
            {"<"}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {mainContext.isOpen && <div className={style.blackout} onClick={() => mainContext.setOpen(false)}>s</div>}
      <div className={`z-5 bg-neutral-900 h-[100vh] flex flex-col justify-between duration-100 ${mainContext.isOpen ? style.sidebarOpen : style.sidebarCollapsed}`}>
        <div>
          <Header />
          <Categories categories={categories} />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Sidebar