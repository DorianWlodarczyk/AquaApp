import React, { useContext } from 'react'
import { SvgIconProps } from '@mui/material';
import { Link } from "react-router-dom";
import { MainContext } from '../../../contexts/main-context';

export interface SidebarButtonProps {
  icon?: React.ReactElement<SvgIconProps>,
  name: string,
  to?: string
}

const SidebarButton = ({ icon, name, to }: SidebarButtonProps) => {
  const mainContext = useContext(MainContext);

  return (
    <Link to={to ? to : "/"}>
      <div className='group w-11/12 h-[40px] flex flex-row items-center hover:bg-neutral-800 cursor-pointer rounded relative'>
        <div className='text-neutral-500 font-medium text-sm' style={{
          paddingLeft: mainContext.isOpen ? '1rem' : '1.2rem'
        }}>
          {icon ? icon : name[0]}
        </div>

        <div className='text-neutral-500 font-medium text-sm' style={{
          paddingLeft: mainContext.isOpen ? '1rem' : ''
        }}>
          {mainContext.isOpen ? name : ''}
        </div>

        {!mainContext.isOpen &&
          <div className='absolute hidden group-hover:block left-[65px] bg-neutral-800 py-2 px-3 text-neutral-400 rounded-md'>
            <div className='absolute left-[-12px] bg-neutral-800 w-3 h-5' style={{
              clipPath: 'polygon(0 50%, 100% 100%, 100% 0)'
            }} />
            {name}
          </div>
        }
      </div>
    </Link>
  )
}

export default SidebarButton