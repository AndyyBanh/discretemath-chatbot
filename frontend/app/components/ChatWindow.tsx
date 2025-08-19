'use client';
import React, { useState } from 'react'
import ChatInput from './ChatInput'
import TypeIndicator from './TypeIndicator';
import ChatHeader from './ChatHeader';

// define message object
interface Message {
  role: "user" | "assistant",
  content: string,
}

const ChatWindow = () => {
  // State variables
  const [message, setMessage] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to add messages to chat history
  const handleSend = async (userMessage: string) => {
    // Create new array by copying previous messsages and appending new message
    setMessage((prev) =>  [...prev, { role: "user", content: userMessage }])
    setLoading(true);

    // api call
    try {
      const res = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage }),
      });

      // Parse JSON response from server
      const data = await res.json();

      // Update chat state with the AI assistant's response
      setMessage((prev) => [
        ...prev,
        { role: "assistant", content: data.response || "Sorry, I couldn't respond." }
      ]);
    } catch (err) {
      console.error("Error fetching AI response", err);
      setMessage((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Unable to fetch response." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col gap-2 p-4 overflow-y-auto h-[80vh] w-full bg-base-200 border rounded-2xl border-gray-300'>
      {/* Chat Header */}
      <ChatHeader onClear={ () => setMessage([]) }/>

        {/* Messages Area */}
        <div className='flex-1 overflow-y-auto'>
            {message.map((msg, idx) => (
              <div
                key={idx}
                className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}
              >
                <div className='chat-bubble'>{msg.content}</div>
              </div>
            ))}

            {/* Typing indicator */}
          {loading && <TypeIndicator />}
        </div>

        {/* Chat Input */}
        <ChatInput onSend={handleSend} />
    </div>
  )
}

export default ChatWindow