import React, { useEffect, useState } from 'react'
import { Avatar } from './custom/Avatar'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "./custom/Dialog";
import { MoreHorizontal } from 'lucide-react';
import { FaRegHeart } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { LuSend } from "react-icons/lu";
import { LuBookmark } from "react-icons/lu";
import { BsBookmarkFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import CommentDialog from './CommentDialog';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { setPosts, setSelectedPost} from '@/store/postSlice';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { setUser } from '@/store/authSlice';

// Implement => unfollow follow bookmark dynamic updates.
const Post = ({item}) => {

  const dispatch = useDispatch();
  const {user} = useSelector(store=>store.auth);
  const {posts} = useSelector(store=>store.post);
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
    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/post/delete/${item?._id}`,{ withCredentials: true});
      if(res.data.success){
        const updatedPosts = posts.filter(post=> post._id !== item?._id);
        dispatch(setPosts(updatedPosts));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const postLikeDisLikeHandler = async()=>{
    let likeStatus = isUserHasLikePost ? 'dislike': 'like'; 
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/post/${item?._id}/${likeStatus}`,{ withCredentials: true});
      if(res.data.success){
        const updatedPosts = posts.map(post=> 
            post._id === item._id ? {
              ...post,
              likes: likeStatus === 'like' ? [...post.likes,user._id] : post.likes.filter(id=> id !== user._id), 
            } : post 
        )
        dispatch(setPosts(updatedPosts));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const postCommentHandler = async()=>{
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/post/${item?._id}/comment`,{text:comment}, {
          headers: {
            'Content-Type': 'application/json'
          }, 
          withCredentials: true,
      });
      if(res.data.success){
       const updatedPostComments = [...item.comments, res.data.comment];
        const updatedPosts = posts.map(post=> 
            post._id === item._id ? {
              ...post,
              comments: [...updatedPostComments],
            } : post 
        )
        dispatch(setPosts(updatedPosts));
        setComment('');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const postBookmarkHandler = async()=>{
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/post/${item?._id}/bookmark`,{ withCredentials: true});
      if(res.data.success){
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const followUnfollowHandler = async()=>{
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/user/followorunfollow/${item?.author?._id}/`,{},{ withCredentials: true});
      if(res.data.success){
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(item);
  console.log(user);
  console.log(isUserFollowPostOwner);

  return (
    <div className='my-8 w-full max-w-sm mx-auto'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Avatar src={item?.author?.profilePicture} />
          <div className='flex items-center gap-1'>
            <h1>{item?.author?.username}</h1>
            {user?._id === item?.author._id && <RiVerifiedBadgeFill className='text-blue-600' />}
          </div>
        </div>
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
        {/* */}
      </div>
      {item?.likes.length > 0 && <span className='font-medium block mt-2'>{item.likes.length} likes</span>}
      { 
        item?.caption &&
        <p><span className='font-medium mr-2'>{item?.author?.username}</span> {item.caption}</p>
      }
      { 
       item?.comments?.length > 0 &&  <span onClick={()=>setOpen(true)} className='text-gray-400 cursor-pointer'>View all {item?.comments?.length} comments</span>
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