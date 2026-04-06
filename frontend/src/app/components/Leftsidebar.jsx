import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Avatar } from '@/custom/Avatar'
import { Popover, PopoverTrigger, PopoverContent, usePopover} from '@/custom/Popover'
import CreatePost from '@/features/feed/components/CreatePost'
import useLeftsidbar from '../hooks/useLeftsidbar'

const sidebarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notifications" },
    { icon: <PlusSquare />, text: "Create" },
    {
        icon: <Avatar src="https://github.com/shadcn.png" />,
        text: "Profile"
    },
    { icon: <LogOut />, text: "Logout" },
]

const Leftsidebar = () => {

	const navigate = useNavigate();
    const popover = usePopover();

    const { user,likeNotification,logoutHandler } = useLeftsidbar();

    const [open,setOpen] = useState(false);

    if(user && user.profilePicture) {
        sidebarItems[6].icon = <Avatar src={user.profilePicture} />
    }

	const handleLogout = async()=>{
        const data = await logoutHandler()
        if(data?.success){
            navigate('/login');
            toast.success(data.message);
        }
	}

    const sidebarHandler = (tab)=>{
        if(tab === 'Home') navigate('/');
        else if(tab === 'Messages') navigate('/chat');
        else if(tab === 'Profile') navigate(`/profile/${user._id}`);
        else if(tab === 'Create') setOpen(true);
        else if(tab === 'Logout') handleLogout();
    }

    return (
        <div className='fixed top-0 left-0 z-10 bottom-0 w-[16%] h-screen border-r border-r-gray-300 px-4'>
            <div className='flex flex-col'>
                <h1 className='my-8 pl-3 font-bold text-xl'>LOGO</h1>
            {
                sidebarItems.map((tab)=>(
                    <div onClick={()=> sidebarHandler(tab.text)} key={tab.text} className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'>
                        {tab.icon}
                        <span>{tab.text}</span>
                        {
                            tab.text === 'Notifications' && likeNotification?.length > 0 &&
                            <Popover popover={popover}>
                                <PopoverTrigger popover={popover}>
                                    <button className="text-white rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6">{likeNotification.length}</button>
                                </PopoverTrigger>
                                <PopoverContent popover={popover}>
                                    {
                                        likeNotification?.length === 0 ? (<p>No new notification</p>) : (
                                            likeNotification?.map((notification) => {
                                                return (
                                                    <div key={notification.userId} className='flex items-center gap-2'>
                                                        <Avatar src={notification.userDetails?.profilePicture}></Avatar>
                                                        <p className='text-sm'><span className='font-bold'>{notification.userDetails?.username}</span> liked your post</p>
                                                    </div>
                                                )
                                            })
                                        )
                                    }
                                </PopoverContent>
                            </Popover> 
                        }
                    </div>
                ))
            }
            </div>
            <CreatePost open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Leftsidebar