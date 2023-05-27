// import React, { useState } from 'react'
import Aquarium from './aquarium';
import EmptyAquariumsList from './empty-list/empty-aquariums-list';
import AddIcon from '@mui/icons-material/Add';
const AquariumsList = () => {
  // const [aa, setAA] = useState(true);

  if (false)
    return (<EmptyAquariumsList />)

  return (
    <>
      <div className='m-5 grid 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-7'>
        <Aquarium />
        <Aquarium />
        <Aquarium />
        <Aquarium />
      </div>
      <button className='w-[64px] h-[64px] bg-sky-600 hover:bg-sky-500 fixed right-[5%] bottom-[5%] rounded-full flex items-center justify-center shadow-lg duration-100'>
        <AddIcon className='text-white' style={{ fontSize: '36px' }} />
      </button>
    </>
  )
}

export default AquariumsList