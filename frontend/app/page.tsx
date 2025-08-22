import Link from "next/link";
import ChatWindow from "./components/ChatWindow";
import Faq from "./components/Faq";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h2 className="text-3xl font-bold">Your Personal Discrete Math AI Assistant</h2>
      <p className="text-xl py-5">Get Professional Explanations on Any Discrete Math Topic</p>
      <div className="w-full flex flex-col max-w-5xl mx-auto mb-20">
        <ChatWindow />
      </div>
      
      
      <div className="card bg-base-200 card-border w-full">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl font-bold">Test Your Knowledge!</h2>
          <p>Be quizzed on any topic at random.</p>
            <Link href="/quiz" className="btn btn-lg  btn-primary w-3xs transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500">
              Test
            </Link>
        </div>
      </div>



      <div className="mt-20 place-items-center mx-auto px-6">
        <h2 className="font-bold text-4xl text-center mb-10">Discrete Math AI Assistant</h2>
        {/* Horizontal divder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-lg leading-relaxed">Discrete Math Assistant is an educational tool used to help students learn the concepts of Discrete Mathematics, and reinforce that knowledge through practice and repetition in the Quiz Me Module.</p>
          </div>
          <div className="card bg-base-200 card-border place-items-center p-6">
            <h3 className="text-2xl font-semibold mb-2">How It Works</h3>
            <p className="font-medium">Using a RAG model based on 1000+ pages of Discrete Math Content. Experience quick and consistent explanations of various topics using OpenAI model.</p>
          </div>
        </div>
      </div>

      <div className="mt-30">
        <Faq />
      </div>

    </main>
  );
}
