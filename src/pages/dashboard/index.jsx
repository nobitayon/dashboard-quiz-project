import React, { useEffect } from 'react'
import { QuizSection } from '../../components/molecules'
import { useDispatch, useSelector } from 'react-redux'
import { setErrorFetchQuiz, setQuiz } from '../../service/quiz/quizSlice'
import { useAuth } from '../../hooks/useAuth'
import { backendURL } from '../../constEnv'

const Dashboard = () => {
  const { infoLogin: { token: authToken } } = useAuth()


  const dispatch = useDispatch()
  const quizs = useSelector((state) => state.quiz.quizs)

  const errorFetchQuiz = useSelector((state) => state.quiz.errorFetchQuiz)

  const getQuiz = async () => {

    const response = await fetch(`${backendURL}/quiz`, {
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
  }, [])

  return (
    <div>
      <div>This is dashboard</div>
      {/* <Cards/> */}
      {!errorFetchQuiz ? (
        <div className='flex flex-col gap-10'>
          <QuizSection data={quizs} isActive={(a, b, t) => t > a && t < b} title={"Quiz aktif"} titleMore={"Lihat semua quiz aktif"} lihatSemua={() => { console.log('lihat semua function') }} />
          <QuizSection data={quizs} isActive={(a, b, t) => t > b && true} title={"Quiz selesai"} titleMore={"Lihat semua quiz selesai"} lihatSemua={() => { console.log('lihat semua function') }} />
        </div>
      ) : (
        <div className='w-full justify-center'>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Terjadi Kesalahan</h2>
            </div>
          </div>
        </div>)}

    </div>
  )
}

export default Dashboard