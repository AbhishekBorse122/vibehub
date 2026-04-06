import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1/post',
    withCredentials: true,
})


export const deleteHandler = async(id)=>{
    try {
        const res = await api.delete(`/delete/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export const postLikeDisLikeHandler = async({id,likeStatus})=>{
    try {
        const res = await api.get(`/${id}/${likeStatus}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export const postCommentHandler = async({id,comment})=>{
    try {
        const res = await api.post(`/${id}/comment`,{ text:comment }, {
            headers: {
                'Content-Type': 'application/json'
            }, 
        });
        return res.data;    
    } catch (error) {
        console.log(error);
    }
}
export const postBookmarkHandler = async(id)=>{
    try {
        const res = await api.get(`/${id}/bookmark`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export const followUnfollowHandler = async(id)=>{
    try {
        const res = await axios.post(`http://localhost:8000/api/v1/user/followorunfollow/${id}/`,{},{ withCredentials: true});
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export const createPost = async(formdata)=>{
    try {
        const res = await api.post(`/addpost`,formdata,{
            headers: {
                    'Content-Type': 'multipart/form-data'
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}