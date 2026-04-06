import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import Input from '@/custom/Input'
import Button from '@/custom/Button'
import useLogin from '../hooks/useLogin'

const initialValue = {
    email: '',
    password: '',
}

const Login = () => {

    const navigate = useNavigate();
    const {loading,login,user} = useLogin();

    const [input, setInput] = useState(initialValue)
    const onChangeHandler = (e) => {
        setInput(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleUserLogin = async(e)=>{
        e.preventDefault();
        const data = await login(input);
        if(data?.success){
            navigate("/")
            toast.success(data.message);
            setInput(initialValue);
        }
    }

    useEffect(()=>{
        if(user) navigate('/');
    },[])

    return (
        <div className='flex items-center w-screen h-screen justify-center'>
            <form onSubmit={handleUserLogin} className='shadow-lg flex flex-col gap-5 p-6 min-w-80'>
                <div>
                    <h1 className='text-center font-bold text-xl'>LOGO</h1>
                    <p className='text-sm text-center'>Login to your account</p>
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
                    loading ? <Button className="flex justify-center items-center gap-4" disabled={true}>Please wait <Loader2 className='mr-2 h-4 w-4 animate-spin '/></Button> : <Button type='submit'>Login</Button>
                }
                <span className='text-center'>Create New Account? <Link className="text-blue-700 " to='/signup'>Signup</Link></span>
            </form>
        </div>
    )
}

export default Login