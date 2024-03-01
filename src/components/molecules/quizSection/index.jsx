import React, { useEffect } from 'react'
import { TitleSection } from '../../atoms'
import { Table } from '..'
import { setQuiz, setErrorFetchQuiz } from '../../../service/quiz/quizSlice'
import { useDispatch, useSelector } from 'react-redux'



const index = (props) => {

    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsInJvbGUiOiJhZG1pbiJ9.m82u9ZQfMHLEeB_kbSynmssNkulfr4ATylYybfHjZ8U"
    
    const dispatch = useDispatch()
    const quizs = useSelector((state) => state.quiz.quizs)
    const errorFetchQuiz = useSelector((state) => state.quiz.errorFetchQuiz)

    const getQuiz = async () => {

        const response = await fetch('http://127.0.0.1:8000/api/v1/quiz', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })


        if (response.status !== 200) {
            dispatch(setErrorFetchQuiz(true))
            return
        }

        const data = await response.json()
        dispatch(setQuiz(data))

    }

    useEffect(() => {
        getQuiz()
        // console.log('use effect', new Date().toLocaleTimeString())
        // const intervalId = setInterval(getQuiz, 5000)
        // return () => clearInterval(intervalId);
    }, [])

    const { title, titleMore, lihatSemua, isActive } = props
    return (
        <div>
            <TitleSection title={title} titleMore={titleMore} lihatSemua={lihatSemua} />
            <div className=''>
                <Table isActive={isActive}  time={Date.now()} error={errorFetchQuiz} data={quizs} />
                {/* <Cards data={data}/> */}
            </div>
        </div>
    )
}

export default index