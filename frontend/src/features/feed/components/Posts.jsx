import React from 'react'
import { useSelector } from 'react-redux'
import Post from './Post';

const Posts = () => {

  const {posts} = useSelector(store=>store.post);
  
  return (
    <div>
      {posts?.map((item,_)=> <Post key={item._id} item={item}/> )}
    </div>
  )
}

export default Posts