import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1/user',
    withCredentials: true,
})

export const followUnfollowUser = async(id)=>{
    try {
        const res = await api.post(`/followorunfollow/${id}/`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}