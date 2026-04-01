import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Avatar } from './custom/Avatar'; 
import axios from 'axios';
import { toast } from 'sonner';

const SuggestedUsers = () => {

    const { user, suggestedUsers } = useSelector(store => store.auth);


    const followUnfollowHandler = async(id)=>{
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/user/followorunfollow/${id}/`,{},{ withCredentials: true});
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className='my-10'>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
                <span className='font-medium cursor-pointer'>See All</span>
            </div>
            {
                suggestedUsers.map((account) => {
                    
                    let isUserFollowAccount = account?.followers.includes(user?._id) || false;

                    return (
                        <div key={account._id} className='flex items-center justify-between my-5'>
                            <div className='flex items-center gap-2'>
                                <Link to={`/profile/${account?._id}`}>
                                    <Avatar src={account?.profilePicture} alt="post_image" ></Avatar>
                                </Link>
                                <div>
                                    <h1 className='font-semibold text-sm'><Link to={`/profile/${account?._id}`}>{account?.username}</Link></h1>
                                    <span className='text-gray-600 text-sm'>{account?.bio || 'Bio here...'}</span>
                                </div>
                            </div>
                            <span onClick={()=>followUnfollowHandler(account._id)} className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]'>{isUserFollowAccount ?'Unfollow' : 'Follow'}</span>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default SuggestedUsers