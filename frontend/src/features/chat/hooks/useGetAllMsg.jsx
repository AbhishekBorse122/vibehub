import { setMessages } from '@/store/chatSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllMsg = (id) => {
  
  const dispatch = useDispatch();
  
  useEffect(()=>{
    const getAllMessages = async()=>{
      const res = await axios.get(`http://localhost:8000/api/v1/message/all/${id}`,{withCredentials: true});
      if(res.data.success){
        dispatch(setMessages(res.data.messages));
      }
    }
    getAllMessages();
  },[id])

}

export default useGetAllMsg