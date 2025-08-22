'use client';
import React, { useEffect, useState } from 'react'
import QuizQuestionCard from './QuizQuestionCard';
import { QuizQuestion } from './types';
import BackButton from '../components/BackButton';

const Quiz = () => {
    // State Variables
    const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<{ [key: number]: number }>({});
    const [submitted, setSubmitted] = useState(false);

    // API Call
    const fetchQuiz = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://127.0.0.1:8000/api/quiz", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({}),
            })

            const data = await res.json();
            setQuiz(data.quiz || [])

        } catch (err) {
            console.error("Failed to fetch quiz", err);
        } finally {
            setLoading(false);
        }
    }

    // Handle Select
    const handleSelect = ( questionIndex: number, optionIndex: number ) => {
        setSelected(prev => ({ ...prev, [questionIndex]: optionIndex }));
    }

    // Handle Submit
    const handleSubmit = () => {
        setSubmitted(true);
    }

    const score = Object.entries(selected).filter(([i, opt]) => quiz[+i]?.answerIndex == opt).length;

    // Render quiz 
    useEffect(() => {
        fetchQuiz();
    }, []);


  return (
    <div className='p-6 max-w-3xl mx-auto'>
        <BackButton />
        <div className='mt-3.5'>
            <h2 className='font-black text-2xl '>Test Your Knowledge</h2>
            <p className='text-sm mt-1'>Answer questions below to check your understanding of Discrete Math.</p>

            {loading && <span className='loading loading-spinner loading-lg'></span>}

            {!loading && quiz.length > 0 && (
                <div className='mt-6'>
                    {quiz.map((question,i) => (
                        <QuizQuestionCard
                            key={i}
                            index={i}
                            question={question}
                            selected={selected[i]}
                            onSelect={handleSelect}
                            submitted={submitted}
                        />
                    ))}
                    {!submitted ? (
                        <button className='btn btn-lg btn-primary mt-5 w-full' onClick={handleSubmit}>
                            Submit
                        </button>
                    ) : (
                        <p className='text-2xl mt-3 font-bold'>Quiz Submitted Score: {score} / {quiz.length} </p>
                    )}
                </div>
            )}
        </div>
    </div>
  )
}

export default Quiz