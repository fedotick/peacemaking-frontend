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
            className="w-1/3 flex flex-col mx-auto mt-10 border border-gray rounded-md"
            onSubmit={e => e.preventDefault()}    
        >
            <div className="flex object-cover p-6 mx-auto">
                {image && (
                    <img src={URL.createObjectURL(image)} alt={image.name} />
                )}
            </div>
            <div className="flex flex-col gap-y-5 py-3 px-10">
                <label className="text-lg">
                    <h4 className="font-semibold">Post Title</h4>
                    <input 
                        type="text" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="mt-2 text-black w-full rounded-lg bg-gray-400 border p-[10px] text-xs outline-none placeholder:text-gray-700"
                        placeholder="Input your title"
                    />
                </label>
                <label className="text-lg">
                <h4 className="font-semibold">Post Text</h4>
                    <textarea 
                        value={text}
                        onChange={e => setText(e.target.value)}
                        className="mt-2 text-black w-full rounded-lg bg-gray-400 border p-[10px] text-xs outline-none resize-none h-40 placeholder:text-gray-700"
                        placeholder="Input your text"
                    />
                </label>
                <div className="flex items-center justify-between mt-4">
                    <label className="py-3 px-5 bg-blue font-semibold text-sm justify-center rounded-md cursor-pointer hover:bg-[#416b9c] transition-all duration-300">
                        <div className="flex gap-x-1">
                            <img src={addImageIcon} alt="ADD IMG" />
                            Add image
                        </div>
                        <input 
                            type="file" 
                            className="hidden" 
                            onChange={e => setImage(e.target.files[0])} 
                        />
                    </label>
                    <div className="flex gap-x-5">
                        <button 
                            className="flex justify-center items-center font-semibold py-3 px-5 bg-gray text-sm text-zinc-800 rounded-md hover:bg-[#808080] transition-all duration-300"
                            onClick={clearFormHandler}
                        >
                            Reset
                        </button>   
                        <button 
                            className="flex justify-center items-center font-semibold py-3 px-5 bg-orange text-sm rounded-md hover:bg-orangeHover transition-all duration-300"
                            onClick={submitHandler}
                        >
                            <div className="flex gap-x-2">
                                <img src={publishIcon} alt="Publish" />
                                Publish
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
