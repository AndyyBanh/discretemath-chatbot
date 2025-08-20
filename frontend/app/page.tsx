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
      
      
      <div className="card bg-base-200 card-border w-full">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl font-bold">Test Your Knowledge!</h2>
          <p>Attempt Quizes based on content.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-lg w-3xs">Test</button>
          </div>
        </div>
      </div>



      <div className="mt-20 place-items-center">
        <h2 className="font-bold text-3xl">Discrete Math AI Assistant</h2>
        {/* Horizontal divder */}
        <div className="flex w-full mt-5">
          <div className="grid place-items-center">
            <p className="text-lg">Discrete Math Assistant is an educational tool used to help students learn the concepts of Discrete Mathematics, and reinforce that knowledge through practice and repetition in the Quiz Me Module.</p>
          </div>
          <div className="card bg-base-200 card-border grid place-items-center p-5">
            <h3 className="text-2xl font-semibold">How It Works</h3>
            <p className="font-medium mt-1.5">Using a RAG model based on 1000+ pages of Discrete Math Content. Experience quick and consistent explanations of various topics using OpenAI model.</p>
          </div>
        </div>
      </div>

    </main>
  );
}
