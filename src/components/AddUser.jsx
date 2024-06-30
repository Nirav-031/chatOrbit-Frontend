import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { Bars } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddUser({ isOpen, onClose }) {
    if (!isOpen) return null;


    const navigate = useNavigate();
    const userID = useSelector(state => state.user);
    
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
   
     const notify = (msg) => {
       
        toast.success(msg , {
            position: "top-right"
        });
        
  
    }

    const errorNotification = (data = "")=>{
           toast.error(data,{ position: "top-right"})
       }
    const fetchAllUser = async () => {
        try {


            setLoading(true);
           
            
            axios.get("https://chatorbit-backend.onrender.com/fetchAll", { withCredentials: true })
                .then((result) =>
                {
                    if (result.status == 200) {
                        // console.log("result",result);
                        setUsers(result.data);
                        setLoading(false);
                        console.log("users",result.data   );
                    }
                    })
                .catch((err) =>null
                    // console.log(err)
                    // navigate('/login')
                );
          
            
        } catch (error) {
            setLoading(false);
            // console.log(error);
        }
    }

    const sentFriendRequest =async (receiverId)=>
        {
            
        // console.log("notification",receiverId);
          
            axios.post("https://chatorbit-backend.onrender.com/sendNotification", { senderID: userID.user.id, receiverID: receiverId },
             {
                    withCredentials: true
                })
                .then((result) => {
                    if (result.status==200) {
                        //  notify("Request sent successfully")
                       
                        // setTimeout(() => { setLoading(true); fetchAllUser() }, 2000)
                        Promise.all([notify("Request sent successfully"),setLoading(true), fetchAllUser()])
                    }
                }
            )
                .catch((err) =>
                // console.log(err)
                    null
                );
        }

     useEffect(() => {
            setLoading(true);
             
            fetchAllUser();
        }, []);
    return (
        
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] lg:w-[35vw] h-[60vh]">
                <div className='w-full h-[10%] flex justify-between mb-4 items-center'>
                    <p className="text-xl font-poppins ">Add Friend</p>
                    <p onClick={onClose} className="   text-2xl  text-[#6059ca] hover:cursor-pointer">
                    <RxCross2 />
                    </p>
                </div>
                <hr/>
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
                                    
                                "You're already a fan of every user here!"
                                </div> :
                                users?.map((data) => {
                            return <div className=' flex mb-5 h-20  bg-slate-200 p-2 rounded-md hover:bg-slate-300 ' >
                                        <div className='w-[15%] lg:w-[35%]  flex justify-center lg:pr-5 items-center'>
                                            <div className='rounded-full  w-20 text-center  '>
                                                
                                                <img src={data.photo1.url} alt="" className='rounded-full lg:w-16  w-full h-16'
                                                    />
                                            </div>
                                        </div>
                                        <div className='w-[60%] h-full '>
                                            <div className='h-full w-full text-lg pl-5 lg:ml-[-70px] lg:text-xl  flex items-center font-poppins '>{ data.name}</div>
                                        </div>
                                        
                                        <div className=' h-full ' >
                                            <div className='hover:cursor-pointer h-full w-full text-lg pl-5 lg:pl-0 pr-5 lg:text-2xl text-[#6059ca] flex items-center font-poppins 'onClick={()=>sentFriendRequest(data._id)} >
                                                    <a
                                                                    data-tooltip-id="my-tooltip"
                                                                    data-tooltip-content="Add Friend"
                                                                    data-tooltip-place="bottom"
                                                        
                                                        >
                                                            
                                                        <IoMdAdd />
                                                    </a>
                                            </div>
                                        </div>
                                    </div>
                        })}
                        </div>
                        
                        }
                </div>
                
                
            </div>
            <Tooltip id="my-tooltip" />
             <ToastContainer />
        </div>
    );
}

export default AddUser