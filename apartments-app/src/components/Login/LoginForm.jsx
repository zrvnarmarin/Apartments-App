import React from 'react'
import { Link } from 'react-router-dom'

const LoginForm = ({ email, password, onChangeEmail, onBlurEmail, hasEmailError, onSubmitForm, onOpenMain, onChangePassword, onBlurPassword, hasPasswordError }) => {
  return (
    <form onSubmit={onSubmitForm} className='flex flex-col bg-[#24245a] gap-12 p-2'>
      <input 
        value={email} 
        onChange={onChangeEmail} 
        onBlur={onBlurEmail} 
        className='p-2' 
        type="text" 
        placeholder='Email' 
      />
      { hasEmailError && <p>Email is not valid!</p>}
      <input 
        
        onChange={onChangePassword}
        onBlur={onBlurPassword} 
        className='p-2' 
        type="text" 
        placeholder='Password' 
      />
      { hasPasswordError && <p>Password not correct!</p> }
      <div className=' flex items-center justify-center gap-4 p-2 pt-8'>
        <button
          type='submit'
          className='w-full font-medium text-2xl px-12 py-2  text-[#f6f7f9] bg-[#68106d] hover:bg-[#741379]'
        >
          <Link to="/main">Login</Link>
        </button>
      </div>
    </form>
  )
}

export default LoginForm