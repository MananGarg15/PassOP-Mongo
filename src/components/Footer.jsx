import React from 'react'

const Footer = () => {
  return (
    <div className='fixed bottom-0 bg-pink-300 w-full flex flex-col justify-center items-center '>
      <div className='logo font-bold text-xl'>
        <span className='text-red-800'>&lt;</span>Pass
        <span className='text-red-800'>OP/&gt;</span>
      </div>
      <div className='flex justify-around gap-20'>
        <div className=''> ~Created by Manan Garg</div>
        <div className=''>&copy;All Rights Reserved </div>
      </div>
    </div>
  )
}

export default Footer
