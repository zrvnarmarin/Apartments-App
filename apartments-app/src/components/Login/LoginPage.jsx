import React from 'react'
import LoginForm from './LoginForm'

const LoginPage = () => {
  return (
    <div className='w-screen h-screen bg-gray-100 flex items-center justify-center'>
      <section className='bg-gray-300 p-2 rounded-xl xs:w-3/4 sm:w-3/4 lg:w-1/2 lg:max-w-1/2'>
          <h1 className='font-poppins text-4xl font-medium text-center pb-8'>Login</h1>
          <LoginForm />
      </section>
    </div>
  )
}

export default LoginPage