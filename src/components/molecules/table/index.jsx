import React from 'react'
import { GoLinkExternal } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { convertToUnix } from '../../../lib/util/dateRelated';
import { backendURL } from '../../../constEnv';
import { useAuth } from '../../../hooks/useAuth';

const index = (props) => {
    const { error, data, time, isActive: isActiveFun } = props

    const { infoLogin: { token: authToken } } = useAuth()

    const navigate = useNavigate()


    const handleToQuiz = (id) => {
        navigate(`/dashboard/quiz/${id}`)
    }

    const getPertanyaan = async (quizId) => {

        const response = await fetch(`${backendURL}/quiz/${quizId}/pertanyaan`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })


        if (response.status !== 200) {

            return null
        }

        const data_json = await response.json()

        const list_id = []
        for (let i = 0; i < data_json.length; i++) {
            list_id.push(data_json[i].id)
        }
        return list_id
    }

    const handleDelete = async (id) => {

        const listIdPertanyaan = await getPertanyaan(id)
        
        let response 
        for (let i = 0; i < listIdPertanyaan.length; i++) {
            console.log(`${backendURL}/quiz/${id}/pertanyaan/${listIdPertanyaan[i]}`)
            response = await fetch(`${backendURL}/quiz/${id}/pertanyaan/${listIdPertanyaan[i]}`, {
                method:'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({  })
            })
            data_json = await response.json()
            console.log(response.status,data_json)
        }

    }


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Judul</th>
                            <th>Deskripsi</th>
                            <th>Waktu Mulai</th>
                            <th>Waktu Selesai</th>
                            <th>Lihat lebih detail</th>
                            <th>hapus quiz</th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.map((item, index) => {
                            // let waktuMulai = new Date(item.waktuMulai).toISOString()
                            // waktuMulai = new Date(waktuMulai)
                            // waktuMulai = waktuMulai.getTime()
                            // let waktuSelesai = new Date(item.waktuSelesai).toISOString()
                            // waktuSelesai = new Date(waktuSelesai)
                            // waktuSelesai = waktuSelesai.getTime()

                            // console.log(waktuMulai,waktuSelesai,time)

                            let waktuMulai = convertToUnix(item.waktuMulai)
                            let waktuSelesai = convertToUnix(item.waktuSelesai)

                            const isActive = isActiveFun(waktuMulai, waktuSelesai, time)
                            return (
                                isActive && (
                                    <tr key={index} className='h-10'>
                                        <td>{index + 1}</td>
                                        <td>{item.judul}</td>
                                        <td>{item.deskripsi}</td>
                                        <td>{item.waktuMulai}</td>
                                        <td>{item.waktuSelesai}</td>
                                        <td className='hover:cursor-pointer'><GoLinkExternal onClick={() => handleToQuiz(item.id)} /></td>
                                        <td className='hover:cursor-pointer'><GoLinkExternal onClick={() => handleDelete(item.id)} /></td>
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