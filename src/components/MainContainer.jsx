import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'

import { Outlet } from 'react-router-dom'
import Loading_bar from './Loading_bar';
import { useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import Chat from './Chat';
import Header from './Header';
// import HeroSection from './HeroSection';
function MainContainer() {
    const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useSelector(state => state.user);
  // console.log("login", login);
 
  useEffect(() => {
    if (!login) {
    navigate('/');
  }
  }, []);
  return (
    <>
      <div className='flex flex-col  '>

          <Header />
          <div className='w-screen h-[92vh] bg-[#f7f6fe] flex justify-between items-center flex-col rounded-md'>
        
           <div className='bg-white   flex w-[95vw]  h-full  mt-2 mb-2 rounded-lg'>
             <Sidebar  />

          
              
            <Outlet  />
          </div>
       
          </div>
      </div>
    
  </>
  )
}

export default MainContainer


