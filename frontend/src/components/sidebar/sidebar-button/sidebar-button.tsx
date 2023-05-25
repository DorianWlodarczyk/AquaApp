import React from 'react'
import { SvgIconProps } from '@mui/material';
import { Link } from "react-router-dom";

export interface SidebarButtonProps {
  icon?: React.ReactElement<SvgIconProps>,
  name: string,
  to?: string
}

const SidebarButton = ({icon, name, to}: SidebarButtonProps) => {
  return (
    <Link to={to ? to : "/"}>
      <div className='w-11/12 h-[40px] flex flex-row items-center hover:bg-neutral-800 cursor-pointer rounded'>
        <div className='text-neutral-500 pl-3 font-medium text-sm'>
          {icon ? icon : name[0]}
        </div>

        <div className='text-neutral-500 pl-3 font-medium text-sm'>
          {name}
        </div>
      </div>
    </Link>
  )
}

export default SidebarButton