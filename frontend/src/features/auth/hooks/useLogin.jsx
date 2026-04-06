import { useState } from "react";
import { loginHandler } from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/authSlice";

const useLogin = ()=>{

    const dispatch = useDispatch();

    const { user } = useSelector(store=>store.auth);

    const [loading,setLoading] = useState(false); 

    const login = async(input)=>{
        try {
            setLoading(true);
            const data = await loginHandler(input);
            console.log(data);
            if(data?.success){
                dispatch(setUser((data.user)));
            } else {
                throw new Error(data.message || "Something went wrong!");
            }
            return data;
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return {loading,login,user} 
}

export default useLogin;
