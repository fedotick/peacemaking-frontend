import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../redux/features/post/postSlice'
import { PostItem } from '../components/PostItem'

export const MainPage = () => {
    const { posts } = useSelector(state => state.post)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    if (!posts.length) {
        return (
            <div className='text-xl text-center py-10'>
                Posts haven't been created yet
            </div>
        )
    }

    return (
        <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
            {posts?.map((post, index) => (
                        <PostItem post={post} key={index} />
            ))}
        </div>
    )
}
