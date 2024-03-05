import React, { useEffect, useState } from 'react'
import { GoLinkExternal } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { backendURL } from '../../../constEnv'
import 'react-toastify/dist/ReactToastify.css'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../../hooks/useAuth';

const index = (props) => {
    const { data } = props


    
    const { infoLogin: { token: authToken } } = useAuth()

    const navigate = useNavigate()


    const handleToPertanyaan = async (event, idQuiz) => {

        const idPertanyaan = event.currentTarget.parentElement.parentElement.querySelector('td:nth-child(2)').textContent



        const pertanyaan = event.currentTarget.parentElement.parentElement.querySelector('td:nth-child(3)').querySelector('input').value
        const opsiJawaban = event.currentTarget.parentElement.parentElement.querySelector('td:nth-child(4)').querySelector('input').value
        const elementJawabanBenar = event.currentTarget.parentElement.parentElement.querySelector('td:nth-child(5)').querySelector('input')
        const jawabanBenar = parseInt(event.currentTarget.parentElement.parentElement.querySelector('td:nth-child(5)').querySelector('input').value)


        const response = await fetch(`${backendURL}/quiz/${idQuiz}/pertanyaan/${idPertanyaan}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ pertanyaan: pertanyaan, opsiJawaban: opsiJawaban, jawabanBenar: jawabanBenar })
        })

        if (response.status === 200) {
            toast.success('Sukses edit data', {
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

            const json_data = await response.json()
        } else {
            toast.error('Gagal edit data', {
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
        

    }

    const toggleEditMode = (event) => {
        const theTD = event.currentTarget.parentElement.parentElement


        const pertanyaanInput = theTD.querySelector('input[name="pertanyaan"]')
        const opsiJawaban = theTD.querySelector('input[name="opsiJawaban"]')
        const jawabanBenar = theTD.querySelector('input[name="jawabanBenar"]')


        const arrayInput = [pertanyaanInput, opsiJawaban, jawabanBenar]



        for (let i = 0; i < 3; i++) {
            const el = arrayInput[i]
            const temp = el.disabled
            el.disabled = !temp
            if (el.disabled) {
                el.classList.remove('placeholder-red-300', 'border')
                el.value = ""
            } else {
                el.classList.add('placeholder-red-300', 'border')
                el.value = el.placeholder
            }

        }

        const simpanButton = event.currentTarget.parentElement.parentElement.querySelector('td:nth-child(7)')


        const temp = simpanButton.style.display

        if (temp === "none") {
            simpanButton.style.display = ""
        } else {
            simpanButton.style.display = "none"
        }
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
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th style={{ display: 'none' }}></th>
                            <th>Pertanyaan</th>
                            <th>Opsi Jawaban</th>
                            <th>Jawaban Benar</th>
                            <th>Edit</th>
                            <th>simpan</th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.map((item, index) => {

                            return (
                                (
                                    <tr key={index} className='h-10'>
                                        <td>{index + 1}</td>
                                        <td style={{ display: 'none' }}>{item.id}</td>
                                        <td><input name='pertanyaan' disabled placeholder={item.pertanyaan} /></td>
                                        <td><input name='opsiJawaban' disabled placeholder={item.opsiJawaban} /></td>
                                        <td><input name='jawabanBenar' disabled placeholder={item.jawabanBenar} /></td>
                                        <td ><GoLinkExternal onClick={(event) => toggleEditMode(event)} className='hover:cursor-pointer' /></td>
                                        <td className='simpanButton' style={{ display: 'none' }} ><GoLinkExternal className='hover:cursor-pointer' onClick={(event) => handleToPertanyaan(event, item.idQuiz)} /></td>
                                    </tr>
                                )
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default index