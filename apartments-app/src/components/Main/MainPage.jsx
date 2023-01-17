import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const MainPage = () => {

  return (
    <main className='w-screen h-screen bg-gray-500 font-poppins border-2 border-black'>
      <Navbar />
      <Outlet />
    </main>
  )
}

export default MainPage