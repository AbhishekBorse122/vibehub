import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1/user',
    withCredentials: true,
})


export const loginHandler = async (user)=>{
    try {
        const res = await api.post('/login',user,{
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return res.data;
    }catch(error){
        console.log(error);
    }
}

export const signupHandler = async(user)=>{
    try {
        const res = await api.post('/register',user,{
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return res.data;
    }catch(error){
        console.log(error);
    }
} 

export const logout =  async()=>{
    try {
        const res = await api.get('/logout')
        if(!res.data.success){
            throw new Error(res?.data?.message || 'Something went wrong!')
        }
        return res.data;
    }catch(error) {
        console.error(error.message);
    }
}