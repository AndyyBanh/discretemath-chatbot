import React from 'react'
import { QuizQuestion } from './types'

// Define props for this card
type Props = {
    index: number;
    question: QuizQuestion;
    selected?: number;
    submitted: boolean;
    onSelect: (questionIndex: number, optionIndex: number) => void;
}

const QuizQuestionCard = ({ 
    index,
    question,
    selected,
    submitted,
    onSelect,
 }: Props) => {

    
  return (
    <div className='card mb-6'>
      {/* display question */}
      <p className='text-lg'>
        {index + 1}. {question.question}
      </p>
      {/* display options */}
      <div className='space-y-3.5 mt-2'>
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = submitted && question.answerIndex === i;
          const isWrong = submitted && isSelected && question.answerIndex !== i


          return (
            <button
              key={i}
              onClick={() => onSelect(index, i)}
              className={`
                block w-full text-left px-3 py-2 rounded-lg border transition-colors
                ${isSelected ? "bg-blue-200  border-blue-300" : "bg-white border-gray-300"}
                ${isCorrect ? "bg-green-500 border-green-500" : ""}
                ${isWrong ? "bg-red-500 border-red-500" : ""}
                text-black
                `}
                disabled={submitted}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default QuizQuestionCard