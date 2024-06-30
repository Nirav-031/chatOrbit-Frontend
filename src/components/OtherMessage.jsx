import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';

function OtherMessage({ msg }) {
  const scroll = useRef();
  const userID = useSelector(state => state.user);
  const {selectedUser} = useSelector(state => state.user);


  
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[msg])
  return (
   msg?.map((msg) => {
                                  return <div key={msg._id} ref={scroll} className={`z-0 flex ${msg.sender==userID.user.id?`justify-end`:`justify-start`}  mb-5 p-2`}>
                                    <div className={`flex w-auto ${msg.sender == userID.user.id ? `bg-gray-200` : `bg-[#6059ca]`}  rounded-sm p-3`}>
                                      <div className={`w-full text-sm   ${msg.sender == userID.user.id ? ` text-black` : ` text-white`}   font-poppins break-words`}>
                                                      {msg.message}
                                                    </div>
                                                  </div>
                                                </div>
                                                  })
  )
}

export default OtherMessage
