import { sendMsg } from '../services/chat'
import { setMessages } from '@/store/chatSlice';
import { useDispatch, useSelector } from 'react-redux';

const useChat = () => {
    
    const dispatch = useDispatch();
    const {onlineUsers,messages} = useSelector(store=>store.chat);

    const sendMsgHandler = async({recieverId,msg})=>{
        try{
            const data = await sendMsg({recieverId,msg})
            if(data.success){
                dispatch(setMessages([...messages,data.newMessage]))
            } else {
                throw new Error(data?.message || 'Something went wrong!');
            }
            return data;
        }catch(error){
            console.log(error);
        }
    }

    return {onlineUsers, sendMsgHandler}
}

export default useChat