import { createSlice } from "@reduxjs/toolkit";


// 11:33 to 12:00
const notificationSlice = createSlice({
    name:'notification',
    initialState: {
        likeNotification:[],
    },
    reducers:{
        setLikeNotification:(state,action)=>{
            console.log(action.payload);
            if(action.payload.type === 'like'){
                state?.likeNotification?.push(action.payload);
            }else if(action.payload.type === 'dislike'){
                state.likeNotification = state.likeNotification?.filter((item)=> item.userId !== action.payload.userId);
            }
        }
    }
});
export const {setLikeNotification} = notificationSlice.actions;
export default notificationSlice.reducer;