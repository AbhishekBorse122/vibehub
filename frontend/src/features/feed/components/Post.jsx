import React, { useState } from 'react'
import { Avatar } from '@/custom/Avatar'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/custom/Dialog";
import { MoreHorizontal } from 'lucide-react';
import { FaRegHeart } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { LuSend } from "react-icons/lu";
import { LuBookmark } from "react-icons/lu";
import { BsBookmarkFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
// import CommentDialog from '@/components/CommentDialog'; 
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { setSelectedPost} from '@/store/postSlice';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import usePost from '../hooks/usePost';
import CommentDialog from './CommentDialog';

const Post = ({item}) => {


  const {user,deletePost,likePost,commentPost,bookmarkPost, followUnfollowUser} = usePost();

  const dispatch = useDispatch();
  const isUserIsPostOwner = (item.author?._id === user?._id);
  const isUserHasLikePost = item.likes.includes(user?._id) || false;
  const isBookmarkedPost = user?.bookmarks.includes(item?._id) || false;
  const isUserFollowPostOwner = user?.following?.includes(item?.author?._id) || false;

  const [comment,setComment] = useState('');
  const [open,setOpen] = useState(false);

  const onChangeHandler = (e)=>{
      let input = e.target.value;
      if(input.trim()){
          setComment(prev=> e.target.value);
      }else{
          setComment('');
      }
  }
  const deleteHandler = async()=>{
      const data = await deletePost(item?._id);
      if(data.success){
          toast.success(data.message);
      }
  }
  const postLikeDisLikeHandler = async()=>{
      let likeStatus = isUserHasLikePost ? 'dislike': 'like'; 
      const data = await likePost({id: item?._id,likeStatus});
      if(data.success){
          toast.success(data.message);
      }
  }
  const postCommentHandler = async()=>{
    const data = await commentPost({item,comment})
    if(data.success){
      setComment('');
      toast.success(data.message);
    }
  }
  const postBookmarkHandler = async()=>{
      const data = await bookmarkPost(item?._id);
      if(data.success){
        toast.success(data.message);
      }
  }
  const followUnfollowHandler = async()=>{
      const data = await followUnfollowUser(item?.author?._id);
      if(data.success){
        toast.success(data.message);
      }
  }

  return (
    
    <div className='my-8 w-full max-w-sm mx-auto'>
      <div className='flex items-center justify-between'>
        <Link to={`/profile/${item?.author?._id}`} className='flex items-center gap-2'>
          <Avatar src={item?.author?.profilePicture} />
          <div className='flex items-center gap-1'>
            <h1>{item?.author?.username}</h1>
            {user?._id === item?.author._id && <RiVerifiedBadgeFill className='text-blue-600' />}
          </div>
        </Link>
        <Dialog>
          <DialogTrigger>
            <MoreHorizontal className='cursor-pointer' />
          </DialogTrigger>
          <DialogContent className='flex flex-col items-center text-sm text-center gap-2 p-0'>
            {
              isUserIsPostOwner ? 
                <button onClick={deleteHandler} className='text-lg font-medium w-full py-2 rounded text-[#ED4956] hover:bg-gray-100'>Delete</button>
              : <button onClick={followUnfollowHandler} className='text-lg font-medium w-full py-2 rounded text-[#ED4956] hover:bg-gray-100'>{ isUserFollowPostOwner ? 'Unfollow': 'Follow'}</button>
            }
            <button className='text-lg font-medium w-full py-2 rounded text-[#] hover:bg-gray-100'>Add to favourites</button>
          </DialogContent>
        </Dialog>
      </div>
      <img src={item?.image} 
        className='rounded-sm my-2 w-full aspect-square object-cover' 
        alt="post-img" />
      <div className='flex justify-between items-center'>
        <div className='flex justify-between gap-4'>
          {
            isUserHasLikePost ? 
              <FaHeart onClick={postLikeDisLikeHandler} size={'20px'} className='cursor-pointer text-red-600'/>
            : <FaRegHeart onClick={postLikeDisLikeHandler} size={'20px'} className='cursor-pointer'/>
          }
          <FiMessageCircle 
            onClick={()=>{
              dispatch(setSelectedPost(item));
              setOpen(true);
            }} 
            size={'20px'} className='cursor-pointer'/>
          <LuSend size={'20px'}  className='cursor-pointer'/>
        </div>
        {
          isBookmarkedPost ? <BsBookmarkFill onClick={postBookmarkHandler} size={'20px'} className='cursor-pointer'/> :
          <LuBookmark onClick={postBookmarkHandler} size={'20px'}  className='cursor-pointer'/>
        }
      </div>
      {item?.likes.length > 0 && <span className='font-medium block mt-2'>{item.likes.length} likes</span>}
      { 
        item?.caption &&
        <p><span className='font-medium mr-2'>{item?.author?.username}</span> {item.caption}</p>
      }
      { 
       item?.comments?.length > 0 &&  
       <span onClick={()=>{
                        dispatch(setSelectedPost(item));
                        setOpen(true)
                      }} 
        className='text-gray-400 cursor-pointer'>
          View all {item?.comments?.length} comments
        </span>
      }
      <CommentDialog open={open} setOpen={setOpen}/>
      <div className='flex justify-between items-center gap-2'>
        <input type="text" 
          name='comment'
          value={comment}
          onChange={onChangeHandler}
          placeholder='Add a comment...'
          className='outline-none text-sm w-full placeholder:text-gray-400'
        />
        {
          comment && <span className='text-blue-700 text-sm cursor-pointer' onClick={postCommentHandler}>Post</span>
        }
      </div>
    </div>
  )
}

export default Post