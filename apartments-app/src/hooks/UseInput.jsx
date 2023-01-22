import { useState } from "react"
import React from 'react'

const UseInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('')
  const [isTouched, setIsTouched] = useState(false)

  const valueIsValid = validateValue(enteredValue)
  const hasError = !valueIsValid && isTouched

  const valueChangeHandler = e => setEnteredValue(e.target.value)
  const inputBlurHandler = e => setIsTouched(true)

  return {
    value: enteredValue,
    hasError,
    valueChangeHandler,
    inputBlurHandler
  }
}

export default UseInput