import React from 'react'
import LoginForm from './LoginForm'
import { Link } from 'react-router-dom'

const LoginPage = ({onOpenMain}) => {
  return (
    <div className='w-screen h-screen bg-[#23272f] flex flex-col gap-32 items-center justify-center'>
      <h1 className='italic text-8xl font-medium text-[#f6f7f9]'>Apartmenify</h1>
      <section className='bg-[#374151] px-2 pt-8 pb-2 rounded-xl xs:w-3/4 sm:w-3/4 lg:w-1/2 lg:max-w-[40%]'>
        <h1 className='font-poppins text-4xl font-medium text-center pb-8 text-[#f6f7f9]'>Login</h1>
        <LoginForm />
        <div className=' flex items-center justify-center gap-4 p-2 pt-8'>
          <button
            onClick={onOpenMain}
            className='w-full font-medium text-2xl px-12 py-2 rounded-lg text-[#f6f7f9] bg-[#149eca]'
          >
            <Link to="/main">Login</Link>
          </button>
        </div>
      </section>
    </div>
  )
}

export default LoginPage