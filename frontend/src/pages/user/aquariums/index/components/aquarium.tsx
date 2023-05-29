import React from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import getAquariumImg from '../../../../../utils/images/aquarium-image'
import { getRandomFishIcon } from '../../../../../utils/images/fish-icon';

interface props {
  id: string,
  name: string,
  fishNumber: number,
  imgID: string
}

const Aquarium = ({ name, id, fishNumber, imgID }: props) => {
  return (
    <div className='bg-white flex flex-row shadow rounded cursor-pointer group hover:bg-neutral-50'>
      <div className='h-full flex items-center'>
        <div className='w-[65px] h-[65px] sm:w-[75px] sm:h-[75px] md:w-[100px] md:h-[100px] my-4 ml-5'>
          <img src={getAquariumImg(imgID)} alt="" />
        </div>
      </div>
      <div className='my-4 ml-3 w-full'>
        <div className='w-full text-center text-xl font-normal'>
          <div className='px-3'>
            {name}
          </div>
        </div>

        <div className='flex flex-row w-full justify-around mt-5'>
          <div className='text-2xl flex'>
            <div className='flex items-center text-xl font-medium pr-2 text-neutral-500'>
              {`${fishNumber}x`}
            </div>
            <div className='w-[35px] ml-1 flex items-center'>
              <img src={getRandomFishIcon()} alt="" />
            </div>
          </div>

          <button className='w-[50px] h-[50px] group-hover:bg-sky-500 bg-sky-300 rounded-full duration-200'>
            <div>
              <NavigateNextIcon style={{ color: 'white', fontSize: '28px' }} />
            </div>
          </button>
        </div>


      </div>
    </div>
  )
}

export default Aquarium