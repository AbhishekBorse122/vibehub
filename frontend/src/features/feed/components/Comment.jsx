import React from 'react'
import { Avatar } from '@/custom/Avatar' 
import { Link } from 'react-router-dom'

const Comment = ({ comment }) => {
    return (
        <div className='my-2'>
            <div className='flex gap-3 items-center'>
                <Link><Avatar  src={comment?.author?.profilePicture}  /></Link>
                <h1 className='font-bold text-sm'>{comment?.author.username} <span className='font-normal pl-1'>{comment?.text}</span></h1>
            </div>
        </div>
    )
}

export default Comment