import React, { useState} from 'react'
import {useFormik} from 'formik'

// import logo from '../assets/logo.png';
import logo from '../assets/chatorbit.svg'
import { Link,useNavigate } from 'react-router-dom';
import { loginSchema } from '../utils/loginSchema';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


import Loading_bar from '../components/Loading_bar';


import {useDispatch, useSelector} from 'react-redux'
import { setAuthUser, setIsLogin } from '../redux/userSlice';

const Login = () => {

    const {login} = useSelector(state => state.user);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
        const notify = (msg) => {
       
        toast.success(msg , {
            position: "top-right"
        });
        
  
    }

    const errorNotification = (data = "")=>{
           toast.error(data,{ position: "top-right"})
       }
    const initialValue = {
        email: "",
        password: "",
   }

    


    const { values, errors, touched, handleChange, handleSubmit } = useFormik({
        initialValues: initialValue,
        validationSchema:loginSchema,
        onSubmit:async (values) => {
            setLoading(true);

            try {
                const result = await axios.post('https://chatorbit-backend.onrender.com/login', {
                    email: values.email,
                    password: values.password
                }, {
                    // headers: {
                    // 'Content-Type':'application/json'
                    // },
                    withCredentials: true
                });

                if (result.status === 200) {
                // console.log(result);
                    setLoading(false);
                    setTimeout(() =>
                    {
                        notify("Login successfull")
                        
                        setTimeout(()=>setLoading(true),1000);
                        setTimeout(() => {
                            setLoading(false);
                            
                            dispatch(setAuthUser(result.data.res))
                            dispatch(setIsLogin(true));
                            navigate('/app/chat')
                        }, 2000)
                        
                    }, 1000)

                }

            } catch (error) {
                setLoading(false)
                setTimeout(()=>errorNotification(error.response.data),1000)
                // console.log(error);
            }
                   
              
                    
        }
    })
    return <>
        
        <div className='min-h-screen  w-screen bg-[#f7f6fe] flex justify-center items-center  '> 
           
            {loading? <Loading_bar/>
                :
                  <div className='lg:w-1/3 w-[90%]  h-auto mt-20 mb-10 '>
                <div className='flex items-center justify-center '>
                    <img src={logo} alt=""  className='h-[55px]' />
                </div> 

                {/*-------------------------------------------------*/}
                
                <div className='flex flex-col items-center justify-center mt-10 mb-5'>

                    <p className='text-[25px]  font-poppins'>Login</p>
                    <p className='text-[15px] mt-2 font-normal font-poppins'>Get your ChatOrbit account now.</p>
                </div>

                
                { /* ---------------------form section ---------------------------*/}

                <div className='w-full p-6 bg-white'>
                    
                        <form onSubmit={handleSubmit}>
                            
                
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-poppins mb-2" >
                            Email
                        </label>
                                <input type="email"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                            />
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
                                    name="password"        
                            />
                {errors.password && touched.password ? <p className='text-red-500'>{errors.password}</p>:null}

                    </div>

                    <div className=" mt-10 mb-6">
                        <button type="submit" className='block text-white rounded   font-poppins w-full h-9 mb-2 bg-[#6059ca]'>Login</button>
                    </div>
                </form>
                    {/* ------------------------------------------------------------------------*/}

                    {/* <div className=' text-center'>

                        <p className='text-gray-400'>By registering you agree to the ChatOrbit's Terms of Use</p>
                    </div> */}
                    
                    
                    {/* ------------------------------------------------------------------------*/}

                </div>
                <div className='text-center mt-8'>

                    <p className='text-gray-500 font-poppins text-sm'>Don't have an account ? <span className='text-[#6059ca] font-poppins hover:cursor-pointer' ><Link to='/registration'>Signup</Link></span></p>
                    <p className='text-gray-500 font-poppins mt-4 '>© 2024 ChatOrbit Crafted with ❤️ by Nirav Senghani</p>
                </div>
                <ToastContainer />
                </div>
            }
          
           
            
        </div>
    </>
}

export default Login