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
        <Aquarium
          name='Akwarium na komodzie'
          aquariumID='1'
          fishNumber={21}
        />

        <Aquarium
          name='Wanna'
          aquariumID='11'
          fishNumber={37}
        />

        <Aquarium
          name='Akwarium przy TV'
          aquariumID='5'
          fishNumber={6}
        />

        <Aquarium
          name='Akwarium u sąsiada'
          aquariumID='10'
          fishNumber={9}
        />

        <Aquarium
          name='Zwykłe akwarium'
          aquariumID='7'
          fishNumber={420}
        />

        <div className='group h-[130px] rounded-3xl border-dashed border-neutral-400 hover:border-neutral-500 border-[4px] flex items-center justify-center flex-row cursor-pointer select-none'>
          <div className='text-neutral-400 group-hover:text-neutral-500 font-bold'>
            Dodaj nowe akwarium
          </div>
        </div>

      </div>
      <button className='w-[64px] h-[64px] bg-sky-600 hover:bg-sky-500 fixed right-[5%] bottom-[5%] rounded-full flex items-center justify-center shadow-lg duration-100'>
        <AddIcon className='text-white' style={{ fontSize: '36px' }} />
      </button>
    </>
  )
}

export default AquariumsList