import React from 'react'
import { GoLinkExternal } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const index = (props) => {
    const { error, data, time, isActive:isActiveFun} = props


    const navigate = useNavigate()


    const handleToQuiz = (id)=>{
        navigate(`/dashboard/quiz/${id}`)
    }
    

    return (
        <div>
            {!error ? (
                <div className='px-4 overflow-y-scroll'>
                    <table className='w-full text-right'>
                        <thead className='text-sec-400'>
                            <tr>
                                <th>Judul</th>
                                <th>Deskripsi</th>
                                <th>Waktu Mulai</th>
                                <th>Waktu Selesai</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody className='text-sec-300'>

                            {data.map((item, index) => {
                                let waktuMulai = new Date(item.waktuMulai)
                                waktuMulai = waktuMulai.getTime()
                                let waktuSelesai = new Date(item.waktuSelesai)
                                waktuSelesai = waktuSelesai.getTime()
                                const isActive = isActiveFun(waktuMulai,waktuSelesai,time)
                                return (
                                    isActive && (
                                        <tr key={index} className='h-10 hover:bg-pri-500 hover:text-white'>
                                        <td className='text-left'>{item.judul}</td>
                                        <td>{item.deskripsi} <i className='ri-message-2-line text-green'></i></td>
                                        <td>{item.waktuMulai}</td>
                                        <td>{item.waktuSelesai}</td>
                                        <td><GoLinkExternal onClick={()=>handleToQuiz(item.id)}/></td>
                                    </tr>
                                    )
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            ):(<div>Error mengambil data</div>)}
        </div>

    )
}

export default index