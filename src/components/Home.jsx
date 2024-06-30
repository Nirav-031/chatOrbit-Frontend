import React from 'react'
import logo from '../assets/chatorbit.svg';
function Home() {
  return (
    <div className='w-[80vw] md:w-[68%] h-full flex justify-center flex-col items-center bg-white rounded-lg ml-1 border-[1px] border-gray-300 '>
          <div className='w-full h-[30vh] flex flex-col justify-center items-center lg:space-y-5'>
            <div className='w-[60%] h-[60%] lg:w-[35%] lg:h-[35%]'>
              <img src={logo} alt="" className='w-full h-full' />
            </div>
            <div className='text-black font-poppins font-semibold text-[12px] lg:text-lg'>Seamless Conversations, Endless Possibilities</div>
          </div>
        </div>
  )
}

export default Home