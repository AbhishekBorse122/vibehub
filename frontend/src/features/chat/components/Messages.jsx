import React from 'react'
import { Link } from 'react-router-dom';
import { Avatar } from '@/custom/Avatar';
import { useSelector } from 'react-redux';
import useGetAllMsg from '../hooks/useGetAllMsg';
import useGetRTM from '../hooks/useGetRTM';

const Messages = ({ selectedUser }) => {

    useGetRTM();
    useGetAllMsg(selectedUser?._id);    
    const {user} = useSelector(store=>store.auth);
    const {messages} = useSelector(store=>store.chat);

    return (    
        <div className='overflow-y-auto flex-1 p-4'>
            <div className='flex justify-center'>
                <div className='flex flex-col items-center justify-center'>
                    <Avatar className="!h-20 !w-20" src={selectedUser?.profilePicture} alt='profile'></Avatar>
                    <span>{selectedUser?.username}</span>
                    <Link to={`/profile/${selectedUser?._id}`}><button className="bg-slate-100 text-slate-900 rounded-md text-sm font-medium  px-4 py-2 hover:bg-gray-200 h-8 my-2">View profile</button></Link>
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                {
                    messages?.map((msg) => {
                        return (
                            <div key={msg._id} className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-2 rounded-lg max-w-xs break-words ${msg.senderId === user?._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                                    {msg.message}
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>  
    )
}

export default Messages;