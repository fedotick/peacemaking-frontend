import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from "../redux/features/post/postSlice"
import addImageIcon from '../img/icons/add-image.svg'
import publishIcon from '../img/icons/publish.svg'

export const AddPostPage = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = () => {
        try {
            const data = new FormData()
            data.append('title', title)
            data.append('text', text)
            data.append('image', image)
            dispatch(createPost(data))
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const clearFormHandler = () => {
        setText('')
        setTitle('')
        setImage('')
    }

    return (
        <form 
            className="w-96 lg:w-1/3 flex flex-col mx-auto mt-10 border border-gray rounded-md"
            onSubmit={e => e.preventDefault()}    
        >
            <div className="flex object-cover p-6 mx-auto">
                {image && (
                    <img src={URL.createObjectURL(image)} alt={image.name} />
                )}
            </div>
            <div className="flex flex-col gap-y-5 py-3 px-10">
                <label className="text-base lg:text-lg">
                    <h4 className="font-semibold">Post Title</h4>
                    <input 
                        type="text" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="mt-2 text-white w-full rounded-lg bg-gray-400 border p-[10px] text-xs lg:text-sm outline-none placeholder:text-gray-700 bg-[#444]"
                        placeholder="Input your title"
                    />
                </label>
                <label className="text-base lg:text-lg">
                <h4 className="font-semibold">Post Text</h4>
                    <textarea 
                        value={text}
                        onChange={e => setText(e.target.value)}
                        className="mt-2 text-white w-full rounded-lg bg-gray-400 border p-[10px] text-xs lg:text-sm outline-none resize-none h-40 placeholder:text-gray-700 bg-[#444]"
                        placeholder="Input your text"
                    />
                </label>
                <div className="flex items-center justify-between mb-4">
                    
                    <label className="py-3 px-5 bg-blue font-semibold text-xs lg:text-sm justify-center rounded-md cursor-pointer hover:bg-[#416b9c] transition-all duration-300">
                        <div className="flex gap-x-1">
                            <img src={addImageIcon} alt="ADD IMG" />
                            <div className='hidden md:flex'>Add image</div>
                        </div>
                        <input 
                            type="file" 
                            className="hidden" 
                            onChange={e => setImage(e.target.files[0])} 
                        />
                    </label>
                    <div className="flex gap-x-5">

                        <button 
                            className="flex justify-center items-center font-semibold py-3 px-5 bg-gray text-xs lg:text-sm text-zinc-800 rounded-md hover:bg-[#808080] transition-all duration-300"
                            onClick={clearFormHandler}
                        >
                            <div className="flex gap-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                                <div className='hidden md:flex'>Reset</div>
                            </div>
                        </button>   

                        <button 
                            className="flex justify-center items-center font-semibold py-3 px-5 bg-orange text-xs lg:text-sm rounded-md hover:bg-orangeHover transition-all duration-300"
                            onClick={submitHandler}
                        >
                            <div className="flex gap-x-2">
                                <img src={publishIcon} alt="Publish" />
                                <div className='hidden md:flex'>Publish</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
