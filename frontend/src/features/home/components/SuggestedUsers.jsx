import React from 'react'
import { Link } from 'react-router-dom';
import { Avatar } from '@/custom/Avatar'; 
import { toast } from 'sonner';
import useFeed from '../hooks/useFeed';

const SuggestedUsers = () => {

    const { user, suggestedUsers, followUnfollowUserHandler } = useFeed();

    const handleFollowUnfollow = async(id)=>{
        const data = await followUnfollowUserHandler(id);
        if(data.success){
            toast.success(data.message);
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
                            <span onClick={()=>handleFollowUnfollow(account._id)} className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]'>{isUserFollowAccount ?'Unfollow' : 'Follow'}</span>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default SuggestedUsers