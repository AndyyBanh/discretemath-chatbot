'use client';
import React from 'react'

// define prop type
type ChatHeaderProp = {
    onClear: () => void;
}
const ChatHeader = ({ onClear }: ChatHeaderProp) => {

  return (
    <div className='card card-border bg-base-100 w-full'>
        <div className='flex items-center justify-between w-full p-5'>
            <h2 className='text-2xl font-semibold card-title'>Discrete Math AI Tutor</h2>
            <button className='btn btn-lg' onClick={onClear}>Clear</button>
        </div>
    </div>
  )
}

export default ChatHeader