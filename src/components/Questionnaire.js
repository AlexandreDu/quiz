import React, {useEffect, useState} from 'react'
import AnswerButton from './AnswerButton'

const Questionnaire = ({

    handleAnswer,
    data : {difficulty, question, correct_answer, answers},
    showTheAnswers}) => {
        
        
        const createMarkUp = () => {
            return {__html: question}
        }

        const createMarkUpAnswer = (answer) => {
        //    console.log(answer)
            return {__html: answer}
        }

    

    return (
        <>
            <div className="question">
                <h2 dangerouslySetInnerHTML = {createMarkUp()}></h2>
            </div>
            <div className="answers-list">
                {answers.map((answer, index) => {
                    // console.log("answer dans la map : ", answer)
                    const backgroundColor = showTheAnswers 
                        ? answer === correct_answer
                            ? 'bg-green'
                            : 'bg-red'
                        : ''
                    return <button key={index} className={`${backgroundColor} answer`} dangerouslySetInnerHTML = {createMarkUpAnswer(answer)} onClick={()=> {handleAnswer({answer})}}></button>
                })}
            </div>
        </>
    )
}   

export default Questionnaire

