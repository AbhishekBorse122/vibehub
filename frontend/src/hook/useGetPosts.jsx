import { setPosts } from '@/store/postSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetPosts = () => {
  
  const dispatch = useDispatch();
  
  useEffect(()=>{
    const getPosts = async()=>{
      const res = await axios.get('http://localhost:8000/api/v1/post/all',{withCredentials: true});
      if(res.data.success){
        dispatch(setPosts(res.data.posts));
      }
    }
    getPosts();
  },[])

}

export default useGetPosts