import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const MainPage = () => {

  return (
    <main className='w-screen h-screen bg-[#080c24] font-poppins'>
      <Navbar />
      <Outlet />
    </main>
  )
}

export default MainPage