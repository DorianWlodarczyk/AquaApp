import React from 'react'
import Button from '../../../../../components/button/button'

const EmptyAquariumsList = () => {
  return (
    <div className='h-5/6 flex items-center justify-center text-2xl text-center flex-col'>
      <div className='text-neutral-800'>
        Nie masz jeszcze utworzonych akwariów?
      </div>

      <div className='mt-10'>
        <Button text='Utwórz nowe' />
      </div>
    </div>
  )
}

export default EmptyAquariumsList