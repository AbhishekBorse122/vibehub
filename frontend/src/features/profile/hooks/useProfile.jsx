import { setUser } from '@/store/authSlice';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../services/user';

const useProfile = () => {

    const dispatch = useDispatch();
    const {user} = useSelector(store=>store.auth);
    const [loading,setLoading] = useState(false);

    const updateUserProfileHandler = async(formdata)=>{
        try {
            setLoading(true);
            const data = await updateUserProfile(formdata);
            if(data.success){
                dispatch(setUser(data?.user));
            } else {
                throw new Error(data.message || 'Something went wrong!')
            }
            return data;
        } catch(error) {
            console.log(error?.message);
        } finally {

            setLoading(false)
        }
    }

    return {user,loading,updateUserProfileHandler}
}

export default useProfile