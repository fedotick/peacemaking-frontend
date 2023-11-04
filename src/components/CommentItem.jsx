import React from 'react'

export const CommentItem = ({ cmt, user }) => {
    const avatar = cmt.comment.trim().toUpperCase().split('').slice(0,2)
    return (
        <div className='flex items-center gap-3 border-b border-orange pb-2'>
            <div className='flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-300 text-lg bg-orange'>
                { avatar }
            </div>
            <div className='flex text-sm line-clamp-4'>
                {cmt.comment}
            </div>
        </div>
    )
}
