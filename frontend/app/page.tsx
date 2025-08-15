import ChatInput from "./components/ChatInput";
import ChatWindow from "./components/ChatWindow";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h2 className="text-3xl font-bold">Your Personal Discrete Math AI Assistant</h2>
      <p className="text-xl py-5">Get Professional Explanations on Any Discrete Math Topic</p>
      <div className="w-full flex flex-col h-screen max-w-5xl mx-auto">
        <ChatWindow />
      </div>
      

      <div className="flex w-full flex-col">
        {/* info card on how to get solutions */}
        <div className="card bg-base-300 rounded-box grid h-20 place-items-center">How to Use</div>
        <div className="divider"></div>
        {/* info card on why it is good */}
        <div className="card bg-base-300 rounded-box grid h-20 place-items-center">Learning Made Easy</div>
      </div>
    </main>
  );
}
