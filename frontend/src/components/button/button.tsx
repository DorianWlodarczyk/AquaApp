import { SvgIconProps } from '@mui/material'
import React from 'react'

interface props {
  text?: string,
  onClick?: () => void,
  icon?: React.ReactElement<SvgIconProps>
}

const Button = ({ text, onClick, icon }: props) => {
  return (
    <button className='bg-blue-500 p-3 text-base text-white rounded-lg font-semibold'>
      {text}
    </button>
  )
}

export default Button