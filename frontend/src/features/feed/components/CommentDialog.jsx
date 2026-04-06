import React, { useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/custom/Dialog";
import { Avatar } from '@/custom/Avatar';
import { Link } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import Comment from './Comment';
import { toast } from 'sonner';
import usePost from '../hooks/usePost';

const CommentDialog = ({open,setOpen}) => {

    const {selectedPost,commentPost} = usePost();
    const [comment,setComment] = useState('');

    const onChangeHandler = (e)=>{
        let input = e.target.value;
        if(input.trim()){
            setComment(prev=> e.target.value);
        }else{
            setComment('');
        }
    }

    const postCommentHandler = async()=>{
        const data = await commentPost({item:selectedPost,comment});
        if(data.success){
          setComment('');
          toast.success(data.message);
        }
    }

    return (
        <Dialog open={open} setOpen={setOpen}>
            <DialogContent className='flex !p-0 !max-w-4xl'>
                <div className='w-1/2'>
                    <img src={selectedPost?.image || ""} className='w-fit h-full object-cover rounded' alt="" />
                </div>
                <div className='w-1/2 flex flex-col'>
                    <div className='flex items-center justify-between border-b p-3'>
                        <div className='flex items-center gap-2'>
                            <Link><Avatar src={selectedPost?.author?.profilePicture || ""} /></Link>
                            <Link><h1 className='text-sm'>{selectedPost?.author?.username}</h1></Link>
                        </div>
                        <Dialog>
                            <DialogTrigger>
                                <MoreHorizontal className='cursor-pointer'/>
                            </DialogTrigger>
                            <DialogContent className='flex flex-col gap-4 items-center text-sm'>
                                <div className='text-[#ED4956] cursor-pointer'>Unfollow</div>
                                <div className='cursor-pointer '>Add to favourites</div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className='flex-1 overflow-y-auto max-h-96 p-3'>
                        {selectedPost?.comments?.length > 0 && selectedPost?.comments?.map((comment)=>  <Comment key={comment._id} comment={comment}/> )}
                    </div>
                    <div className='flex items-center gap-2 p-3'>
                        <input 
                            type="text" 
                            name='comment'
                            value={comment}
                            onChange={onChangeHandler}
                            placeholder='Add a comment...' 
                            className='w-full rounded border py-1 px-3'/>
                        <button 
                            disabled={!comment.trim()}
                            onClick={postCommentHandler} 
                            className="border border-black py-1 px-2 rounded text-white bg-black cursor-pointer disabled:cursor-not-allowed disabled:opacity-80">Send</button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CommentDialog