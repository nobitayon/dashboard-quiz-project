import React from 'react'

const Card = ({item}) => {
    const {judul,deskripsi,waktuMulai,waktuSelesai} = item
  return (
    <div className='p-4 bg-slate-400 m-3'>
      <div>judul:{judul}</div>
      <div>deskripsi:{deskripsi}</div>
      <div>waktu mulai:{waktuMulai}</div>
      <div>waktu selesai:{waktuSelesai}</div>
    </div>
    
  )
}

export default Card