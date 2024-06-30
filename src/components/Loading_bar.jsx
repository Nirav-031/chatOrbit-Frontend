import React from 'react'
import { Bars } from 'react-loader-spinner'

function Loading_bar() {
  return (
    <div className='  flex justify-center flex-col items-center '>
        <Bars
          height="40"
          width="40"
          color="#"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
            />
            <br/>
            <p className="mt-4 text-lg font-semibold">Loading...</p>
          </div>
  )
}

export default Loading_bar