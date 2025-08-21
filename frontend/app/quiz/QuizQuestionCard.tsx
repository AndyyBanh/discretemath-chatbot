import React from 'react'

// Define QuizQuestion object
type QuizQuestion = {
    question: string;
    options: string[];
    answer: string;
}

// Define props for this card
type Props = {
    index: number;
    question: QuizQuestion;
    selected?: string;
    submitted: boolean;
    onSelect: (index: number, option: string) => void;
}

const QuizQuestionCard = ({ 
    index,
    question,
    selected,
    submitted,
    onSelect,
 }: Props) => {

    
  return (
    <div>QuizQuestionCard</div>
  )
}

export default QuizQuestionCard