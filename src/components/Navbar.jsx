import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-pink-300 flex justify-between sm:px-[50px] md:px-[150px] py-2 items-center mb-14'>
      <div className='logo font-bold text-xl'>
        <span className='text-red-800'>&lt;</span>Pass
        <span className='text-red-800'>OP/&gt;</span>
      </div>
  
      {/* Git Logo Button */}
      <button className='bg-pink-700 rounded-full flex items-center pr-2 text-pink-100 ring-1 ring-pink-100'>
        <img src='GLogo.png' alt='Github Logo' className='w-10 invert' />
        <span className='font-bold'>GitHub</span>
      </button>
    </nav>
  )
}

export default Navbar
