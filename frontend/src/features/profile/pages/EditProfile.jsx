import React, { useRef, useState } from 'react'
import { Avatar } from '@/custom/Avatar'
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import useProfile from '../hooks/useProfile';

const EditProfile = () => {

  const imgRef = useRef();

    const {user,loading,updateUserProfileHandler} = useProfile();

    const [info,setInfo] = useState({
        profilePicture: user?.profilePicture,
        bio: user?.bio,
        gender: user?.gender,
    })

    const changeInfoHandler = (e)=>{
        setInfo(prev=>({
        ...prev,
        [e.target.name]: e.target.value,
        }))
    }
    const fileChangeHandler = (e)=>{
        let inputFile = e.target.files[0];
        if(inputFile){
        setInfo(prev=> ({
            ...prev,
            profilePicture: inputFile,
        }));
        }
    }

    const updateProfileHandler = async()=>{
        const formData = new FormData();
        formData.append('bio',info.bio);
        formData.append('gender',info.gender);
        if(info.profilePicture){
        formData.append('profilePicture',info.profilePicture);
        }
        const data = await updateUserProfileHandler(formData);
        if(data?.success){
            toast.success(data?.message);
        }
    }

    return (
        <div className='flex max-w-2xl mx-auto pl-10'>
            <section className='flex flex-col gap-6 w-full my-8'>
                <h1 className='font-bold text-xl'>Edit Profile</h1>
                <div className='flex items-center justify-between bg-gray-100 rounded-xl p-4'>
                    <div className='flex items-center gap-3'>
                        <Avatar src={user?.profilePicture} />
                        <div>
                            <h1 className='font-bold text-sm'>{user?.username}</h1>
                            <span className='text-gray-600'>{user?.bio}</span>
                        </div>
                    </div>
                    <input ref={imgRef} type='file' className='hidden' onChange={fileChangeHandler}/>
                    <button onClick={()=>imgRef.current.click()} className='bg-[#0095F6] hover:bg-[#318bc7] text-white font-medium px-4 py-2 rounded'>Change photo</button>
                </div>
                <div>
                    <h1 className='font-bold text-xl mb-2'>Bio</h1>
                    <textarea onChange={changeInfoHandler} value={info.bio} name='bio' className="w-full border p-3 focus-visible:ring-transparent" placeholder='Write about yourself...'/>
                </div>
                <div>
                    <h1 className='font-bold mb-2'>Gender</h1>
                    <select value={info.gender} name='gender' onChange={changeInfoHandler} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition">
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='transgender'>Transgender</option>
                    </select>
                </div>
                <div className='flex justify-center'>
                    {
                    loading ? (
                        <button className='flex items-center  gap-2 bg-[#0095F6] hover:bg-[#318bc7] text-white font-medium px-4 py-2 rounded cursor-not-allowed'>
                            Please wait...
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        </button>
                    ) : (
                        <button onClick={updateProfileHandler} className='bg-[#0095F6] hover:bg-[#318bc7] text-white font-medium px-4 py-2 rounded'>Update profile</button>
                    )
                    }
                </div>
            </section>
        </div>
    )
}

export default EditProfile