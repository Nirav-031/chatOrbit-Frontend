import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
function Conversation({data}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const navigateToChat = async(user) => {
        // const setdata=useSelector(state=>state.)
        dispatch(setSelectedUser(user));
        navigate('/app/chat')
        // console.log(user);
    }
    return (
      
            
      <div className=' flex mb-5 h-20 lg:w-[50%] bg-slate-200 p-2 rounded-md hover:bg-slate-300' onClick={()=>navigateToChat(data)}>
          <div className='w-[20%]  flex justify-end lg:pr-5 items-center'>
              <div className='rounded-full  w-20 text-center  '>
                  
                  <img src={data.photo1.url} alt="" className='rounded-full lg:w-16  w-full h-16'
                       />
              </div>
          </div>
          <div className='w-[60%] h-full '>
              <div className='h-full w-full text-lg pl-5 lg:pl-0 lg:text-xl  flex items-center font-poppins '>{ data.name}</div>
          </div>
         
      </div>
     
  )
}

export default Conversation