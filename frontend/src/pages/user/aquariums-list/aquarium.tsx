import React from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import aquariumImg from '../../../img/aquarium/aquarium.png'

const FishIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="#575757" strokeWidth="32" strokeLinejoin="round" d="M240,152c-50.71,12.21-94.15,52.31-120.3,73.43a261.14,261.14,0,0,0-23.81-19.58C59.53,179.29,16,176,16,176s11.37,51.53,41.36,79.83C27.37,284.14,16,335.67,16,335.67s43.53-3.29,79.89-29.85a259.18,259.18,0,0,0,23.61-19.41C145.6,307.55,189.24,347.75,240,360l-16,56c39.43-6.67,78.86-35.51,94.72-48.25C448,362,496,279,496,256c0-22-48-106-176.89-111.73C303.52,131.78,263.76,102.72,224,96Z" /><circle cx="416" cy="239.99" r="16" /><path fill="none" stroke="#575757" strokeWidth="32" strokeLinecap="round" strokeMiterlimit="20" d="M378.37,356a199.22,199.22,0,0,1,0-200" /></svg>
  )
}

const Aquarium = () => {
  return (
    <div className='bg-white flex flex-row shadow rounded cursor-pointer group '>
      <div className='h-full flex items-center'>
        <div className='w-[65px] h-[65px] sm:w-[75px] sm:h-[75px] md:w-[100px] md:h-[100px] my-4 ml-5'>
          <img src={aquariumImg} alt="" />
        </div>
      </div>
      <div className='my-4 ml-3 w-full'>
        <div className='w-full text-center text-xl font-normal'>
          <div className='px-3'>
            {`Bardzo długa nazwa akwarium`}
          </div>
        </div>

        <div className='flex flex-row w-full justify-around mt-5'>
          <div className='text-2xl flex'>
            <div className='flex items-center text-base'>
              69x
            </div>
            <div className='w-[35px] ml-1 flex items-center'>
              <FishIcon />
            </div>
          </div>

          <button className='w-[50px] h-[50px] group-hover:bg-neutral-100 rounded-full duration-200'>
            <div>
              <NavigateNextIcon />
            </div>
          </button>
        </div>


      </div>
    </div>
  )
}

export default Aquarium