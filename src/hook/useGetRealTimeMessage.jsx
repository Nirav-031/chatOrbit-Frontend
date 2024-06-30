import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessageSlice } from '../redux/messageSlice';

function useGetRealTimeMessage() {
 
    const { socket1 } = useSelector(state => state?.socket);
    const { userMessage = [] } = useSelector(state => state?.message) || {};
    const dispatch = useDispatch();
    useEffect(() => {
        socket1?.on("newMessage", (newMessage) => {
            dispatch(setMessageSlice([...userMessage, ...newMessage]));
        });
         return () => {
                socket1?.off("newMessage");
            };
    },[socket1,userMessage,dispatch])
}

export default useGetRealTimeMessage