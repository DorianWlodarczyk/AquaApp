import React from 'react'
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';

const PageNotFound = () => {
  return (
    <div className='flex h-5/6 justify-center items-center flex-col select-none text-neutral-400'>
      <NotListedLocationIcon className='' style={{
        fontSize: '192px'
      }} />
      <div className='mt-[20px] text-xl'>Nie znaleziono strony</div>
    </div>
  )
}

export default PageNotFound