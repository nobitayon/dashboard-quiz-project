import React from 'react'
import { GoLinkExternal } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const index = (props) => {
    const { error, data, time, isActive: isActiveFun } = props


    const navigate = useNavigate()


    const handleToQuiz = (id) => {
        navigate(`/dashboard/quiz/${id}`)
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
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.map((item, index) => {
                            let waktuMulai = new Date(item.waktuMulai)
                            waktuMulai = waktuMulai.getTime()
                            let waktuSelesai = new Date(item.waktuSelesai)
                            waktuSelesai = waktuSelesai.getTime()
                            const isActive = isActiveFun(waktuMulai, waktuSelesai, time)
                            return (
                                isActive && (
                                    <tr key={index} className='h-10'>
                                        <td>{index+1}</td>
                                        <td>{item.judul}</td>
                                        <td>{item.deskripsi}</td>
                                        <td>{item.waktuMulai}</td>
                                        <td>{item.waktuSelesai}</td>
                                        <td className='hover:cursor-pointer'><GoLinkExternal onClick={() => handleToQuiz(item.id)} /></td>
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