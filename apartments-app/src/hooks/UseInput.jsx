import { useReducer } from "react"

const ACTIONS = {
    INPUT: 'input',
    BLUR: 'blur',
    RESET: 'reset'
}

const inputStateReducer = (state, action) => {
    switch(action.type) {
        case ACTIONS.INPUT: {
            return {...state, enteredValue: action.payload}
        }
        case ACTIONS.BLUR: {
            return {...state, isTouched: true}
        }
        case ACTIONS.RESET: {
            return { isTouched: false, enteredValue: '' }
        }
    }
}

const UseInput = (validateValue) => {
const [state, dispatch] = useReducer(inputStateReducer, { enteredValue: '', isTouched: false})

  const valueIsValid = validateValue(state.enteredValue)
  const hasError = !valueIsValid && state.isTouched

  const valueChangeHandler = e => dispatch({ type: ACTIONS.INPUT, payload: e.target.value})
  const inputBlurHandler = () => dispatch({ type: ACTIONS.BLUR })
  const reset = () => dispatch({ type: ACTIONS.RESET })

  return {
    value: state.enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  }
}

export default UseInput