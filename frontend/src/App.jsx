import React, { useEffect } from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Mainlayout from './components/Mainlayout'
import Home from './components/Home'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import ChatPage from './components/ChatPage'
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from './store/socketSlice'
import { setOnlineUsers } from './store/chatSlice'
import { setLikeNotification } from './store/notificationSlice'
import ProtectedRoute from './components/ProtectedRoute'

//10:00
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
        // try to implement the profil/edit here...
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

//11:33
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