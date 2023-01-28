import React from 'react'
import LoginForm from './LoginForm'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { validateEmail, validateName, validatePassword } from '../../utils/utilityFunctions'
import axios from 'axios'

const UseInputValidation = (validateValue) => {
  const [value, setValue] = useState('')
  const [isTouched, setIsTouched] = useState(false)

  const isValueValid = validateValue(value)
  const hasError = !isValueValid && isTouched

  const valueChangeHandler = e => setValue(e.target.value)
  const valueBlurHandler = () => setIsTouched(true)
  const reset = () => {
    setValue('')
    setIsTouched(false)
  }

  return {
    value,
    isValueValid,
    hasError,
    changeHandler: valueChangeHandler,
    blurHandler: valueBlurHandler,
    reset
  }
}

const LoginPage = ({ onOpenMain }) => {
  const link = 'https://apartments-app-6a66f-default-rtdb.firebaseio.com/passwords.json'

  const { 
    value: email, 
    isValueValid: isEmailValid, 
    hasError: hasEmailError, 
    changeHandler: emailChangeHandler, 
    blurHandler: emailBlurHandler,
    reset: resetEmail
  } = UseInputValidation(validateEmail)

  const { 
    value: password, 
    isValueValid: isPasswordValid, 
    hasError: hasPasswordError, 
    changeHandler: passwordChangeHandler, 
    blurHandler: passwordBlurHandler,
    reset: resetPassword
  } = UseInputValidation(validateName)

  let isFormValid = false
  if (isEmailValid && isPasswordValid) {
    isFormValid = true
  }

  const submitFormHandler = e => {
    e.preventDefault()

    console.log(hasPasswordError)
    
    if (!isEmailValid && !isPasswordValid) return

    resetEmail()
    resetPassword()
  }


  return (
    <div className='w-screen h-screen bg-[#23272f] flex flex-col gap-32 items-center justify-center'>
      <h1 className='italic text-8xl font-medium text-[#f6f7f9]'>Apartmenify</h1>
      <section className='bg-[#374151] px-2 pt-8 pb-2 rounded-xl xs:w-3/4 sm:w-3/4 lg:w-1/2 lg:max-w-[40%]'>
        <h1 className='font-poppins text-4xl font-medium text-center pb-8 text-[#f6f7f9]'>Login</h1>
        <LoginForm 
          email={email}
          onChangeEmail={emailChangeHandler} 
          onBlurEmail={emailBlurHandler} 
          hasEmailError={hasEmailError} 
          onSubmitForm={submitFormHandler}
          // onOpenMain={onOpenMain}
          password={password}
          onChangePasword={passwordChangeHandler} 
          onBlurPassword={passwordBlurHandler} 
          hasPasswordError={hasPasswordError} 
        />
      </section>
    </div>
  )
}

export default LoginPage