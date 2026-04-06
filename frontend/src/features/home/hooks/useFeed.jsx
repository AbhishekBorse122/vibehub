import React from 'react'
import { followUnfollowUser } from '../services/post';
import { useSelector } from 'react-redux';

const useFeed = () => {

    const { user, suggestedUsers } = useSelector(store => store.auth);

    const followUnfollowUserHandler = async()=>{
        try {
            const data = await followUnfollowUser(id);
            if(!data.success){
               throw new Error(data?.message || "Something went wrong");
            }
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    return { user, suggestedUsers, followUnfollowUserHandler }
}

export default useFeed