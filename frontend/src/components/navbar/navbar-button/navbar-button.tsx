import { SvgIconProps } from '@mui/material'
import React from 'react'

interface props {
  text: string,
  to?: string,
  icon?: React.ReactElement<SvgIconProps>,
  onClick?: () => void,
}

const NavbarButton = ({ text, to, icon, onClick }: props) => {
  return (
    <div className='flex flex-row text-neutral-400 hover:bg-neutral-700 p-2 m-2 text-sm font-semibold cursor-pointer rounded'>
      <div className=''>
        {icon ? icon : text[0]}
      </div>

      <div className='ml-2'>
        {text}
      </div>
    </div>
  )
}

export default NavbarButton