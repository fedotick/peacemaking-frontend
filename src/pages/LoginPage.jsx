import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice'

export const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { status } = useSelector(state => state.auth)
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, [status, isAuth, navigate])

    const handleSubmit = () => {
        try {
            dispatch(loginUser({ email, password }))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form
            onSubmit={e => e.preventDefault()}
            className='w-80 lg:w-1/3 flex flex-col mx-auto mt-10 p-10 border rounded-lg border-gray'
        >
            <h2 className='font-black text-xl lg:text-2xl text-center'>Login to your Account</h2>
            <p className='font-light text-xs lg:text-sm my-5 tracking-[0.90px]'>Get more opportunities and privileges by joining the most useful community for residents from both banks of the Nistru River</p>
            <label className='font-medium text-base lg:text-lg flex flex-col mb-[15px]'>
                Input your email:
                <input 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='Email'
                    className='p-3 text-xs lg:text-sm text-black outline-none rounded-md bg-[#444]'
                />
            </label>
            <label className='font-medium text-base lg:text-lg flex flex-col'>
                Type your password: 
                <input 
                    type="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='Password'
                    className='p-3 text-xs lg:text-sm text-black outline-none rounded-md bg-[#444]'
                />
            </label>
            <div className='mt-[27px]'>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className='bg-orange w-full font-black text-xs lg:text-sm py-3 uppercase rounded-md hover:bg-orangeHover transition-all duration-300'
                >
                    Login
                </button>
                <div className='text-xs lg:text flex gap-x-1 lg:gap-x-2 mt-3'>
                    <p>Still don't have any account?</p>
                    <Link to={'/register'} className='text-blue font-medium'>Register now</Link>
                </div>
            </div>
        </form>
    )
}
