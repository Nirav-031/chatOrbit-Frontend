import React, { useEffect, useState } from 'react';
import { FaTrashCan } from "react-icons/fa6";
import { AiOutlineSend } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setMessageSlice } from '../redux/messageSlice';
import useGetMessages from '../hook/useGetMessages';
import OtherMessage from './OtherMessage';
import { Bars } from 'react-loader-spinner';
import useGetRealTimeMessage from '../hook/useGetRealTimeMessage';
import { GoTrash } from "react-icons/go";
import { IoSendOutline } from "react-icons/io5";
import logo from '../assets/chatorbit.svg';
// import AddFriendModal from './AddFriendModal'; // <-- Import AddFriendModal component
import AddUser from './AddUser';
import Notifications from './Notifications';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setSelectedUser } from '../redux/userSlice';
import { FiUserX } from "react-icons/fi";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import useSetHome from '../hook/useSetHome';
function Chat() {
  useGetMessages();
  useGetRealTimeMessage();
  useSetHome();
  const navigate = useNavigate();
  const { login } = useSelector(state => state.user);

  const [message, setInputMessage] = useState("");
  const { userMessage = [] } = useSelector(state => state?.message) || {}; // Default to empty array
  const dispatch = useDispatch();
  const { selectedUser } = useSelector(state => state?.user);
  const { loading } = useSelector(state => state?.message);
  const { addFriend } = useSelector(state => state?.friend);
  const [isModalOpen, setIsModalOpen] = useState(false); // <-- Add state for modal visibility
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

     const notify = (msg) => {
       
        toast.success(msg , {
            position: "top-right"
        });
        
  
    }

    const errorNotification = (data = "")=>{
           toast.error(data,{ position: "top-right"})
       }




  const sendMessage = (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      axios.post(`https://chatorbit-backend.onrender.com/chat/sendMessages/${selectedUser._id}`, { message })
        .then(res => {
          // console.log(res)
          dispatch(setMessageSlice([...userMessage, ...res.data]))
        })
        .catch(err => {
          // console.error(err);
        })
    } catch (error) {
      // console.log(error);
    }
    setInputMessage("");
  }
  
  const doingUnfriend = () => {
    try {
      axios.delete(`https://chatorbit-backend.onrender.com/chat/unFriend/${selectedUser._id}`)
      .then(res => {
        
        
        if (res.status == 200) {
          Promise.all([
            notify(res.data.msg),
            dispatch(setSelectedUser(null)),
            setIsOpen(false),
            navigate('/app/home'),
           
              window.location.reload(true) // Refresh the page
            ]);
          } else {
            errorNotification(res.data.msg);
          }
      })
        .catch(err => {
        // console.error(err); 
      })
    } catch (error) {
      // console.log(error);
    }
  }

  return (
    <>
      {
          isOpen && <div class="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
   
    <div aria-hidden="true" class="fixed inset-0 w-full h-full bg-black/50 ">
    </div>

   
          <div class="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
              <div
                  class="w-full py-2 bg-gray-100 cursor-default pointer-events-auto  relative rounded-xl mx-auto max-w-sm">

                  <button tabindex="-1" type="button" class="absolute top-2 right-2 rtl:right-auto rtl:left-2">
                      <svg title="Close" tabindex="-1" class="h-4 w-4 cursor-pointer text-gray-400" onClick={()=>setIsOpen(false)}
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clip-rule="evenodd"></path>
                      </svg>
                      <span class="sr-only">
                          Close
                      </span>
                  </button>



                      <div class="space-y-2 p-2">
                          <div class="p-4 space-y-2 text-center ">
                              <h2 class="text-xl font-bold tracking-tight" id="page-action.heading">
                                 { `UnFriend  ${selectedUser.name}` } 
                              </h2>

                              <p class="text-gray-500">
                                  Are you sure you would like to do this?
                              </p>
                          </div>
                      </div>

                      <div class="space-y-2">
                          <div aria-hidden="true" class="border-t dark:border-gray-700 px-2"></div>

                          <div class="px-6 py-2">
                              <div class="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                                  <button type="button" onClick={()=>setIsOpen(false)}
                                          class="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-gray-800 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800">
                                          <span class="flex items-center gap-1">
                                              <span class="">
                                                  Cancel
                                              </span>
                                          </span>
                                      </button>

                                  <button type="submit" onClick={()=>doingUnfriend()}
                                          class="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-red-600 hover:bg-red-500 focus:bg-red-700 focus:ring-offset-red-700">

                                          <span class="flex items-center gap-1">
                                              <span class="">
                                                  Confirm
                                              </span>
                                          </span>

                                      </button>
                              </div>
                          </div>
                      </div>


                  </div>
              </div>
          </div>
      }
      {selectedUser == null ?
        <div className='w-[80vw] md:w-[68%] h-full flex justify-center flex-col items-center bg-white rounded-lg ml-1 border-[1px] border-gray-300 '>
          <div className='w-full h-[30vh] flex flex-col justify-center items-center lg:space-y-5'>
            <div className='w-[60%] h-[60%] lg:w-[35%] lg:h-[35%]'>
              <img src={logo} alt="" className='w-full h-full' />
            </div>
            <div className='text-black font-poppins font-semibold text-[12px] lg:text-lg'>Seamless Conversations, Endless Possibilities</div>
          </div>
        </div>
        :
        loading ?
          <div className='w-[80vw] md:w-[68%] h-full flex justify-center flex-col items-center bg-white rounded-lg ml-1 border-[1px] border-gray-300 '>
            <div className='flex justify-center flex-col items-center '>
              <Bars
                height="40"
                width="40"
                color="#"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
              <br />
              <p className="mt-4 text-lg font-semibold">Loading...</p>
            </div>
          </div> :
          <div className='w-[80vw] md:w-[68%] h-full bg-white rounded-lg ml-1 border-[1px] border-gray-300 '>
            <div className='w-full h-[15%] border-[1px] rounded-t-lg border-gray-300 flex'>
              <div className='w-[30%] md:w-[15%] h-full'>
                <div className='w-full rounded-lg md:rounded-e-none h-full flex justify-center items-center p-2' >
                  <div className='w-16 h-16 rounded-full'>
                    <img src={selectedUser?.photo1?.url} alt="" className='w-full h-full object-cover rounded-full' />
                  </div>
                </div>
              </div>
              <div className='w-[55%] lg:ml-[-25px] md:w-[75%] h-full flex items-center text-2xl font-semibold'>
                {selectedUser?.name}
              </div>
              <div className='hover:cursor-pointer w-[15%] md:w-[10%] h-full flex justify-center items-center text-2xl text-[#6059ca]' onClick={()=>setIsOpen(true)}>
                
                <a
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Un Friend"
                        data-tooltip-place="bottom"
                >
                  <FiUserX />
                </a>
              </div>
            </div>
            <div className='w-full h-[70%] overflow-y-auto scroll '>
              {userMessage && <OtherMessage msg={userMessage} />}
            </div>
            <form onSubmit={sendMessage} className='h-[10%] bg-white '>
              <div className='w-full h-[15%] mt-5 rounded-b-lg flex justify-center '>
                <div className='w-[90%] h-14 border-[1px] border-[#6059ca] rounded-md p-2 flex justify-center '>
                  <input
                    placeholder='Enter Message'
                    type="text"
                    className=" w-full focus:outline-none pl-5"
                    value={message} onChange={(e) => setInputMessage(e.target.value)}
                  />
                  <button className='bg-[#6059ca] h-10 w-14 text-2xl flex justify-center items-center text-white rounded-md ml-2' onClick={sendMessage}>
                    <IoSendOutline />
                  </button>
                </div>
              </div>
            </form>
          </div>
      }
      <AddUser isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> {/* <-- Include AddFriendModal component */}
      {/* <Notifications isOpen1={isModalOpen1} onClose={() => setIsModalOpen1(false)} /> <-- Include AddFriendModal component */}
    <Notifications isOpen={isNotificationsModalOpen} onClose={() => setIsNotificationsModalOpen(false)} />
      <ToastContainer />
        <Tooltip id="my-tooltip" />
    </>
  )
}

export default Chat;
