import React from 'react'

const Aquarium = () => {
  return (
    <div className='bg-white flex flex-row'>
      <div className='h-full flex items-center'>
        <div className='w-[75px] h-[75px] sm:w-[100px] sm:h-[100px] my-4 ml-3 bg-red-600'>

        </div>
      </div>
      <div className='my-4 ml-3'>
        <div>
          Nazwa akwarium
        </div>

        <div>
          69 Ryb
        </div>

        <button>
          {`>`}
        </button>

      </div>
    </div>
  )
}

export default Aquarium