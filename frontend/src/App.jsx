import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Mainlayout from './components/Mainlayout'
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from './store/socketSlice'
import { setOnlineUsers } from './store/chatSlice'
import { setLikeNotification } from './store/notificationSlice'
import Login from './features/auth/pages/Login'
import Signup from './features/auth/pages/Signup'
import Home from './features/home/pages/Home'
import Profile from './features/profile/pages/Profile'
import EditProfile from './features/profile/pages/EditProfile';
import ChatPage from './features/chat/pages/ChatPage';
import ProtectedRoute from './app/route/ProtectedRoute';
import Mainlayout from './app/layouts/Mainlayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute>
              <Mainlayout/>
            </ProtectedRoute>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/profile/:id',
        element: <Profile/>,
      },
      {
        path: '/account/edit',
        element: <EditProfile/>
      },
      {
        path: '/chat',
        element: <ChatPage/>
      }
    ]
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
])

const App = () => {

  const dispatch = useDispatch();
  const {user} = useSelector(store=>store.auth);
  const { socket } = useSelector(store => store.socketio);

  useEffect(()=>{
    if(user){
      const socketio = io('http://localhost:8000/',{
        query: {
          userId: user?._id
        },
        transports: ['websocket'],
      })
      dispatch(setSocket(socketio));

      socketio.on('getOnlineUsers',(onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers));
      })
      socketio.on('notification', (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return ()=>{
        socketio.close();
        dispatch(setSocket(null));
      }
    } else if(socket){
      socket.close();
      dispatch(setSocket(null));
    }
  },[user,dispatch]);
  
  return (
    <RouterProvider router={router}/>
  )
}

export default App