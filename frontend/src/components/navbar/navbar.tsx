import React, { useContext } from 'react'
import { UIContext } from '../../contexts/ui-context';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const uiContext = useContext(UIContext);

  return (
    <div className='w-full h-[50px] bg-white drop-shadow flex flex-row justify-between items-center'>
      <div>
        <button className='ml-5 md:hidden' onClick={() => uiContext.setOpen(!uiContext.isOpen)}>
          <MenuIcon className='text-slate-800' style={{
            fontSize: '28px'
          }} />
        </button>
      </div>

      <div>
        <MenuIcon className='text-slate-800' />
      </div>
    </div>
  )
}

export default Navbar