// import One from "./components/One"
// import Four from "./components/Four"
// import ThemeProvider from "./store/Theme/ThemeProvider"
// import Header from "./components/Header"
// import LoginPage from "./components/Login/LoginPage"
// import MainPage from "./components/Main/MainPage"
// import FrontPage from "./components/Front/FrontPage"
// import { useState } from "react"
// import { Route, Routes } from "react-router-dom"
// import Apartments from "./components/Main/Apartments"
// import Tags from "./components/Main/Tags"
// import ErrorPage from './components/Error/ErrorPage.jsx'
// import RegisteredUsers from "./components/Main/RegisteredUsers"
// import AddNewApartment from "./components/Main/AddNewApartment"

// const App = () => {
//   const [isLoginOpened, setIsLoginOpened] = useState(false)
//   const [isMainOpened, setIsMainOpened] = useState(false)
//   const [isNewApartmentModalOpen, setIsNewApartmentModalOpen] = useState(false)
//   const openLoginPage = () => setIsLoginOpened(true)
//   const openMainPage = () => setIsMainOpened(true)
//   const openNewApartmentModal = () => setIsNewApartmentModalOpen(true)
//   const closeNewApartmentModal = () => setIsNewApartmentModalOpen(false)

//   return (
//     // <ThemeProvider>
//     //   <div className="bg-red-400 flex flex-col gap-4 m-4 p-2">
//     //     <Header />
//     //     <One />
//     //     <Four />
//     //   </div>
//     // </ThemeProvider>

//     <div>
//       <Routes>
//         <Route path="*" element={<ErrorPage />} />
//         <Route path="/" element={<FrontPage onOpenLogin={openLoginPage} />} />
//         <Route path="/login" element={<LoginPage onOpenMain={openMainPage} />} /> 
//         <Route path="/main" element={<MainPage />}>
//           <Route path="apartments" element={<Apartments isModalOpen={isNewApartmentModalOpen} onModalClose={closeNewApartmentModal} onModalOpen={openNewApartmentModal} />} >
//             <Route path=":id" element={<AddNewApartment />} />
//           </Route>
//           <Route path="tags" element={<Tags />} />
//           <Route path="registeredUsers" element={<RegisteredUsers />} />
//         </Route>
//       </Routes>
//     </div>
//   )
// }

// export default App;

import React, { useState, useReducer, useEffect } from "react";
import useHttpRequest from "./hooks/UseHttpRequest";
import LoginPage from './components/Login/LoginPage.jsx'
import { validateEmail, validateName } from "./utils/utilityFunctions";

const UseInput = (validateValue) => {
  const [value, setValue] = useState('')
  const [isTouched, setIsTouched] = useState(false)

  const isValueValid = validateValue(value)
  const hasError = !isValueValid && isTouched

  const valueChangeHandler = e => setValue(e.target.value)
  const valueBlurHandler = () => setIsTouched(true)
  const resetValues = () => {
    setValue('')
    setIsTouched(false)
  }

  return {
    value: value,
    isValueValid: isValueValid,
    hasError: hasError,
    valueChangeHandler: valueChangeHandler,
    valueBlurHandler: valueBlurHandler,
    resetValues: resetValues
  }

}

const ACTIONS = {
  ADD_TITLE: 'add title',
  ADD_ROOMS: 'add rooms',
  ADD_ADDRESS: 'add address',
  RESET_ALL_INPUTS: 'reset all inputs',
}

const apartmentReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TITLE: {
      return { ...state, title: action.payload}
    }
    case ACTIONS.ADD_ROOMS: {
      return { ...state, rooms: action.payload}
    }
    case ACTIONS.ADD_ADDRESS: {
      return { ...state, address: action.payload}
    }
    case ACTIONS.RESET_TITLE: {
      return { ...state, title: '' }
    }
    case ACTIONS.RESET_ROOMS: {
      return { ...state, rooms: '' }
    }
    case ACTIONS.RESET_ADDRESS: {
      return { ...state, address: '' }
    }
    case ACTIONS.RESET_ALL_INPUTS: {
      return { title: '', rooms: '', address: ''}
    }
  }
}

const App = () => {
  const [state, dispatch] = useReducer(apartmentReducer, { title: '', rooms: '', address: '', apartments: [] })
  const [apartments, setApartments] = useState([])
  const link = 'https://apartments-app-6a66f-default-rtdb.firebaseio.com/apartments.json'
  const transformApartments = (apartmentsObject) => {
    const loadedApartments = []

    for (const key in apartmentsObject) {
      loadedApartments.push({
        id: apartmentsObject[key].id,
        title: apartmentsObject[key].title,
        address: apartmentsObject[key].address,
        rooms: apartmentsObject[key].rooms,
      })
    }

    setApartments(loadedApartments)
  }
  const { error, isLoading, getData, postData } = useHttpRequest(link, transformApartments)

  const titleChangeHandler = e => dispatch({ type: ACTIONS.ADD_TITLE, payload: e.target.value })
  const addressChangeHandler = e => dispatch({ type: ACTIONS.ADD_ADDRESS, payload: e.target.value })
  const roomsChangeHandler = e => dispatch({ type: ACTIONS.ADD_ROOMS, payload: e.target.value })
  const resetAllInputs = () => dispatch({ type: ACTIONS.RESET_ALL_INPUTS })
  const getAllApartments = (async () => getData())
  const addNewApartment = async (newApartment) => postData(newApartment)

  const formSubmitHandler = e => {
    e.preventDefault()

    const newApartment = {
      id: crypto.randomUUID(),
      title: state.title,
      address: state.address,
      rooms: state.rooms
    }

    addNewApartment(newApartment)
    resetAllInputs()
  }

  // useEffect(() => {
  //   getAllApartments()
  // }, [getAllApartments])

  return (
    
    <>
    <div>
      { !isLoading && error && <p>{error}</p> }
      { isLoading &&  <p>Loading...</p>}
      <p className="bg-blue-300 text-white text-4xl">GET:</p>

      {apartments.map(apartment => 
        <div key={apartment.id} className="border-2 border-black p-4 rounded-xl">
          <p>ID: {apartment.id}</p>
          <p>TITLE: {apartment.title}</p>
          <p>ROOMS: {apartment.rooms}</p>
          <p>ADDRESS: {apartment.address}</p>
        </div>  
      )}
      <p className="bg-red-300 text-white text-4xl">POST:</p>

      <form onSubmit={formSubmitHandler} className='bg-green-500 text-black p-10 flex flex-col gap-5 w-1/2'>
        <input value={state.title} onChange={titleChangeHandler} type='text' placeholder="title" />
        <input value={state.rooms} onChange={roomsChangeHandler} type='text' placeholder="rooms" />
        <input value={state.address} onChange={addressChangeHandler} type='text' placeholder="address" />
        <button className='text-white px-6 py-1 rounded-2xl text-xl bg-rose-600' >Submit</button>
      </form>
      <p className="bg-blue-300 text-white text-4xl">FORM VALIDATION:</p>
    </div>
      <PracticeForm />
    </>
  )
}



export default App;

const PracticeForm = () => {
  const { 
    value: name, 
    isValueValid: isNameValid, 
    hasError:  hasErrorName, 
    valueChangeHandler: nameChangeHandler, 
    valueBlurHandler: nameBlurHandler,
    resetValues
  } = UseInput(validateName)

  const { 
    value: surname, 
    isValueValid: isSurnameValid, 
    hasError:  hasErrorSurname, 
    valueChangeHandler: surnameChangeHandler, 
    valueBlurHandler: surnameBlurHandler
  } = UseInput(validateName)

  const { 
    value: email, 
    isValueValid: isEmailValid, 
    hasError: hasEmailError, 
    valueChangeHandler: emailChangeHandler, 
    valueBlurHandler: emailBlurHandler
  } = UseInput(validateEmail)

  let isFormValid = false
  if (isNameValid && isSurnameValid && isEmailValid) {
    isFormValid = true
  }

  const submitFormHandler = e => {
    e.preventDefault()

    if (!isNameValid && !isSurnameValid && isEmailValid) return

    resetValues()
  }


  

  return (
    <div className="font-poppins flex items-center justify-center p-4 w-full">
      <div className="flex flex-col justify-center items-center gap-4 shadow-2xl py-8 rounded-xl border-[#dbd9da] border-[1px] flex-1">
        <h1 className="font-semibold text-2xl text-slate-900 mb-6">Sign Up</h1>
        <form onSubmit={submitFormHandler} className="font-light p-4 flex flex-col justify-center items-center gap-6 w-full">
          <div className="w-full">
            <input value={name} onBlur={nameBlurHandler} onChange={nameChangeHandler} className="w-full py-2 outline-0 border-b-[1px] duration-300 focus:border-[#5590f4] text-[#8297aa] border-slate-300 font-light" type="text" placeholder="Your Name" />
            { hasErrorName && <p>Name must not be empty!</p>}
          </div>
          <div className="w-full">
            <input value={surname} onChange={surnameChangeHandler} onBlur={surnameBlurHandler} className="w-full py-2 outline-0 border-b-[1px] duration-300 focus:border-[#5590f4] text-[#8297aa] border-slate-300 font-light" type="text" placeholder="Your Surname" />
            { hasErrorSurname && <p>Surname must not be empty and the first letter have to have Z character!</p> }
          </div>
          <div className="w-full">
            <input value={email} onChange={emailChangeHandler} onBlur={emailBlurHandler} className="w-full py-2 outline-0 border-b-[1px] duration-300 focus:border-[#5590f4] text-[#8297aa] border-slate-300 font-light" type="email" placeholder="Your Email" />
            { hasEmailError && <p>Please enter valid email!</p>}
          </div>
          <button disabled={!isFormValid} className="bg-gradient-to-r from-cyan-500 to-blue-500 py-2 rounded-3xl text-xl font-medium text-white uppercase w-full mt-12">Sign In</button>
        </form>
      </div>
    </div>
  )
}