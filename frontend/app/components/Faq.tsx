import React from 'react'

const Faq = () => {
  return (
    <div className='grid grid-cols-3 gap-5'>
        <div>
            <h3 className='text-3xl font-bold'>Frequently Asked Questions</h3>
        </div>

        <div className='col-span-2'>
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" defaultChecked />
                <div className="collapse-title font-semibold">Who can use this app?</div>
                <div className="collapse-content text-sm">Students, educators, or anyone interested in learning about Discrete Math.</div>
            </div>
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">How does quiz module work?</div>
                <div className="collapse-content text-sm">Quiz module dynamically generates a muitple-choice quiz based on Discrete Math Topics.</div>
            </div>
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold">What are the topics for the quizzes?</div>
                <div className="collapse-content text-sm">The quizes are selected at random and based on the following content. Propositional Logic, Sets, Big-O, Induction, Recurrence Relations, Relations, Graphs, and Trees.</div>
            </div>
        </div>
    </div>
  )
}

export default Faq