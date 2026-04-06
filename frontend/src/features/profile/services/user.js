import  axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1/user/profile/',
    withCredentials: true,
})

export const updateUserProfile = async(formdata)=>{
    const res = await api.post('/edit',formdata,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
}