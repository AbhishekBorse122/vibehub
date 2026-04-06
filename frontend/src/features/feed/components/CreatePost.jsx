import React, { useRef, useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/custom/Dialog";
import { Avatar } from '@/custom/Avatar';
import { readFileAsDataURL } from '../utils/util';
import Button from '@/custom/Button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import usePost from '../hooks/usePost';

const CreatePost = ({open,setOpen}) => {

    const imgRef = useRef();

    const {loading,user,createPostHandler} = usePost();
    const [file,setFile] = useState('');
    const [caption,setCaption] = useState('');
    const [imgPreview,setImgPreview] = useState('');

    const handleCreatePost = async()=>{
        const formData = new FormData();
        formData.append('caption',caption);
        if(imgPreview){
            formData.append('image',file);
        }
        const data = await createPostHandler(formData);
        if(data.success){
            toast.success(data.message);
            setOpen(false);
        }
    }

    const fileChangeHandler = async(e)=>{
        let inputFile = e.target.files[0];
        if(inputFile){
            setFile(inputFile);
            const dataUrl = await readFileAsDataURL(inputFile);
            setImgPreview(dataUrl);
        }
    }


    return (
        <Dialog open={open} setOpen={setOpen}>
            <DialogContent className='flex flex-col text-sm'>
                <DialogHeader className='font-semibold'>Create New Post</DialogHeader>
                <div className='flex gap-3'>
                    <Avatar src="https://github.com/shadcn.png" />
                    <div>
                        <h1 className='font-semibold text-xs'>{user?.username}</h1>
                        <span className='text-gray-600 text-xs'>{user?.bio}</span>
                    </div>
                </div>
                <textarea onChange={(e)=>setCaption(e.target.value)} value={caption} name="caption" className="mt-4 focus:outline-none focus-visible:ring-transparent border-none" placeholder='Write a cation...'></textarea>
                {
                    imgPreview && 
                    <div className='w-full h-64 flex items-center justify-center'>
                        <img src={imgPreview ?? ''} className='w-full h-full rounded object-contain' alt="preview_img" />
                    </div>
                }
                <input ref={imgRef} onChange={fileChangeHandler} type="file" name='img' className='hidden'/>
                <button onClick={()=> imgRef.current.click()} className='rounded px-4 py-2 mt-4 text-white w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf] '>Select from computer</button>
                {
                    imgPreview && (
                        loading ? (
                            <Button className='flex w-full mt-4 justify-center gap-3 items-center cursor-not-allowed'>
                                Please wait
                                <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                            </Button>
                        ) : (
                            <Button onClick={handleCreatePost} type="submit" className="w-full mt-4">Post</Button>
                        )
                    )
                }
            </DialogContent>
        </Dialog>
    )
}

export default CreatePost