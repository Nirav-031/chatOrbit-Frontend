import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { setMessageSlice, setsLoadingIndicator } from '../redux/messageSlice';
import { useNavigate } from 'react-router-dom';

function useGetMessages() {
    const { selectedUser } = useSelector(state => state.user);
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    useEffect(() => {
       
            const fetchMessage =async () => {
                try {
                    dispatch(setsLoadingIndicator(true));
                    axios.defaults.withCredentials = true;
                    const res = await axios.get(`https://chatorbit-backend.onrender.com/chat/getMessages/${selectedUser._id}`);
                    // console.log("chat", res?.data[0]?.messages);
                   dispatch(setMessageSlice(res?.data[0]?.messages))
                    dispatch(setsLoadingIndicator(false));

     
                } catch (error) {
                    dispatch(setsLoadingIndicator(false));
                    //  navigate('/login');

                // console.log(error);
            }
        }

        fetchMessage();

  },[selectedUser])
}

export default useGetMessages