import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthUser, setIsLogin, setSelectedUser } from '../redux/userSlice';
import { setMessageSlice } from '../redux/messageSlice';
import { setSocket } from '../redux/socketSlice';
import axios from 'axios';
function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logOut = () => {
    try {
    //   setLoading(true);
      
        axios.post("https://chatorbit-backend.onrender.com/logout", {}, { withCredentials: true })
            .then((result) => {
               
                if (result.status == 200) {
                  
                   
                   
              
                    Promise.all([dispatch(setIsLogin(false)),
                    dispatch(setAuthUser(null)),
                    dispatch(setSelectedUser(null)),
                    dispatch(setMessageSlice(false)),
                    dispatch(setSocket(null)), navigate('/login')]);
          }
        })
            .catch((err) =>
                null
            // console.log(err)
        );

        
    } catch (error) {
    //   console.log(error);
    }
    // removeCookie('jwt');

    
  }

  return (
      <>
          <div className='h-[8vh] w-screen flex bg-[#6059ca] z-50'>
              <div className='w-[33%] h-full flex justify-end items-center'></div>
              <div className='w-[33%] h-full hover:cursor-pointer flex justify-center items-center text-2xl text-white font-mono'
                  onClick={() => window.location.reload(true)
}>ChatOrbit</div>
              <div className='w-[33%]  h-full flex justify-end items-center pr-5 space-x-5 text-white text-xl hover:cursor-pointer'  onClick={()=>navigate('profile')}>
                  <a
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Profile"
                      data-tooltip-place="bottom"
                      
                  > <FaRegUserCircle />
                  </a>
                  <div onClick={()=>logOut()} className='hover:cursor-pointer'>
                                
                            <a
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="Log Out"
                          data-tooltip-place="bottom"
                          
                                    >
                                
                                <IoLogOutOutline />
                            </a>
                      </div>
              </div>
              <Tooltip id="my-tooltip" />
        </div>
      </>
  )
}

export default Header