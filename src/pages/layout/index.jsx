import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/molecules/header'
import Sidebar from '../../components/molecules/sidebar'

const Layout = () => {
  return (
    <div className='flex w-full'>

      <Sidebar className="h-full mr-24" style={{position: 'fixed', left: '0px' }}/>
      <div className='p-4 w-full' style={{marginLeft:'150px'}}>
        <Header />
        <div className='justify-center'><Outlet /></div>
      </div>
    </div>
  )
}

export default Layout     