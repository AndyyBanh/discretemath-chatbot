import React from 'react'
import ChatInput from './ChatInput'

const ChatWindow = () => {
  return (
    <div className='flex flex-col gap-2 p-4 overflow-y-auto h-[80vh] w-full bg-base-200 border rounded-2xl border-gray-300'>
        {/* Messages Area */}
        <div className='flex-1 overflow-y-auto'>
            {/* example messages */}
            {/* ai prompt */}
            <div className='chat chat-start'>
                <div className='chat-bubble'>Hello There</div>
            </div>
            {/* user input */}
            <div className="chat chat-end">
                <div className="chat-bubble">General Kenobi!</div>
            </div>
        </div>

        {/* Chat Input */}
        <ChatInput />
    </div>
  )
}

export default ChatWindow