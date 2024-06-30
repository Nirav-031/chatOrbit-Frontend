import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function useSetHome() {
    const { socket1 } = useSelector(state => state?.socket);
    const navigate = useNavigate();
    useEffect(() => {
        socket1?.on("setHome", () => {
            
            navigate('/app/home');
        }
        );
         return () => {
                socket1?.off("setHome");
            };
 },[socket1])
}

export default useSetHome