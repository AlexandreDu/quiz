import React, {useEffect, useState} from 'react'


const AnswerButton = ({answer, handleOnClick}) => {

    const createMarkUp = () => {
        return {__html: answer}
    }


    return (
        <button className="answer" dangerouslySetInnerHTML = {createMarkUp()} onClick={()=> {handleOnClick({answer})}}></button>
    )
}

export default AnswerButton

