import React, { useState } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { useAuth } from '../../hooks/useAuth'

function getCurrentDateTimeInISO8601(tambahMenit) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes() + tambahMenit).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}



const QuizCreatePage = () => {
    const [judul, setJudul] = useState("")
    const [deskripsi, setDeskripsi] = useState("")
    const [waktuMulai, setWaktuMulai] = useState(getCurrentDateTimeInISO8601(0))
    const [waktuSelesai, setWaktuSelesai] = useState(getCurrentDateTimeInISO8601(30))


    const { infoLogin: { token } } = useAuth()

    const handleSubmit = async (event) => {

        event.preventDefault()

        console.log(waktuMulai, waktuSelesai)

        const response = await fetch(`http://localhost:8000/api/v1/quiz`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
            body: JSON.stringify({ judul: judul, deskripsi: deskripsi, waktu_mulai: waktuMulai, waktu_selesai:waktuSelesai })
        })


        if (response.status === 200) {
            toast.success('sukses menambah quiz', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setJudul("")
            setDeskripsi("")
            setWaktuMulai(getCurrentDateTimeInISO8601())
            setWaktuSelesai(getCurrentDateTimeInISO8601())
        } else {
            toast.error('Gagal membuat quiz', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }

        // const jsonData = await response.json()

        // console.log(jsonData)
    }

    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />
            <form>
                <div className='flex flex-col w-full gap-4 justify-center items-center'>

                    <label className='form-control w-full max-w-xs '>
                        <div className='label'>
                            <span className='label-text'>Judul</span>
                        </div>
                        <input className='input input-bordered w-full max-w-x' type='text' value={judul} onChange={(e) => setJudul(e.target.value)} />
                    </label>

                    <label className='form-control w-full max-w-xs '>
                        <div className='label'>
                            <span className='label-text'>Deskripsi</span>
                        </div>
                        <input className='input input-bordered w-full max-w-x' type='text' value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
                    </label>

                    <label className='form-control w-full max-w-xs '>
                        <div className='label'>
                            <span className='label-text'>Waktu Mulai</span>
                        </div>
                        <input placeholder='2024-02-22T08:30:00Z' className='input input-bordered w-full max-w-x' type='text' value={waktuMulai} onChange={(e) => setWaktuMulai(e.target.value)} />
                    </label>

                    <label className='form-control w-full max-w-xs '>
                        <div className='label'>
                            <span className='label-text'>Waktu Selesai</span>
                        </div>
                        <input placeholder='2024-02-22T08:30:00Z' className='input input-bordered w-full max-w-x' type='text' value={waktuSelesai} onChange={(e) => setWaktuSelesai(e.target.value)} />
                    </label>
                    <button type='submit' className='mt-10 max-w-xs btn btn-primary' onClick={(event) => handleSubmit(event)}>
                        membuat quiz
                    </button>
                </div>
            </form>
        </div>
    )
}

export default QuizCreatePage