import { SvgIconProps } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

interface props {
  text: string,
  to?: string,
  icon?: React.ReactElement<SvgIconProps>,
  onClick?: () => void,
}

const NavbarButton = ({ text, to, icon, onClick }: props) => {

  const OnClick = ({ children }: any) => {
    return (
      <>
        {onClick ? <button className='w-full h-full m-0 p-0' onClick={onClick}>{children}</button> : children}
      </>
    )
  }

  const To = ({ children }: any) => {
    return (
      <>
        {to ? <Link className='w-full h-full m-0 p-0' to={to}>{children}</Link> : children}
      </>
    )
  }

  return (
    <div className='m-2'>
      <To>
        <OnClick>
          <div className='flex flex-row text-neutral-400 p-2 hover:bg-neutral-700 text-sm font-semibold cursor-pointer rounded'>
            <div className=''>
              {icon ? icon : text[0]}
            </div>

            <div className='ml-2'>
              {text}
            </div>
          </div>
        </OnClick>
      </To>
    </div>
  )
}

export default NavbarButton