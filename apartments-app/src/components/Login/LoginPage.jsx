import React from 'react'
import LoginForm from './LoginForm'
import { Link } from 'react-router-dom'

const LoginPage = ({onOpenMain}) => {
  return (
    <div className='w-screen h-screen bg-gray-100 flex flex-col gap-32 items-center justify-center'>
      <h1 className='italic text-8xl font-medium'>Apartmenify</h1>
      <section className='bg-gray-300 p-2 rounded-xl xs:w-3/4 sm:w-3/4 lg:w-1/2 lg:max-w-1/2'>
        <h1 className='font-poppins text-4xl font-medium text-center pb-8'>Login</h1>
        <LoginForm />
        <div className='bg-red-300 flex items-center justify-center gap-4 p-2'>
          <button
            onClick={onOpenMain}
            className='w-full font-medium text-2xl px-12 py-2 rounded-lg bg-gray-300'
          >
            <Link to="/main">Login</Link>
          </button>
        </div>
      </section>
    </div>
  )
}

export default LoginPage