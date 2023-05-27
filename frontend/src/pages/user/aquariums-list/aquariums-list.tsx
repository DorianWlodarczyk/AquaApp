// import React, { useState } from 'react'
import EmptyAquariumsList from './empty-list/empty-aquariums-list';
import AddIcon from '@mui/icons-material/Add';
const AquariumsList = () => {
  // const [aa, setAA] = useState(true);

  if (false)
    return (<EmptyAquariumsList />)

  return (
    <>
      <button className='w-[64px] h-[64px] bg-sky-600 hover:bg-sky-500 fixed right-[5%] bottom-[5%] rounded-full flex items-center justify-center shadow-lg duration-100'>
        <AddIcon className='text-white' style={{ fontSize: '36px' }} />
      </button>
    </>
  )
}

export default AquariumsList