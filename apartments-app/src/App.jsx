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

import React, { useState} from "react";
import { useEffect } from "react";

const BasicForm = (props) => {
  return (
    <form>
      <div className='control-group'>
        <div className='form-control'>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name' />
        </div>
        <div className='form-control'>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name' />
        </div>
      </div>
      <div className='form-control'>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='text' id='name' />
      </div>
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('')
  const [enteredNameTouched, setEnteredNameTouched] = useState(false)

  const enteredNameIsValid = enteredName.trim() !== ''
  let formIsValid = false

  const nameInputChangeHandler = e => setEnteredName(e.target.value)
  const nameInputBlurHandler = e => setEnteredNameTouched(true)

  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false)

  const emailInputChangeHandler = e => setEnteredEmail(e.target.value)
  const emailInputBlurHandler = e => setEnteredEmailTouched(true)

  const enteredEmailIsValid = enteredEmail.includes('@')
  const enteredEmailIsInvalid = !enteredEmailIsValid && enteredEmailTouched

  

  const formSubmitHandler = e => {
    e.preventDefault()  

    setEnteredNameTouched(true)

    if (!enteredNameIsValid) {
      return
    }

    setEnteredName('')
    setEnteredEmail('')
    setEnteredNameTouched(false)
    setEnteredEmailTouched(false)

    console.log(enteredName)
  }

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true
  } 

  return (
    <form onSubmit={formSubmitHandler} className='border-2 border-black p-4 text-2xl bg-green-400 flex flex-col items-center justify-center'>
      <div>
        <label htmlFor='name'>Your Name</label>
        <input 
          value={enteredName} 
          onChange={nameInputChangeHandler} 
          onBlur={nameInputBlurHandler}
          type='text' id='name' 
        />
      </div>
      <div>
        <label htmlFor='email'>Your Email</label>
        <input 
          value={enteredEmail} 
          onChange={emailInputChangeHandler} 
          onBlur={emailInputBlurHandler}
          type='email' id='email' 
        />
      </div>
      { !enteredNameIsValid && enteredNameTouched && <p>Name must not be empty!</p> }
      { enteredEmailIsInvalid && <p>Please enter a valid email</p> }
      <div>
        <button disabled={!formIsValid} className="bg-red-400 p-2 rounded-xl">Submit</button>
      </div>
    </form>
  );
};

const App = () => {
  return (
    <div>
      <SimpleInput />
    </div>
  )
}

export default App;