import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { PostItem } from '../components/PostItem'

export const AccountPage = () => {
    const [posts, setPosts] = useState([])

    const fetchMyPosts = async () => {
        try {
            const { data } = await axios.get('/posts/user/me')
            setPosts(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMyPosts()
    }, [])

    return (
        <div className='w-96 lg:w-1/2 mx-auto py-5 lg:py-10 flex flex-col gap-5 lg:gap-10'>
            {posts?.map((post, index) => 
                <PostItem post={post} key={index} />)
            }
        </div>
    )
}
