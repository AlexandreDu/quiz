import React, {useEffect, useState} from 'react'
import Questionnaire from '../components/Questionnaire'

const Home = (props) => {

    const [questionsGroups, setQuestionsGroups] = useState([])
    const [currentQuestionGroupIndex, setCurrentQuestionGroupIndex] = useState(0)
    const [showTheAnswers, setShowTheAnswers] = useState(false)
    const [score, setScore] = useState(0)
    const [finalMessage, setFinalMessage] = useState(null)
    // https://opentdb.com/api.php?amount=10&category=15&type=multiple
    
    const API_URL = "https://opentdb.com/api.php?amount=10&category=9&type=multiple"
    useEffect(()=> {
        fetch(API_URL)
        .then(response => {
            return response.json()
        })
        .then(data => {

            const questions = data.results.map((question) => {
                return {
                    ...question,
                    answers: [
                        question.correct_answer,
                        ...question.incorrect_answers
                    ].sort(() => 0.5 - Math.random())
                }
            })
            console.log("questions vaut : ", questions)
            setQuestionsGroups(questions)
            
        })
        .catch(err => {
            console.log(err)
            return err
        })
       
    }, [])


    const handleAnswer = (answer) => {

        if(!showTheAnswers) {

            console.log(answer)
            //We increment the index of the question to get the next question 
            if(currentQuestionGroupIndex < questionsGroups.length - 1) {
                // display the correct and wrong answers
                setShowTheAnswers(true)
                
                // We increment or not the score according to the answer of the user
                if(answer.answer === questionsGroups[currentQuestionGroupIndex].correct_answer) {
                    console.log("right")
                    setScore(prevScore => prevScore + 1)
                }
                //We change index (so we go to the next question)
                
                window.setTimeout(() => {
                    console.log("1st time out")
                    setShowTheAnswers(false)
                    setCurrentQuestionGroupIndex(prevState => prevState + 1)
                    
                }, 1000)
            
                
            } else {
                //There are no question anymore
                setShowTheAnswers(true)
                setFinalMessage('You have got a score of ' + score + " points")

            }
        }
        
    }

    return (
        <>
            <div className="infos-and-title">
                <h1>Test your knowledge !</h1>
                <div className="infos">
                    <p>Current Score : {score} points</p>
                    <p>Question {currentQuestionGroupIndex + 1} on {questionsGroups.length}</p>
                </div>
            </div>
            
                {questionsGroups.length > 0 ? 
                <div className="questionnaire"> 
                    <Questionnaire handleAnswer={handleAnswer} questionsGroups={questionsGroups} data={questionsGroups[currentQuestionGroupIndex]} showTheAnswers={showTheAnswers} />                    
                </div>
                : <p className="loading-alert">Loading...</p>
            
                }
                <p className="final-message">{finalMessage}</p>
            

        </>
    )
}

export default Home

