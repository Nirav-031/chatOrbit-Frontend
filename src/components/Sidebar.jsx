import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';



import {useNavigate} from 'react-router-dom'


import axios from 'axios';

import { setAuthUser, setIsLogin, setSelectedUser } from '../redux/userSlice';
import { BsBell } from "react-icons/bs";

import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { Bars } from 'react-loader-spinner';
import noFriends from '../assets/no-friends.svg';
import AddUser from './AddUser';
import { setAddFriend } from '../redux/addFriendsSlice';
import Notifications from './Notifications';
import useGetNotification from '../hook/useGetNotification';
import { setNotification } from '../redux/notificationSlice';
function Sidebar() {


  useGetNotification();
  const [loading,setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const {addFriend} = useSelector(state => state?.friend);
  const {selectedUser} = useSelector(state => state?.user);
  const {notification} = useSelector(state => state.notification)
  // console.log("notification" ,notification);
  // const { } = useSelector(state => state?.socket);

  const [add, setAdd] = useState(false)
  const [add1,setAdd1]=useState(false)
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userID = useSelector(state => state.user);
 
  const { login } = useSelector(state => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);

  const fetchUsers = ()=>
  {
    setLoading(true);
    axios.defaults.withCredentials = true;
    axios.get("https://chatorbit-backend.onrender.com/chat/friends")
      .then((result) => {
        // console.log(result.data);
        setConversation(result.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
       
      });
  }
  useEffect(() => {
    fetchUsers();
    
  }, [])
  
 
 

  return (
<>
      <div className='w-[20vw] md:w-[32%] h-full border-[1px] border-gray-300 rounded-lg '>
        <div className='h-[10%] w-full rounded-ss-xl  flex  justify-center md:justify-between items-center md:p-5'>
          <div className='text-2xl font-poppins hidden md:block'>Hello, { userID?.user?.name} 👋</div>
          
          {
            notification ?
              <div className='relative text-xl text-[#6059ca] hover:cursor-pointer'
                  onClick={() => {
                      setAdd1(!add1);
                    setIsNotificationsModalOpen(add1);
                   
                  }}>
                  <BsBell />
                  <div className='absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full'></div>
              </div>

            :
                  <div className='text-xl text-[#6059ca] hover:cursor-pointer'
                  onClick={() => {
                    setAdd1(!add1);
                    // console.log("add friend status",add);
                    // dispatch(setAddFriend(add));
                    setIsNotificationsModalOpen(add1)
                    

                    
                  }}
              >
                 <a
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Notification"
                        data-tooltip-place="bottom"
                >
                  <BsBell />
                </a>
              </div>
        }
        </div>
        <div className='h-[10%] w-full flex  justify-center md:justify-between items-center md:p-5 '>
          <div className=" w-[80%] border-2 border-gray-300 rounded-lg hidden md:block ">
              <input type="text" placeholder="Search" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative  bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"/>
          </div>
          <div>
            <p className="hover:cursor-pointer font-bold py-2  rounded text-center text-[#6059ca]" onClick={() => {
              setAdd(!add);
              // console.log("add friend status",add);
              // dispatch(setAddFriend(add));
               setIsModalOpen(add)
            }}>
              <a
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Add Friend"
                        data-tooltip-place="bottom"
                  >
                ADD
                <span className='text-xl ml-2 '>
                  +
                </span>
              </a>
            </p>
          </div>
        </div>
               <p className='font-medium text-sm md:text-sm md:block flex justify-center md:ml-5'>Your Friends</p>
        <div className='h-[80%] md:p-5 w-[20vw] md:w-full rounded-b-lg overflow-y-auto  scroll'>
          {

            loading ?
              <div className='h-full w-full flex justify-center flex-col items-center '>

              <div className='  '>
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
                      {/* <p className="mt-4 text-lg font-semibold">Loading...</p> */}
            </div>
                    </div>
              :
            conversation.length > 0 ? 
              conversation.map((data) => {
                return <div key={data._id} className={`h-20  lg:h-20 w-[90%] md:w-full  rounded-lg  m-auto mt-2 flex hover:bg-slate-200 hover:cursor-pointer ${selectedUser?._id == data?._id ? `bg-slate-300` : `bg-slate-100`}`} onClick={() => { dispatch(setSelectedUser(data)); navigate('chat') }}>
                  <div className='w-full rounded-lg md:rounded-e-none md:w-[30%] lg:-[20%] h-full flex justify-center items-center  p-2' >
                    <div className='w-16 h-16 rounded-full lg:ml-[-10px] ' >
                         <img src={data.photo1.url} alt=""   className='w-full h-full object-cover rounded-full'/>    
                    </div>
                    </div>
                    <div className='w-[80%] h-full rounded-e-lg lg:ml-[-20px]  hidden md:flex md:items-center text-xl'>{ data.name}</div>
          </div>
              })
            : <div className='h-full w-full flex flex-col justify-center items-center text-center p-5 '>
                <img src={noFriends} alt="No friends" className='w-40 h-40 mb-4' />
                <p className='text-lg font-semibold text-gray-600'>You have no friends yet.</p>
               
                
              </div>
          }
         
          
           
          
          

        </div>
        <Tooltip id="my-tooltip" />
    </div>
       <AddUser isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />    
           <Notifications isOpen={isNotificationsModalOpen} onClose={() => setIsNotificationsModalOpen(false)} />
  
    
   
    </>
  )
}

export default Sidebar

