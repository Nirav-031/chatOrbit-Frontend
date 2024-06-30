import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../redux/notificationSlice';

function useGetNotification() {
    const { socket1 } = useSelector(state => state?.socket);
    const dispatch = useDispatch();
    useEffect(() => {
        socket1?.on("newNotification", (data) => {
            dispatch(setNotification(true));
        })
        return () => {
                socket1?.off("newNotification");
            };
  },[socket1,dispatch])
}

export default useGetNotification