import React, {useEffect, useState, useRef, useReducer} from 'react'
import Questionnaire from '../components/Questionnaire'
import clockImg from '../assets/images/alarm.png'
import { faChartPie } from '@fortawesome/free-solid-svg-icons'


const Home = (props) => {

    
    const [questionsGroups, setQuestionsGroups] = useState([])
    const [currentQuestionGroupIndex, setCurrentQuestionGroupIndex] = useState(0)
    const [showTheAnswers, setShowTheAnswers] = useState(false)
    const [score, setScore] = useState(0)
    const [finalMessage, setFinalMessage] = useState(null)
    const [counter, setCounter] = useState(10)
    const intervalRef = useRef();


    const [startTheGame, setStartTheGame] = useState(false)

 
    const refButtonStart = useRef(null)
    const alarmClockRef = useRef(null)

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

            setQuestionsGroups(questions)
            
        })
        .catch(err => {

            return err
        })
       
    }, [])
    
    // useEffect Hook to stop the setInterval (I stored the id in a ref, like this I can access here to it) and go to the next question
    useEffect(() => {
        if(counter < 4) {

            alarmClockRef.current.className = "alarm-picture animation-size-alarm "
        }

        if(counter < 1) {

            alarmClockRef.current.className = "alarm-picture"
            // I clear the interval
            clearInterval(intervalRef.current)
            if(currentQuestionGroupIndex >= questionsGroups.length - 1) {
               
                showFinalMessage()
                setStartTheGame(false)
                refButtonStart.current.style.display = "block"

                
                
            } else {
                setCurrentQuestionGroupIndex(prev => prev + 1)
                setCounter(10)
                decrementTheCounter()
            }
            
            
        }
    }, [counter])

    //To start the game
    const handleStartTheGame = () => {
        // we remove the start button from the dom
        refButtonStart.current.style.display = "none";
        if(currentQuestionGroupIndex !== 0) {
            setFinalMessage(false)
            setCurrentQuestionGroupIndex(0)
            setShowTheAnswers(false)
            setCounter(10)
            setScore(0)
        }
        // display the first question
        setStartTheGame(true);
        decrementTheCounter()
        // If it's not the first game (= a restart game)
        

    }

    const showFinalMessage = () => {
        setShowTheAnswers(true)
        setFinalMessage('You have got a score of ' + score + " points")
    }
    // To decrease the counter
    const decrementTheCounter = () => {
        

        let counterId = setInterval(function() {
          

                setCounter(prevCounter => prevCounter - 1)

        }, 1000)

        intervalRef.current = counterId
        
    }

    const handleAnswer = (answer) => {

        if(!showTheAnswers) {

        
            
            if(currentQuestionGroupIndex < questionsGroups.length - 1) {
                // display the correct and wrong answers
                setShowTheAnswers(true)
                
                // We increment or not the score according to the answer of the user
                if(answer.answer === questionsGroups[currentQuestionGroupIndex].correct_answer) {
               
                    setScore(prevScore => prevScore + 1)
                }
                //We change index (so we go to the next question)
                 clearInterval(intervalRef.current)
                 alarmClockRef.current.className = "alarm-picture"
                window.setTimeout(() => {
                 
                    // I don't display the answers colors anymore
                    setShowTheAnswers(false)
                    // I move to the next question
                    setCurrentQuestionGroupIndex(prevState => prevState + 1)
                    // I reset the counter to 10
                    setCounter(10)
                    decrementTheCounter()

                    
                    
                }, 2000)
            
                
            } else {
                //There are no question anymore
                clearInterval(intervalRef.current)
                setStartTheGame(false)
                
                showFinalMessage()
                refButtonStart.current.style.display = "block";

            }
        }
        
    }

    return (
        <>
            <div className="infos-and-title">
                <h1>Test your knowledge !</h1>
                <div className="infos">
                    <p className="infos-score">Current Score : {score} points</p>
                    <div className="alarm">
                        <img className={"alarm-picture"} ref={alarmClockRef} src={clockImg} alt="clock"/>
                        <span className="counter">00 : {counter}</span>
                    </div>
                    <p className="infos-question-number">Question {currentQuestionGroupIndex + 1} on {questionsGroups.length}</p>
                </div>
            </div>
            <div>
                <button className="start-button" ref={refButtonStart} onClick={() => handleStartTheGame()}>start</button>
            </div>

            {startTheGame && <> 
                {questionsGroups.length > 0 ? 
                <div className="questionnaire"> 
                    <Questionnaire handleAnswer={handleAnswer} questionsGroups={questionsGroups} data={questionsGroups[currentQuestionGroupIndex]} showTheAnswers={showTheAnswers} />                    
                </div>
                : <p className="loading-alert">Loading...</p>
            
                }
                
            </>}
            {finalMessage !== null && <div>          
                <p className="final-message">{finalMessage}</p>
               

            </div>}
            

        </>
    )
}

export default Home

