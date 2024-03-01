import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/molecules/header'
import Sidebar from '../../components/molecules/sidebar'

const Layout = () => {
  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>

      <Sidebar />
      <div className='p-4'>
        <Header />
        <div><Outlet /></div>
      </div>
    </div>
  )
}

export default Layout     