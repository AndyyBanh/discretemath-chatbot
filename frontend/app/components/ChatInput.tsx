'use client';
import React, { use, useState } from 'react'

// define prop
type ChatInputProp = {
  onSend: (message: string) => void;
};

const ChatInput = ( {onSend}: ChatInputProp ) => {
  // State variables
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if input is empty
    if (!input.trim()) return;

    // Send Input
    onSend(input);
    // Clear Input
    setInput("");
  }
  
  return (
    <div className='flex'>
        <form
          onSubmit={handleSubmit}
          className='flex items-center gap-2 w-full justify-center'
        >
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter Discrete Math Question'
            className='input input-xl w-full'
          />
          <button
            type='submit'
            className='btn btn-lg'
          >
            Send
          </button>
        </form>
    </div>
  )
}

export default ChatInput