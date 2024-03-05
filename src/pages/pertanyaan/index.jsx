import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { backendURL } from '../../constEnv';

const Pertanyaan = () => {
    let { quizId } = useParams();

    const [pertanyaan, setPertanyaan] = useState("")
    const [opsiJawabanBenar, setOpsiJawabanBenar] = useState("")
    const [jawabanBenar, setJawabanBenar] = useState("")

    const { infoLogin: { token } } = useAuth()

    const handleSubmit = async (event) => {

        event.preventDefault()

        const response = await fetch(`${backendURL}/quiz/${quizId}/pertanyaan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ pertanyaan: pertanyaan, opsiJawaban: opsiJawabanBenar, jawabanBenar: parseInt(jawabanBenar) })
        })


        if (response.status === 200) {
            toast.success('sukses menambah pertanyaan', {
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
            setPertanyaan("")
            setJawabanBenar("")
            setOpsiJawabanBenar("")
        } else {
            toast.error('Gagal membuat pertanyaan', {
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

        const jsonData = await response.json()


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
                            <span className='label-text'>Pertanyaan</span>
                        </div>
                        <input className='input input-bordered w-full max-w-x' type='text' value={pertanyaan} onChange={(e) => setPertanyaan(e.target.value)} />
                    </label>

                    <label className='form-control w-full max-w-xs '>
                        <div className='label'>
                            <span className='label-text'>Opsi Jawaban</span>
                        </div>
                        <input className='input input-bordered w-full max-w-x' type='text' value={opsiJawabanBenar} onChange={(e) => setOpsiJawabanBenar(e.target.value)} />
                    </label>

                    <label className='form-control w-full max-w-xs '>
                        <div className='label'>
                            <span className='label-text'>Jawaban Benar</span>
                        </div>
                        <input className='input input-bordered w-full max-w-x' type='text' value={jawabanBenar} onChange={(e) => setJawabanBenar(e.target.value)} />
                    </label>
                    <button type='submit' className='mt-10 max-w-xs btn btn-primary' onClick={(event) => handleSubmit(event)}>
                        membuat pertanyaan
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Pertanyaan