import { lazy, useEffect, useState } from 'react'

import { io} from 'socket.io-client';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from './pages/Registration'
import Chat from './components/Chat'


import MainContainer from './components/MainContainer'

import PageNotFount from './pages/PageNotFound'
import { useDispatch, useSelector } from 'react-redux';
import { setSocket } from './redux/socketSlice';
// const Login = lazy(() => import('./pages/Login'))

import Login from '../src/pages/Login'
import Profile from './components/Profile';
import Home from './components/Home';

function App() {
  const { user } = useSelector(state => state.user);
 
  const dispatch = useDispatch();
  useEffect(() => {
        if (user) {
            const socketio = io("https://chatorbit-backend.onrender.com", {
                query: { userID: user.id },
            });
            dispatch(setSocket(socketio));

            return () => socketio.close();
        }
    }, [user, dispatch]);
  return (
    <>
     

      <div className='w-screen h-screen flex justify-center items-center'>

     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/registration' element={<Registration />}></Route>
            <Route path='app' element={<MainContainer />}>
              <Route path='chat' element={<Chat />}></Route>
              <Route path='profile' element={<Profile />}></Route>
              <Route path='home' element={<Home />}></Route>
            {/* <Route path='profile' element={<Profile />}></Route>
            <Route path='chat' element={<Chat />}></Route>          
            <Route path='users' element={<Users/>}></Route>
            <Route path="notification" element={<Request/>}></Route>
             */}
            
            
          </Route>
          <Route path='*' element={<PageNotFount />}></Route>
      </Routes>
      </BrowserRouter>
      </div>
     
    </>
  )
}

export default App
