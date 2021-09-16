import React, {useEffect, useState} from 'react'
import AnswerButton from './AnswerButton'

const Questionnaire = ({
    handleAnswer,
    data : {difficulty, question, correct_answer, incorrect_answers},
    showTheAnswers}) => {
        
        const shuffledAnswer = [correct_answer, ...incorrect_answers ].sort(() => 0.5 - Math.random())
        
        const createMarkUp = () => {
            return {__html: question}
        }

        const createMarkUpAnswer = (answer) => {
            return {__html: answer}
        }

    

    return (
        <>
            <div className="question">
                <h2 dangerouslySetInnerHTML = {createMarkUp()}></h2>
            </div>
            <div className="answers-list">
                {shuffledAnswer.map((answer, index) => {
                    console.log('tuut')
                    const backgroundColor = showTheAnswers 
                        ? answer === correct_answer
                            ? 'bg-green'
                            : 'bg-red'
                        : ''
                    return <button key={index} className={`${backgroundColor} answer`} dangerouslySetInnerHTML = {createMarkUpAnswer(answer)} onClick={()=> {handleAnswer({answer})}}></button>
                })}
                {/* <AnswerButton handleOnClick={() => handleAnswer(shuffledAnswer[0])} answer={shuffledAnswer[0]} correctAnswer={correct_answer}/>
                <AnswerButton handleOnClick={() => handleAnswer(shuffledAnswer[1])} answer={shuffledAnswer[1]} correctAnswer={correct_answer}/>
                <AnswerButton handleOnClick={() => handleAnswer(shuffledAnswer[2])} answer={shuffledAnswer[2]} correctAnswer={correct_answer}/>
                <AnswerButton handleOnClick={() => handleAnswer(shuffledAnswer[3])} answer={shuffledAnswer[3]} correctAnswer={correct_answer}/> */}
            </div>
        </>
    )
}   

export default Questionnaire

