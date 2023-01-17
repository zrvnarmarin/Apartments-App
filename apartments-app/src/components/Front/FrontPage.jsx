import React from 'react'
import { Link } from 'react-router-dom'

const FrontPage = ({ onOpenLogin }) => {
  return (
    <div className='w-screen h-screen bg-gray-100 flex flex-col gap-16 items-center justify-center'>
        <h1 className='italic text-8xl font-medium'>Apartmenify</h1>
        <button 
            onClick={onOpenLogin} 
            className='px-10 py-2 rounded-2xl font-semibold text-xl bg-blue-200'
        >
            <Link to='/login'>Enter App</Link>
        </button>
    </div>
  )
}

export default FrontPage