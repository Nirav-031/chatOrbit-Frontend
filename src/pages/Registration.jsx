import React, { useState, useRef } from 'react'
import {useFormik} from 'formik'

import logo from '../assets/chatorbit.svg'
// import profile from '../assets/logo.png'


import defaultProfile from '../assets/profile.jpg' 
import { Link,useNavigate } from 'react-router-dom'
import { registerSchema } from '../utils/registerValidationSchema'
import axios from 'axios';

import { Bars } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading_bar from '../components/Loading_bar'
const Registration = () =>
{
    const [profile, setProfile] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const inputProfile = useRef(null);

    function handleProfileInput() {
        inputProfile.current.click();
    }

    function handleProfile(e) {
        // console.log(e.target.files);
        const file = e.target.files[0];
        // console.log(URL.createObjectURL(file));
        setProfile(file)
        
    }
    
    const initialValue = {
        username: "",
        email: "",
        password: "",
        bio: "",
      

    }

    const notify = (msg) => {
       
        toast.success(msg , {
            position: "top-right"
        });
        
  
    }
         const errorNotification = (data="") => {
       
        toast.error(` ${data}`, {
          position: "top-right"
        });
  
       
    };
     
    const { values, errors, touched, handleChange, handleSubmit } = useFormik({
        initialValues: initialValue,
        validationSchema:registerSchema,
        onSubmit:async (values) => {
            setLoading(true);
            const formData = new FormData();
            formData.append('name', values.username);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('bio', values.bio);
            if (profile) {
                formData.append('photo', profile);
            }
            try {
                const result = await axios.post('https://chatorbit-backend.onrender.com/registration', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (result.status === 200) {
                    setLoading(false);
                    setTimeout(() =>
                    {
                        notify("Registration successfull")
                        
                        setTimeout(()=>setLoading(true),1000);
                        setTimeout(() => {
                            setLoading(false);
                            navigate('/')
                        }, 2000)
                        
                    }, 1000)

                    
                }
            } catch (error) {
                setLoading(false)

                
                setTimeout(()=>errorNotification(error.response.data),1000)
                console.log(error);
            }
        
       
        }
    })
    return <>
        
        <div className='min-h-screen  w-screen bg-[#f7f6fe] flex justify-center items-center  '> 
        
            {loading ?<Loading_bar/>
                :
                <div className='lg:w-1/3 w-[90%]  h-auto mt-52 mb-10 '>
                            <div className='flex  items-center justify-center '>
                                <img src={logo} className='h-[55px]' />
                                
                            </div> 

                            {/*-------------------------------------------------*/}
                        
                            <div className='flex flex-col items-center justify-center mt-10 mb-5'>

                                <p className='text-[25px]  font-poppins'>Register</p>
                                <p className='text-[15px] mt-2 font-normal font-poppins'>Get your ChatOrbit account now.</p>
                            </div>

                            
                            { /* ---------------------form section ---------------------------*/}

                                <div className='w-full p-6 bg-white'>
                                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                                        <div className="text-center mb-4 hover:cursor-pointer" onClick={handleProfileInput} >
                                            {profile ?
                                                <img className="h-20 w-20 rounded-full mx-auto"
                                            src={URL.createObjectURL(profile)}
                                                alt="" name="photo"/>
                                                :
                                        <img className="h-20 w-20 rounded-full mx-auto"
                                            src={defaultProfile}
                                            alt="" name="photo"/>}
                                            
                                    <input type="file" ref={inputProfile}  className='hidden' onChange={handleProfile}/>
                                    </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-poppins mb-2" >
                                                Username
                                            </label>
                                            <input type="text" className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                name="username"
                                                placeholder="Username"
                                                value={values.username}
                                                onChange={handleChange}
                            />
                {errors.username && touched.username ? <p className='text-red-500'>{errors.username}</p>:null}
                            

                                          
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-poppins mb-2" >
                                                Email
                                            </label>
                                            <input type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                value={values.email}
                                                onChange={handleChange}
                                                name="email"
                                placeholder="Email" />
                {errors.email && touched.email ? <p className='text-red-500'>{errors.email}</p>:null}
                            
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-poppins mb-2" >
                                                Password
                                            </label>
                                            <input type="password"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                placeholder="Password"
                                                value={values.password}
                                                onChange={handleChange}
                                name="password" />
                {errors.password && touched.password ? <p className='text-red-500'>{errors.password}</p>:null}
                            
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-poppins mb-2" >
                                                Bio
                                            </label>
                                            <input type="text"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                placeholder="Bio"
                                                value={values.bio}
                                                onChange={handleChange}
                                                name="bio"
                            />
                {errors.bio && touched.bio ? <p className='text-red-500'>{errors.bio}</p>:null}

                                        </div>

                                        <div className=" mt-10 mb-6">
                                            <button type='submit' className='block text-white rounded   font-poppins w-full h-9 mb-2 bg-[#6059ca]'>Register</button>
                                        </div>

                                    </form>  
                                        {/* ------------------------------------------------------------------------*/}

                                        <div className=' text-center'>

                                        <p className='text-gray-400'>By registering you agree to the ChatOrbit's Terms of Use</p>
                                        </div>
                                        
                                {/* ------------------------------------------------------------------------*/}

                                
                                </div>
                                <div className='text-center mt-8'>

                                    <p className='text-gray-500 font-poppins text-sm'>Already have an account ? <span className='text-[#6059ca] font-poppins hover:cursor-pointer' ><Link to='/login'>Signin</Link></span></p>
                                    <p className='text-gray-500 font-poppins mt-4 '>© 2024 ChatOrbit Crafted with ❤️ by Nirav Senghani</p>
                </div>
                  <ToastContainer />
                        </div>
            }
                
        </div>
    </>
}

export default Registration;