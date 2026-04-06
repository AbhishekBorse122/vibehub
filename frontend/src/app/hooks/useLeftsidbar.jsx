import { setUser } from '@/store/authSlice';
import { setPosts, setSelectedPost } from '@/store/postSlice';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/features/auth/services/auth';

const useLeftsidbar = () => {

    const dispatch = useDispatch();

    const {user} = useSelector(store=>store.auth)
    const {likeNotification} = useSelector(store=>store.notification);

    const logoutHandler = async()=>{
		try{
            const data = await logout()
            if(data?.success){
                dispatch(setUser(null));
                dispatch(setPosts([]));
                dispatch(setSelectedPost(null));
            }
            return data;
		}catch(err){
			console.error(err);
		}
	}
    return {user,likeNotification,logoutHandler}
}

export default useLeftsidbar