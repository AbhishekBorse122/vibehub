import React from 'react'
import { Avatar } from './custom/Avatar'; 
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import SuggestedUsers from './SuggestedUsers';

const RightSidebar = () => {
  const { user } = useSelector(store => store.auth);

  return (
    <div className='w-fit my-10 pr-32'>
      <div className='flex items-center gap-2'>
        <Link to={`/profile/${user?._id}`}>
          <Avatar src={user?.profilePicture} alt="post_image"></Avatar>
        </Link>
        <div>
          <div className='flex items-center gap-1'>
            <h1 className='font-semibold text-sm'><Link to={`/profile/${user?._id}`}>{user?.username}</Link></h1>
            <RiVerifiedBadgeFill className='text-blue-600' />
          </div>
          <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here...'}</span>
        </div>
      </div>
      <SuggestedUsers/>
    </div>
  )
}

export default RightSidebar