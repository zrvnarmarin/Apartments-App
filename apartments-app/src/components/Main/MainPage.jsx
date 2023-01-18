import React from 'react'
import { Outlet } from 'react-router-dom'
import Apartments from './Apartments'
import Navbar from './Navbar'

const MainPage = () => {

  return (
    <main className='w-screen h-screen bg-[#23272f] font-poppins'>
      <Navbar />
      <Outlet />
    </main>
  )
}

export default MainPage