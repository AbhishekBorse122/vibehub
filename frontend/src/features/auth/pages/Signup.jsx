import React, { useEffect, useState } from 'react'
import Input from '@/custom/Input'
import Button from '@/custom/Button'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import useSignup from '../hooks/useSignup'

const initialValue = {
    username: '',
    email: '',
    password: '',
}

const Signup = () => {

    const navigate = useNavigate();

    const {loading,signup,user} = useSignup();

    const [input, setInput] = useState(initialValue)
    const onChangeHandler = (e) => {
        setInput(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleUserSignup = async(e)=>{
        e.preventDefault();
        const data = await signup(input);
        if(data?.success){
            navigate('/login')
            toast.success(data.message);
            setInput(initialValue);
        }
    }

    useEffect(()=>{
        if(user) navigate('/');
    },[])

    return (
        <div className='flex items-center w-screen h-screen justify-center'>
            <form onSubmit={handleUserSignup} className='shadow-lg flex flex-col gap-5 p-6 min-w-80'>
                <div>
                    <h1 className='text-center font-bold text-xl'>VibeHub</h1>
                    <p className='text-sm text-center mt-4'>Signup to match the vibe with your friends</p>
                </div>
                <div className='flex flex-col'>
                    <label className='font-medium pb-1'>Username</label>
                    <Input onChange={onChangeHandler} value={input.username} name="username" type='text' className="focus-visible:ring-transparent" />
                </div>
                <div className='flex flex-col'>
                    <label className='font-medium pb-1'>Email</label>
                    <Input onChange={onChangeHandler} value={input.email} name="email" type='email' className="focus-visible:ring-transparent" />
                </div>
                <div className='flex flex-col'>
                    <label className='font-medium pb-1'>Password</label>
                    <Input onChange={onChangeHandler} value={input.password} name="password" type='text' className="focus-visible:ring-transparent" />
                </div>
                {
                    loading ? <Button className="flex justify-center items-center gap-4" disabled={true}>Please wait <Loader2 className='mr-2 h-4 w-4 animate-spin '/></Button> : <Button type='submit'>Signup</Button>
                }
                <span className='text-center'>Already have an Account? <Link className="text-blue-700 " to='/login'>Login</Link></span>
            </form>
        </div>
    )
}

export default Signup