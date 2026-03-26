import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'

const Posts = () => {

  const {posts} = useSelector(store=>store.post);
  
  return (
    <div>
        {posts?.map((item,_)=> <Post key={item._id} item={item}/> )}
    </div>
  )
}

export default Posts