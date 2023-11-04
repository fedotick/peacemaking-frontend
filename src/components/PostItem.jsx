import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import Moment from 'react-moment'

export const PostItem = ({ post }) => {
    if (!post) {
        return (
            <div className='text-xl text-center py-10'>
                Loading...
            </div>
        )
    }

    return (
        <Link to={`/${post._id}`} className='hover:bg-[#171717] transition-all duration-300'>
            <div className='flex flex-col mx-auto border rounded-md border-gray overflow-hidden'>
                <div
                    className={post.imageURL ? 'flex rounded-sm h-80' : 'flex rounded-sm'}
                >
                    {post.imageURL && (
                        <img src={`http://localhost:7777/${post.imageURL}`} alt="IMG" className='object-cover w-full' />
                    )}
                </div>
                <div className='flex flex-col gap-y-[15px] px-[30px] py-[25px]'>
                    <div>
                        <div className='text-lg font-normal'>
                            {post.username}
                        </div>
                        <div className='text-xs text-zinc-400'>
                            <Moment date={post.createdAt} format='D MMM YYYY' />
                        </div>
                    </div>
                    <div className='font-black text-3xl'>{post.title}</div>
                    <p className='text-sm text-gray line-clamp-4'>{post.text}</p>
                    <div className='flex gap-3 items-center justify-end mt-2'>
                        <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                            <AiFillEye /> <span>{post.views}</span>
                        </button>
                        <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                            <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}
