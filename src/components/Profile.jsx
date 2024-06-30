import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setAuthUser } from '../redux/userSlice';
import { IoArrowBack } from "react-icons/io5";
function Profile() {
    const { user } = useSelector(state => state?.user);
    const [name, setName] = useState();
    const [bio, setbio] = useState();
     const { login } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate= useNavigate()
    const [loading, setLoading] = useState(false);
    const inputref = useRef(null);
    const [profile, setProfile] = useState();
      const notify = (msg) => {
       
        toast.success(msg , {
            position: "top-right"
        });
        
  
    }

    const errorNotification = (data = "")=>{
           toast.error(data,{ position: "top-right"})
    }

    const handleProfile = () => {
        inputref.current.click();
    }

    const profilehandler = (e) => {
        // console.log(e.target.files[0]);
         const file = e.target.files[0];
        // console.log(URL.createObjectURL(file));
        setProfile(file)
    }
    
    const profileUpdate = () => {
        if (user.name == name && user.bio == bio && !profile) 
        {
            errorNotification("You Didn't Made Any Changes")
        }
        else {
            setLoading(true);
            const formData = new FormData();
            formData.append('name', name);
            
            formData.append('bio', bio);
            if (profile) {
                formData.append('photo', profile);
            }
            axios.post("https://chatorbit-backend.onrender.com/profile", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }

                
            )
                .then(res => {
               
                    console.log("update" , res.data.data);
                    res.status == 200 ?
                        
                        Promise.all([notify(res.data.msg),dispatch(setAuthUser({ name:res.data.data.name, bio:res.data.data.bio,photo1:{url:res.data.data.photo1.url} })),setLoading(false)])
                        :
                        
                        Promise.all([errorNotification(res.data.msg),setLoading(false)])
            })
                .catch(err => {
              
               setLoading(false)
            })
        }
    }
    useEffect
        (() => {
        setName(user?.name) 
        setbio(user?.bio) 
       
    
  
  
    },[])
  return (
     <div className='w-[80vw] md:w-[68%] h-full flex justify-center flex-col items-center bg-white rounded-lg ml-1 border-[1px] border-gray-300 '>
          <div className='h-[10%] w-full pl-5 lg:pl-10 pt-3 font-poppins text-xl md:text-2xl flex items-center'>
              <span className='mr-2 lg:mr-5 hover:cursor-pointer' onClick={()=>navigate('/app/chat')}>
                  <IoArrowBack />
              </span>
              Profile
          </div>
          

          <div className='h-[90%] w-full flex justify-center items-center'>
            <div className='h-full w-full lg:w-[60%]'>
                <div className='w-full h-[50%]  flex flex-col justify-center items-center'>
                <div className='w-[35vw] h-[35vw]   md:w-[25%] md:h-[25%] lg:w-[200px] lg:h-[200px] rounded-full overflow-hidden'>
                    
                          {profile ?
                              <img className="w-full h-full object-cover"
                                  src={URL.createObjectURL(profile)}
                                  alt="" name="photo" />
                              :
                                        
                          
                              <img src={user?.photo1?.url} name='photo' alt="Profile" className='w-full h-full object-cover' />}
                      </div>
                      
                      <p onClick={handleProfile} className='cursor-pointer mt-5'>Change Profile</p>
                      <input type="file" name='photo' ref={inputref} onChange={profilehandler}  hidden/>
                  </div>
                  <div className='w-full h-20 mt-2 ml-5   flex flex-col justify-between'>
                      <p className='text-lg font-semibold'>Your Name</p>
                      <input type="text"
                          className='flex w-[90%] bg-gray-200  rounded-md  h-10 pl-2'
                          value={name}
                          onChange={(e)=>setName(e.target.value)}
                      />
                </div>
                <div className='w-full h-20 mt-8 ml-5  flex flex-col justify-between'>
                      <p className='text-lg font-semibold'>Your Bio</p>
                      <input type="text"
                          className='flex w-[90%] bg-gray-200  rounded-md  h-10 pl-2'
                          value={bio}
                          onChange={(e)=>setbio(e.target.value)}
                      />
                  </div>
                  <div className='h-12 mt-5 flex justify-center items-center  '>
                      {
                          loading ?
                          <button disabled="" type="button" class="bg-green-500 text-white hover:bg-green-600  font-semibold  py-1 px-2 rounded text-lg  inline-flex items-center">
                            <svg aria-hidden="true" role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                            </svg>
                            Loading...
                        </button>
                          :
                      <button className="bg-green-500 text-white hover:bg-green-600  font-semibold  py-1 px-2 rounded text-lg" onClick={()=>profileUpdate()}>Save Changes</button>
                      }
                  </div>
            </div>
            </div>

          <ToastContainer />
      </div>
  )
}

export default Profile