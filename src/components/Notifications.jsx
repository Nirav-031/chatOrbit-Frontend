import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { Bars } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setNotification } from '../redux/notificationSlice';
function Notifications({ isOpen, onClose }) {
  if (!isOpen) return null;
  
    const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const userID = useSelector(state => state?.user);
  const dispatch = useDispatch();
    const { socket1 } = useSelector(state => state?.socket);

   const notify = (msg) => {
       
        toast.success(msg , {
            position: "top-right"
        });
        
  
    }

    const errorNotification = (data = "")=>{
           toast.error(data,{ position: "top-right"})
  }
  

   const fetchNotifications = () => {
    setLoading(true);
    // console.log(userID?.user?.id);
    try {
      axios.defaults.withCredentials = true;
      axios.get("https://chatorbit-backend.onrender.com/getNotification",
        { senderID: userID.user.id }, {
        
        withCredentials: true
      }
                
       )
        .then((result) => {
           
          const f1 = result?.data.filter((data) =>data.sender);
          
          setUsers(f1);
          // console.log(f1);
            // if (data.length < 1)
            // {
            //   notify("please Make Friends First");
            //   setTimeout(() => navigate('/app/users'), 2000)
            // } 
          setLoading(false);
        })
        .catch((err) => { setLoading(false);});
      } catch (error) {
        // console.log(error);
        setLoading(false);
      }
  }

  //accept friend Request  
  const createChat = (senderId) => {
    // console.log(id);
    try {
      setLoading(true);
      axios.defaults.withCredentials = true;
      axios.put("https://chatorbit-backend.onrender.com/acceptRequest", { senderID: senderId, receiverID: userID.user.id })
        .then((result) => {
          setLoading(true);
          // console.log(result);
          if (result.status == 200)
          {
            
            Promise.all([ notify("Request Accepted Successfully"),fetchNotifications()])
            
           
         
          }
        } )
        
          
        .catch((err) => { setLoading(false); });
    } catch (error) {
   
      setLoading(false);
    }
  }


  const deleteRequest = (senderId) => {
    try {
      setLoading(true);
    
      axios.defaults.withCredentials = true;
      axios.put("https://chatorbit-backend.onrender.com/declineRequest", { senderID: senderId, receiverID: userID.user.id })
        .then((result) => {
          setLoading(true);
          
          if (result.status == 200)
          {
            Promise.all([  errorNotification("Request Rejected Successfully"),fetchNotifications()])

            setLoading(false);
            
           
            // setTimeout(() => fetchNotifications(), 2000);  
          }
        } )
        
          
        .catch((err) => { setLoading(false); });
    } catch (error) {
      
      setLoading(false);
    }
 }





   useEffect(() => {
            setLoading(true);
             dispatch(setNotification(false))
            fetchNotifications();
        }, []);
  return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          
        
            <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] lg:w-[35vw] h-[60vh]">
                <div className='w-full h-[10%] flex justify-between mb-4 items-center'>
                    <p className="text-xl font-poppins ">Notifications 🔔</p>
                    <p onClick={onClose} className="   text-2xl  text-[#6059ca] hover:cursor-pointer">
                    <RxCross2 />
                    </p>
                </div>
        <hr />
        
         <div className='w-full h-[90%] mt-5'>

                    {loading ?
                        <div className='flex justify-center flex-col items-center w-full h-full '>
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
                        :   
                        <div className='overflow-y-auto scroll w-full h-[90%]'>
                            {
                       
                                users.length <= 0 ?
                                    <div className='h-full w-full font-semibold flex justify-center items-center'>
                                    
                               ✅ You Don't Have Any Notifications
                                </div> :
                                users?.map((data) => {
                            return <div className=' flex mb-5 h-20  bg-slate-200 p-2 rounded-md hover:bg-slate-300 ' >
                                        <div className='w-[15%] lg:w-[35%]  flex justify-center lg:pr-5 items-center'>
                                            <div className='rounded-full  w-20 text-center  '>
                                                
                                                <img src={data.sender.photo1.url} alt="" className='rounded-full lg:w-16  w-full h-16'
                                                    />
                                            </div>
                                        </div>
                                        <div className='w-[60%] h-full '>
                                            <div className='h-full w-full text-lg pl-5 lg:ml-[-50px] lg:text-xl  flex items-center font-poppins '>{ data.sender.name}</div>
                                        </div>
                                        
                                        <div className=' h-full   w-[50%] ' >
                                            <div className='h-full flex justify-center space-x-2 items-center' >
                                                    
                                                      <button className="bg-green-500 text-white hover:bg-green-600  font-semibold  py-1 px-2 rounded text-sm" onClick={()=>createChat(data.sender._id)}>
                                                          Accept
                                                      </button>
                                                      <button className="bg-red-500 hover:bg-red-700 text-white font-semibold  py-1 px-2 rounded text-sm" onClick={()=>deleteRequest(data.sender._id)}>
                                                          Reject
                                                        </button>
                                                    
                                            </div>
                                        </div>
                                    </div>
                        })}
                        </div>
                        
                        }
                </div>
                
          
      </div>
      <ToastContainer />
      </div>
  )
}

export default Notifications