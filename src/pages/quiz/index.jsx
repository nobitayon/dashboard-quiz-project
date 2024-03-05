import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { TablePertanyaan } from '../../components/molecules';
import { backendURL } from '../../constEnv';
import { useAuth } from '../../hooks/useAuth';

const index = () => {
  let { quizId } = useParams();

  const [judul, setJudul] = useState("")
  const [deskripsi, setDeskripsi] = useState("")
  const [waktuMulai, setWaktuMulai] = useState("")
  const [waktuSelesai, setWaktuSelesai] = useState("")
  const [isDisabled, setIsDisabled] = useState(true)

  const [pertanyaans, setPertanyaans] = useState([])
  const { infoLogin: { token: authToken } } = useAuth()

  const getQuiz = async () => {
    // const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsInJvbGUiOiJhZG1pbiJ9.m82u9ZQfMHLEeB_kbSynmssNkulfr4ATylYybfHjZ8U"
    
    const response = await fetch(`${backendURL}/quiz/${quizId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })


    if (response.status !== 200) {
      return
    }

    const data = await response.json()


    setJudul(data.judul)
    setDeskripsi(data.deskripsi)
    setWaktuMulai(data.waktuMulai)
    setWaktuSelesai(data.waktuSelesai)

  }

  const navigate = useNavigate()

  const getPertanyaan = async () => {
    // const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsInJvbGUiOiJhZG1pbiJ9.m82u9ZQfMHLEeB_kbSynmssNkulfr4ATylYybfHjZ8U"
    const { infoLogin: { token: authToken } } = useAuth()
    const response = await fetch(`${backendURL}/quiz/${quizId}/pertanyaan`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })


    if (response.status !== 200) {
      return
    }

    const data = await response.json()


    setPertanyaans(data)
  }

  useEffect(() => {
    getQuiz()
    // console.log('use effect', new Date().toLocaleTimeString())
    // const intervalId = setInterval(getQuiz, 5000)
    // return () => clearInterval(intervalId);
  }, [])

  useEffect(() => {
    getPertanyaan()
    // console.log('use effect', new Date().toLocaleTimeString())
    // const intervalId = setInterval(getQuiz, 5000)
    // return () => clearInterval(intervalId);
  }, [])


  const [editMode, setEditMode] = useState(false)
  const [pastEditState, setPastEditState] = useState({})

  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsInJvbGUiOiJhZG1pbiJ9.m82u9ZQfMHLEeB_kbSynmssNkulfr4ATylYybfHjZ8U"
  // const { infoLogin: { token } } = useAuth()
  const handleEditMode = (e) => {
    e.preventDefault()
    setIsDisabled(false)
    setEditMode(true)

    setPastEditState({
      judul: judul,
      deskripsi: deskripsi,
      waktuMulai: waktuMulai,
      waktuSelesai: waktuSelesai
    })

  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault()


    const response = await fetch(`${backendURL}/quiz/${quizId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}` // Include the token in the Authorization header
      },
      body: JSON.stringify({ judul, deskripsi, waktuMulai, waktuSelesai })
    })

    setIsDisabled(true)
    setEditMode(false)

    const jsonResponse = await response.json()



    setJudul(jsonResponse.judul)
    setDeskripsi(jsonResponse.deskripsi)
    setWaktuMulai(jsonResponse.waktuMulai)
    setWaktuSelesai(jsonResponse.waktuSelesai)

    setPastEditState({
      judul: judul,
      deskripsi: deskripsi,
      waktuMulai: waktuMulai,
      waktuSelesai: waktuMulai
    })
  }


  const handleBatalEdit = (e) => {
    e.preventDefault()
    setIsDisabled(true)
    setEditMode(false)

    setJudul(pastEditState.judul)
    setDeskripsi(pastEditState.deskripsi)
    setWaktuMulai(pastEditState.waktuMulai)
    setWaktuSelesai(pastEditState.waktuSelesai)
  }


  return (
    <div className='p-4 h-full w-full flex flex-col justify-center'>
      <div className='w-full flex justify-center'>
        <form className='w-full'> 
          <div className='flex flex-col w-full gap-4 justify-center items-center'>

            <label className='form-control w-full max-w-xs '>
              <div className='label'>
                <span className='label-text'>Judul</span>
              </div>
              <input className='input input-bordered w-full max-w-x' type='text' value={judul ? judul : ""} onChange={(e) => setJudul(e.target.value)} disabled={isDisabled} />
            </label>

            <label className='form-control w-full max-w-xs '>
              <div className='label'>
                <span className='label-text'>Deskripsi</span>
              </div>
              <input className='input input-bordered w-full max-w-x' type='text' value={deskripsi ? deskripsi : ""} onChange={(e) => setDeskripsi(e.target.value)} disabled={isDisabled} />
            </label>


            <label className='form-control w-full max-w-xs '>
              <div className='label'>
                <span className='label-text'>Waktu Mulai</span>
              </div>
              <input className='input input-bordered w-full max-w-x' type='text' value={waktuMulai ? waktuMulai : ""} onChange={(e) => setWaktuMulai(e.target.value)} disabled={isDisabled} />
            </label>

            <label className='form-control w-full max-w-xs '>
              <div className='label'>
                <span className='label-text'>Waktu Selesai</span>
              </div>
              <input className='input input-bordered w-full max-w-x' type='text' value={waktuSelesai ? waktuSelesai : ""} onChange={(e) => setWaktuSelesai(e.target.value)} disabled={isDisabled} />
            </label>

          </div>


          {editMode ? (
            <div className='flex gap-4 justify-center'>
              <button className={classNames(buttonStyle, 'bg-slate-200')} onClick={(e) => handleSubmitEdit(e)}>simpan edit</button>
              <button className={classNames(buttonStyle, 'bg-slate-200')} onClick={(e) => handleBatalEdit(e)}>batal edit</button>
            </div>
          ) :
            (<div className='flex w-full justify-center items-center'>
              <button className={classNames(buttonStyle, 'bg-slate-200')} onClick={handleEditMode}>masuk ke edit mode</button>
            </div>)}
        </form>
        
        <div className='flex flex-col w-full justify-center items-center'>
          <TablePertanyaan data={pertanyaans} quizId={quizId} />
          <button type='submit' className='mt-10 w-1/3 btn btn-primary' onClick={()=>navigate(`/dashboard/quiz/${quizId}/newPertanyaan`)}>
            membuat pertanyaan baru 
          </button>
        </div>
      </div>
    </div>
  )
}

const buttonStyle = 'p-4 mt-4'

export default index