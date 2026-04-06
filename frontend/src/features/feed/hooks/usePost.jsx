import { setPosts, setSelectedPost } from "@/store/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { createPost, deleteHandler, followUnfollowHandler, postBookmarkHandler, postCommentHandler, postLikeDisLikeHandler } from "../services/post";
import { useState } from "react";

const usePost = () => {


    const dispatch = useDispatch();
    const {user} = useSelector(store=>store.auth);
    const {posts,selectedPost} = useSelector(store=>store.post);
    const [loading,setLoading] = useState(false);

    const deletePost = async(id)=>{
        try {
            const data = await deleteHandler(id);          
            if(data.success){
                const updatedPosts = posts.filter(post=> post._id !== id);
                dispatch(setPosts(updatedPosts));
            } else {
                throw new Error(data?.message || "Something went Wrong!");
            }
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const likePost = async({id,likeStatus})=>{
        try {
            const data = await postLikeDisLikeHandler({id,likeStatus});
            if(data.success){
                const updatedPosts = posts.map(post=> 
                    post._id === id ? {
                        ...post,
                        likes: likeStatus === 'like' ? [...post.likes,user._id] : post.likes.filter(id=> id !== user._id), 
                    } : post 
                )
                dispatch(setPosts(updatedPosts));
            } else {
                throw new Error(data?.message || "Something went Wrong!");
            }
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const commentPost = async({item,comment})=>{
        try{
            const data = await postCommentHandler({id:item?._id,comment});
            if(data.success){
                const updatedPosts = posts.map((post)=> post._id === item._id ? { ...post,comments: [...post.comments, data.comment] } : post)
                dispatch(setSelectedPost({...item, comments: [...item.comments, data.comment]}))
                dispatch(setPosts(updatedPosts));

            } else {
                throw new Error(data?.message || "Something went Wrong!");
            }
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const bookmarkPost = async(id)=>{
        try {
            const data = await postBookmarkHandler(id)
            if(!data.success) {
                throw new Error(data?.message || "Something went Wrong!");
            }
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const followUnfollowUser = async(id)=>{
        try {
            const data = await followUnfollowHandler(id);
            if(!data.success) {
                throw new Error(data?.message || "Something went Wrong!");
            }
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const createPostHandler = async(formdata)=>{
        try {
            setLoading(true);
            const data = await createPost(formdata)
            if(data.success){
                dispatch(setPosts([data.post,...posts]))
            }
            return data;
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false);
        }
    }

    return {loading,user,selectedPost,deletePost,likePost,commentPost,bookmarkPost,followUnfollowUser,createPostHandler};
}

export default usePost;