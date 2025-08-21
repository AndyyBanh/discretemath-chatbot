'use client';
import React, { useEffect, useState } from 'react'

// Define QuizQuestion object
type QuizQuestion = {
    question: string;
    options: string[];
    answer: string;
}

const Quiz = () => {
    // State Variables
    const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<{ [key: number]: string }>({});
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
    const handleSelect = ( questionIndex: number, option: string) => {
        setSelected(prev => ({ ...prev, [questionIndex]: option }));
    }

    // Handle Submit
    const handleSubmit = () => {
        setSubmitted(true);
    }

    const score = Object.entries(selected).filter(([i, opt]) => quiz[+i]?.answer == opt).length;

    // Render quiz 
    useEffect(() => {
        fetchQuiz();
    }, []);


  return (
    <div className='p-5'>
    
    </div>
  )
}

export default Quiz