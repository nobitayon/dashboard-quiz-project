import React from 'react'
import { Cards, QuizSection, Table } from '../../components/molecules'
import data from '../../dummy/data'

const Dashboard = () => {
  return (
    <div>
      <div>This is dashboard</div>
      {/* <Cards/> */}
      <div className='flex flex-col gap-10'>
        <QuizSection isActive={(a,b,t)=>t>a && t<b} title={"Quiz aktif"} titleMore={"Lihat semua quiz aktif"} lihatSemua={() => { console.log('lihat semua function') }} />
        <QuizSection isActive={(a,b,t)=>t>b && true} title={"Quiz selesai"} titleMore={"Lihat semua quiz selesai"} lihatSemua={() => { console.log('lihat semua function') }} />
        {/* <Table data={data}/> */}
      </div>
    </div>
  )
}

export default Dashboard