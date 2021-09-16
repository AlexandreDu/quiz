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
            console.log("fetch data.results", data.results)
            setQuestionsGroups(data.results)
            
        })
        .catch(err => {
            return err
        })
       
    }, [])


    const handleAnswer = (answer) => {
        
        if(!showTheAnswers) {

        
            //We increment the index of the question to get the next question 
            if(currentQuestionGroupIndex < questionsGroups.length - 1) {
                // display the correct and wrong answers
                setShowTheAnswers(true)
                
                // We increment or not the score according to the answer of the user
                if(answer === questionsGroups[currentQuestionGroupIndex].correct_answer) {
                    setScore(prevScore => prevScore + 1)
                }
                //We change index (so we go to the next question)
                
                // window.setTimeout(() => {
                //     setShowTheAnswers(false)
                    
                // }, 1000)
                // window.setTimeout(() => {
                //     setCurrentQuestionGroupIndex(prevState => prevState + 1)
                    
                // }, 4000)
            
                
            } else {
                //There are no question anymore
                setFinalMessage('You have got a score of ' + score + " points")

            }
        }
        
    }

    return (
        <>
            <div>
                <h1>Test your knowledge !</h1>
                <p>Current Score : {score}</p>
                <p>Question {currentQuestionGroupIndex + 1} on {questionsGroups.length}</p>
            </div>
            
                {questionsGroups.length > 0 ? 
                <div className="questionnaire"> 
                    <Questionnaire handleAnswer={handleAnswer} data={questionsGroups[currentQuestionGroupIndex]} showTheAnswers={showTheAnswers} />                    
                </div>
                : <p>Loading...</p>
            
                }
            {finalMessage}

        </>
    )
}

export default Home

