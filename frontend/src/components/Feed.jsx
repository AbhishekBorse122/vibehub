import React from 'react'
import Posts from './Posts'
import useGetPosts from '@/hook/useGetPosts';
import { useSelector } from 'react-redux';

const Feed = () => {

  useGetPosts();
  const {posts} = useSelector(store=>store.post);

  return (
    <div className='flex-1 my-8 flex flex-col items-center pl-[20%] '>
      <Posts/>
    </div>
  )
}

export default Feed