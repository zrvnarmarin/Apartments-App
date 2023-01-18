import React from 'react'

const LoginForm = () => {
  return (
    <form className='flex flex-col bg-[#374151] gap-12 p-2'>
      <input className='p-2' type="text" placeholder='Email' />
      <input className='p-2' type="text" placeholder='Password' />
    </form>
  )
}

export default LoginForm