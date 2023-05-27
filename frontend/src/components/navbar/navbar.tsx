import React, { useContext } from 'react'
import { UIContext } from '../../contexts/ui-context';
import MenuIcon from '@mui/icons-material/Menu';
import UserMenu from './user-menu/user-menu';

const Navbar = () => {
  const uiContext = useContext(UIContext);

  return (
    <div className='w-full h-[50px] bg-white drop-shadow flex flex-row justify-between items-center'>
      <div>
        <button className='ml-5 lg:hidden' onClick={() => uiContext.setOpen(!uiContext.isOpen)}>
          <MenuIcon className='text-slate-800' style={{
            fontSize: '28px'
          }} />
        </button>
      </div>

      <div className='h-full'>
        <UserMenu />
      </div>
    </div>
  )
}

export default Navbar