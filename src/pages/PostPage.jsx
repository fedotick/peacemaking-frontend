import React, { useCallback, useEffect, useState } from 'react'
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'
import axios from '../utils/axios'
import { deletePost } from '../redux/features/post/postSlice'
import { createComment, getPostComments } from '../redux/features/comment/commentSlice'
import { CommentItem } from '../components/CommentItem'

export const PostPage = () => {
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState('')
    const { user } = useSelector(state => state.auth)
    const { comments } = useSelector(state => state.comment)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const deletePostHandler = () => {
        try {
            dispatch(deletePost(params.id))
            navigate('/posts')
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = () => {
        try {
            const postId = params.id
            dispatch(createComment({ postId, comment }))
            setComment('')
        } catch (error) {
            console.log(error)
        }
    }

    const fetchComments = useCallback(async () => {
        try {
            dispatch(getPostComments(params.id))
        } catch (error) {
            console.log(error)
        }
    }, [params.id, dispatch])

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setPost(data)
    }, [params.id])

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])

    if (!post) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Loading...
            </div>
        )
    }

    return (
        <div className='px-6'>
            <div className='flex gap-10 py-8'>
                <div className='w-2/3 flex flex-col gap-y-[15px]'>
                    <div className='border rounded-md border-gray overflow-hidden'>
                        <div 
                            className={
                                post?.imageURL ? 'flex rounded-sm h-80' : 'flex rounded-sm'
                            }
                        >
                            {post?.imageURL && (
                                <img 
                                    src={`http://localhost:7777/${post.imageURL}`} 
                                    alt="IMG" 
                                    className='object-cover w-full' />
                            )}
                        </div>
                    <div className='p-10'>
                        <div className='flex justify-between items-center'>
                            <div className='text-lg font-normal'>
                                {post.username}
                            </div>
                            <div className='text-xs text-zinc-400'>
                                <Moment date={post.createdAt} format='D MMM YYYY' />
                            </div>
                        </div>
                        <div className='font-black text-3xl'>{post.title}</div>
                        <p className='text-sm text-gray line-clamp-4'>{post.text}</p>
                    <div className='flex gap-3 items-center mt-2 justify-between'>
                        <div className='flex gap-3 mt-4'>
                            <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                                <AiFillEye /> <span>{post.views}</span>
                            </button>
                            <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                                <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
                            </button>
                        </div>
                        
                        {
                            user?._id === post.author  && (
                                <div className='flex gap-3 mt-4'>
                                    <button className='flex items-center justify-center gap-2 text-white opacity-50'>
                                        <Link to={`/${params.id}/edit`}>
                                            <AiTwotoneEdit />
                                        </Link>
                                    </button>
                                    <button
                                        onClick={deletePostHandler} 
                                        className='flex items-center justify-center gap-2 text-white opacity-50'
                                    >
                                        <AiFillDelete />
                                    </button>
                                </div>
                            )
                        }
                    </div>
                    </div>
                </div>
                    </div>
                <div className='w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm'>
                    <form 
                        className='flex gap-2'
                        onSubmit={e => e.preventDefault()}
                    >
                        <input 
                            type="text" 
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            placeholder='Comment'
                            className='text-black w-full rounded-md bg-gray-400 border p-2 text-sm outline-none placeholder:text-gray-700'
                        />
                        <button
                            type='submit'
                            onClick={handleSubmit}
                            className='flex justify-center items-center bg-orange text-sm font-semibold rounded-md py-2 px-4 hover:bg-orangeHover transition-all duration-300'
                        >
                            Send
                        </button>
                    </form>
                    <div className='flex flex-col mt-3 gap-y-3'>
                        {
                            comments?.map((cmt) => {
                                return <CommentItem cmt={cmt} key={cmt._id} />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
