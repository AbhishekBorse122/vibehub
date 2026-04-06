import { useState } from "react";
import { signupHandler } from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/authSlice";

const useSignup = ()=>{

    const dispatch = useDispatch();

    const { user } = useSelector(store=>store.auth);

    const [loading,setLoading] = useState(false); 

    const signup = async(user)=>{
        try {
            setLoading(true);
            const data = await signupHandler(user);
            console.log(data);
            return data;
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return {loading,signup,user} 
}

export default useSignup;
