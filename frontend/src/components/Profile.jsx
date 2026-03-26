import React, { useState } from 'react'
import { Link, Outlet, useActionData, useParams } from 'react-router-dom'
import { Avatar } from './custom/Avatar'
import { AtSign, Heart, MessageCircle } from 'lucide-react'
import { useSelector } from 'react-redux'
import useGetUserProfile from '@/hook/useGetUserProfile'
import Badge from './custom/Badge'


// Implement => follow & unfollow functionality
const Profile = () => {
  
  const params = useParams();
  useGetUserProfile(params.id);
  const { userProfile,user } = useSelector(store => store.auth);
  
  const [activeTab,setActiveTab] = useState('posts');

  const tabChangeHandler = (tab)=>{
    setActiveTab(tab);
  }

  const isLoggedInUserProfile = user._id === userProfile?._id;
  const isFollowing = userProfile?.following.includes(user._id);
  
  let postsToDisplayed = [];
  if(activeTab === 'posts' || activeTab === 'saved'){
    postsToDisplayed = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;
  }

  return (
    <div className='flex max-w-5xl justify-center mx-auto pl-10'>
      <div className='flex flex-col gap-20 p-8'>
        <div className='grid grid-cols-2'>
          <section className='flex items-center justify-center'>
            <Avatar src={userProfile?.profilePicture} alt='profilephoto' className='!h-32 !w-32'></Avatar>
          </section>
          <section>
            <div className='flex flex-col gap-5'>
              <div className='flex items-center gap-2'>
                <span>{userProfile?.username}</span>
                {
                  isLoggedInUserProfile ?
                    <>
                      <Link to="/account/edit"><button className='bg-slate-100 text-slate-900 rounded-md text-sm font-medium  px-4 py-2 hover:bg-gray-200 h-8'>Edit profile</button></Link>
                      <button className='bg-slate-100 text-slate-900 rounded-md text-sm font-medium  px-4 py-2 hover:bg-gray-200 h-8'>View archive</button>
                      <button className='bg-slate-100 text-slate-900 rounded-md text-sm font-medium  px-4 py-2 hover:bg-gray-200 h-8'>Ad tools</button>
                    </>
                    : isFollowing ? (
                      <>
                        <button className='h-8'>Unfollow</button>
                        <button className='h-8'>Message</button>
                      </>
                    )
                    : <button className='bg-[#0095F6] hover:bg-[#3192d2] h-8'>Follow</button>
                }
              </div>
              <div className='flex items-center gap-4'>
                <p><span className='font-semibold'>{userProfile?.posts?.length}</span> posts</p>
                <p><span className='font-semibold'>{userProfile?.followers?.length}</span> followers</p>
                <p><span className='font-semibold'>{userProfile?.following?.length}</span> following</p>
              </div>
              <div className='flex flex-col gap-1'>
                {userProfile?.bio && <span className='font-semibold'>{userProfile?.bio}</span>}
                <Badge><AtSign size={'16px'}/><span className='pl-1'>{userProfile?.username}</span> </Badge>
              </div>
            </div>
          </section>
        </div>
        <div className='border-t border-t-gray-200'>
          <div className='flex items-center justify-center gap-10 text-sm my-3'>
            <span onClick={()=>tabChangeHandler('posts')} className={`p-2 cursor-pointer rounded ${activeTab === 'posts' ? 'font-bold bg-slate-200' : ''}`}>POSTS</span>
            <span onClick={()=>tabChangeHandler('saved')} className={`p-2 cursor-pointer rounded ${activeTab === 'saved' ? 'font-bold bg-slate-200' : ''}`}>SAVED</span>
            <span onClick={()=>tabChangeHandler('reels')} className={`p-2 cursor-pointer rounded ${activeTab === 'reels' ? 'font-bold bg-slate-200' : ''}`}>REELS</span>
            <span onClick={()=>tabChangeHandler('tags')}  className={`p-2 cursor-pointer rounded ${activeTab === 'tags' ? 'font-bold bg-slate-200' : ''}`}>TAGS</span>
          </div>
          <div className='grid grid-cols-3 gap-1 items-center '>
            { 
              postsToDisplayed?.length > 0 ?
              postsToDisplayed?.map((post) => {
                return (
                  <div key={post?._id} className='relative group cursor-pointer'>
                    <img src={post.image} alt='postimage' className='rounded-sm w-full aspect-square object-cover' />
                    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      <div className='flex items-center text-white space-x-4'>
                        <button className='flex items-center gap-2 hover:text-gray-300'>
                          <Heart />
                          <span>{post?.likes.length}</span>
                        </button>
                        <button className='flex items-center gap-2 hover:text-gray-300'>
                          <MessageCircle />
                          <span>{post?.comments.length}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
              : <p className='capitalize'>No {activeTab} found</p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;