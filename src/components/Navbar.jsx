import React from 'react'
import { NavLink } from 'react-router-dom'
import logoImg from '../img/icons/peacemaking-logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, logout } from '../redux/features/auth/authSlice'

export const Navbar = () => {
    const isAuth = useSelector(checkIsAuth)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
    }

    return (
        <nav className='flex justify-between items-center px-[35px] border-b border-[#1e1e1e] bg-black'>
            <NavLink to={'/'}>
                <img src={logoImg} alt="Logo" className='w-[100px]' />
            </NavLink>
            <div className='flex items-center gap-x-4'>
                {isAuth ? (
                    <>
                        <NavLink to={'/'} className='flex gap-x-3 py-2 px-5 bg-orange font-black text-xs rounded-[5px] hover:bg-orangeHover transition-all duration-300'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        <div className='hidden md:flex'>Main Page</div>
                        </NavLink>

                        <NavLink to={'new'} className='flex gap-x-3 py-2 px-5 bg-orange font-black text-xs rounded-[5px] hover:bg-orangeHover transition-all duration-300'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className='hidden md:flex'>Add Post</div>
                        </NavLink>

                        <button 
                            onClick={logoutHandler}
                            className='flex gap-x-3 bg-gray text-blue py-2 px-5 font-black text-xs rounded-[5px] hover:bg-[#C1C1C1] transition-all duration-300'
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        <div className='hidden md:flex'>Logout</div>
                        </button>

                        <NavLink to='me' 
                        className='
                        flex 
                        items-center 
                        transition-all 
                        duration-300
                        bg-orange 
                        gap-x-3 
                        py-2 
                        px-5 
                        font-black 
                        text-xs 
                        rounded-[5px] 
                        hover:bg-orangeHover'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div className='hidden md:flex'>{user && user.username}</div>
                        </NavLink>      
                    </>
                ) : (
                    <>
                        <NavLink to={'register'} className='flex items-center gap-x-3 py-2 px-5 bg-orange font-black text-xs rounded-[5px] hover:bg-orangeHover transition-all duration-300'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                            </svg>
                            <div className='hidden md:flex'>Register</div>
                        </NavLink>

                        <NavLink to={'login'} className='flex gap-x-3 bg-gray text-blue py-2 px-5 font-black text-xs rounded-[5px] hover:bg-[#C1C1C1] transition-all duration-300'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                            </svg>
                            <div className='hidden md:flex'>Login</div>
                        </NavLink>
                    </>
                )}
            </div>
        </nav>
    )
}
