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

import React, { useState, useEffect } from "react";
import axios from 'axios'
import { validateName } from './utils/utilityFunctions'
import { navListItems } from "./data/navListItems";
import { Link } from 'react-router-dom'
import styles from './styles/navbar.module.css'
import DownArrow from './assets/DownArrow.svg'


const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoginSuccessfull, setIsLoginSuccessfull] = useState(null)

  const displayLogin = (loginInfo) => setIsLoginSuccessfull(loginInfo)

  const setNewTask = task => setTasks(prev => [...prev, task])

  const deleteTask = async id => {
    const response = await axios.delete(`https://apartments-app-6a66f-default-rtdb.firebaseio.com/tasks/${id}.json`)

    setTasks(tasks.filter(task => task.id !== id))
  }

  const getTasks = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('https://apartments-app-6a66f-default-rtdb.firebaseio.com/tasks.json')
      if (!response.ok) throw new Error('Request failed!');
      const passwordsResponseData = await response.json()

      const loadedTasks = []

      for (const key in passwordsResponseData) {
        loadedTasks.push({
          id: key,
          text: passwordsResponseData[key].text
        })
      }

      setTasks(loadedTasks)

    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }

    setIsLoading(false)
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div>
      {/* <LoginForm onLoginSucces={displayLogin} /> otkomentiraj ovo za test funkcionalnosti */} 
      { isLoginSuccessfull && <>
        <NewTask onSetNewTask={setNewTask} />
        { isLoading && <p>Tasks are loading...</p>}
        { error && <button onClick={getTasks}>{error} Try again!</button> }
        { !isLoading && tasks.length === 0 && <p>There is no tasks! Add some!</p>}
        {tasks.map((task, i) =>
          <Task
            key={task.id}
            index={i}
            id={task.id}
            text={task.text}
            onTaskDelete={deleteTask}
          />
        )}
      </>}

      <Main />
    </div>
  )
}

export default App;

const Task = ({ id, text, onTaskDelete, index }) => {
  const [isFullOpened, setIsFullOpened] = useState(false)

  return (
    <div className='border-2 border-black'>
      <p>ID: {id}</p>
      <p>TEXT: {text}</p>
      <p>#{index}</p>
      <button onClick={() => onTaskDelete(id)} className="p-2 bg-indigo-100">Delete</button>
      <button onClick={() => setIsFullOpened(prev => !prev)}>Show</button>
      { isFullOpened &&
        <div className="bg-red-400 border-2 border-black"><p>{text}</p></div>
      }
    </div>  
  )
}

const NewTask = ({ onSetNewTask }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [enteredTask, setEnteredTask] = useState('')

  const enteredTaskChangeHandler = e => setEnteredTask(e.target.value)

  const addTask = async (enteredTask) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('https://apartments-app-6a66f-default-rtdb.firebaseio.com/tasks.json', {
        method: 'POST',
        body: JSON.stringify({ text: enteredTask }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const passwordsResponseData = await response.json()
      
      const firebaseId = passwordsResponseData.name
      onSetNewTask({ id: firebaseId, text: enteredTask })
      
    } catch (error) {
      setError(error)
    }

    setIsLoading(false)
  }

  const submitFormHandler = e => {
    e.preventDefault()

    if (enteredTask.length > 0) addTask(enteredTask)

    setEnteredTask('')
  }

  if (error) return <p>{error}</p>

  return (
    <form onSubmit={submitFormHandler}>
      <input value={enteredTask} onChange={enteredTaskChangeHandler} type="text" placeholder="Enter new task..." />
      <button className="p-2 bg-green-100">{ isLoading ? <p>Sending...</p> : <p>Submit task</p>}</button>
    </form>
  )
}

const LoginForm = ({ onLoginSucces }) => {
  const [isCorrectUsername, setIsCorrectUsername] = useState(false)
  const [isCorrectPassword, setIsCorrectPassword] = useState(false)

  const [loadedUsernames, setLoadedUsernames] = useState([])
  const [loadedPasswords, setLoadedPasswords] = useState([])

  const { 
    value: username,
    isValueValid: isUsernameValid,
    hasError: hasUsernameError,
    valueChangeHandler: usernameChangeHandler,
    valueBlurHandler: usernameBlurHandler,
    reset: resetUsername
  } = UseInput(validateName)

  const { 
    value: password,
    isValueValid: isPasswordValid,
    hasError: hasPasswordError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: resetPassword
  } = UseInput(validateName)

  let formIsValid = false
  if (isUsernameValid && isPasswordValid) {
    formIsValid = true
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    const truthUsernames = loadedUsernames.some(loadedUsername => loadedUsername.username === username)
    if (truthUsernames === true) { setIsCorrectUsername(true) }

    // check if any passwords matches db passwords
    const truthPasswords = loadedPasswords.some(loadedPassword => loadedPassword.password === password)
    if (truthPasswords === true) { setIsCorrectPassword(true) }
    
    if (!isUsernameValid && !isPasswordValid) return

    let successLogin = isCorrectPassword && isCorrectUsername

    //tu je bug, moram stisnuti dva puta gumb da posalje true state
    onLoginSucces(successLogin) 

    // resetUsername()
    // resetPassword()
  }
  
  useEffect(() => {
    loadLoginCredentials().then(() => console.log('use effect running'))
  }, [])

  const loadLoginCredentials = async () => {
    try {
      const passwordResponse = await fetch('https://apartments-app-6a66f-default-rtdb.firebaseio.com/passwords.json')
      const passwordsResponseData = await passwordResponse.json()

      const usernameResponse = await fetch('https://apartments-app-6a66f-default-rtdb.firebaseio.com/usernames.json')
      const usernamesResponseData = await usernameResponse.json()

      for (const key in passwordsResponseData) {
        setLoadedPasswords(prev => [...prev, {
          id: key,
          password: passwordsResponseData[key].password
        }])
      }

      for (const key in usernamesResponseData) {
        setLoadedUsernames(prev => [...prev, {
          id: key,
          username: usernamesResponseData[key].username
        }])
      }

      // // check if any usernames matches db usernames
      // const truthUsernames = loadedUsernames.some(loadedUsername => loadedUsername.username === username)
      // if (truthUsernames === true) { setIsCorrectUsername(true) }

      // // check if any passwords matches db passwords
      // const truthPasswords = loadedPasswords.some(loadedPassword => loadedPassword.password === password)
      // if (truthPasswords === true) { setIsCorrectPassword(true) }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-2 mb-4 border-2 border-black bg-teal-100">
      <form onSubmit={submitHandler} className="flex flex-row gap-4 ">
        <input value={username} onChange={usernameChangeHandler} onBlur={usernameBlurHandler} type="text" placeholder="Enter username..." />
        { hasUsernameError && <p>Username incorect!</p>}
        <input value={password} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} type="text" placeholder="Enter password..." />
        { hasPasswordError && <p>Password is incorect!</p>}
        <button>Submit</button>
      </form>
      <div style={{ border: '1px solid black', backgroundColor: `${isCorrectPassword && isCorrectUsername ? 'green' : 'red'}` }}>
        { isCorrectPassword && isCorrectUsername ? 'Password and username are correct!' : ''}
        { !isCorrectPassword && !isCorrectUsername ? 'Enter the credentials' : ''}
        { isCorrectPassword && !isCorrectUsername ? 'Password is correct and username is not!' : ''}
        { !isCorrectPassword && isCorrectUsername ? 'Username is correct and password is not!' : ''}
      </div>
    </div>
  )
}

const UseInput = (validateValue) => {
  const [value, setValue] = useState('')
  const [isTouched, setIsTouched] = useState('')

  const isValueValid = validateValue(value)
  const isInputInvalid = !isValueValid && isTouched

  const valueChangeHandler = e => setValue(e.target.value)
  const valueBlurHandler = () => setIsTouched(true)
  const reset = () => {
    setValue('')
    setIsTouched(false)
  }

  return {
    value,
    isValueValid,
    hasError: isInputInvalid,
    valueChangeHandler,
    valueBlurHandler,
    reset
  }
}

//spreman za real app, smao kopiraj u Navbar komponentu! 
const Navbar = ({ onLogout }) => {
  const [isRotatedButton, setIsRotatedButton] = useState(false)
  const toggleButtonRotation = () => setIsRotatedButton(prev => !prev)
  
  return (
    <div className="font-poppins">
      <nav className='font-poppins flex flex-row items-center justify-between bg-[#374151] p-6'>
        <div className='flex flex-row justify-between flex-1'>
          <Link to='/main'>
            <h1 className='italic text-4xl font-medium text-[#f6f7f9]'>Apartmenify</h1>
          </Link>
          <button 
            onClick={toggleButtonRotation} 
            className={`${isRotatedButton ? 'rotate-45' : 'rotate-0'} sm:hidden duration-300 flex items-center justify-center origin-center`}>
            <span className={styles.firstLine}></span>
            <span className={styles.secondLine}></span>
          </button>
          <ul className={`hidden list-none sm:flex flex-row items-center justify-between gap-6 lg:gap-16 ss:text-md md:text-lg text-[#f6f7f9]`}>
            {navListItems.map(item =>
              <li className="hover:border-b-[1px] border-[#149eca] " key={item.id}>
                <Link to={`/main${item.link}`}>{item.name}</Link>
              </li>
            )}
          </ul>
        <button
          className='hidden sm:flex px-10 py-2 rounded-2xl font-semibold ss-text-md md:text-lg text-[#f6f7f9] bg-[#149eca] hover:bg-[#128eb7]'
        >
          <Link onClick={onLogout} to='/login'>Logout</Link>
        </button>
        </div>
        
      </nav>
      
      { isRotatedButton && <div className=" overflow-hidden flex-1 flex flex-col items-center z-50 h-screen w-[100%] sm:hidden top-0 bottom-0 left-0 bg-slate-800 backdrop-blur">
        {navListItems.map(item => 
          <button key={item.id} className="hover:bg-[#149eca] py-6 text-center duration-100 w-full">
            <Link to={`/main${item.link}`} className="text-2xl text-white">{item.name}</Link>
            
          </button>  
        )}
        <button className="bg-[#374151] hover:bg-[#149eca] py-6 text-center duration-100 w-full text-2xl text-white">
          <Link to='/login'>Logout</Link>
        </button>
      </div>}
    </div>
  )
}

const Main = () => {
  
const arrowDown = {
  width: 0,
  height: 0, 
  borderLeft: '25px solid transparent',
  borderRight: '25px solid transparent',
  borderTop: '25px solid black',
  backgroundColor: 'red'
}
  return (
    <div className='flex flex-col gap-16 justify-center pt-36 px-36'>
      <h1 className='border-b-[#374151] border-b-[1px] pb-4 italic text-4xl font-normal text-[#f6f7f9] text-left'>Apartments</h1>
      <table className='bg-[#384252] text-[#f6f7f9] rounded-md'>
        <thead>
            <tr className='border-b-[#23272f] border-b-[1px]'>
            <th className='py-6 px-6 bg-[#149eca]'>#</th>
            <th className='py-4 px-6'>Status</th>
            <th className='py-4 px-6'>Reserved By</th>
            <th className='py-4 px-6'>Title</th>
            <th className='py-4 px-6'>City</th>
            <th className='py-4 px-6'>Rooms</th>
            <th className='py-4 px-6'>Price</th>
            <th className='py-4 px-6'>Image</th>
            <th className='py-4 px-6'></th>
            </tr>
        </thead>
        <tbody>
            
            <tr className='border-b-[#23272f] border-b-[1px] hover:bg-[#4c5a70] duration-100'>
                <td className='py-4 px-6'>1</td>
                <td className='py-4 px-6'>Free</td>
                <td className='py-4 px-6'>Marin Zrvnar</td>
                <td className='py-4 px-6'>Sunny Apartments</td>
                <td className='py-4 px-6'>Karlovac</td>
                <td className='py-4 px-6'>4</td>
                <td className='py-4 px-6'>35e</td>
                <td className='py-4 px-6'>
                <img
                    className='hover:scale-[600%] duration-200'
                    width='30'
                    height='30'
                    src='https://www.phillyaptrentals.com/wp-content/uploads/2020/12/apartment-building-what-makes-good-apartment-building-scaled.jpg' />
                </td>
                <td>
                <button
                    className='px-6 py-1 rounded-2xl font-semibold text-md text-[#f6f7f9] flex items-center justify-center'
                >
                    <img height="200" width="20" src={DownArrow} alt="Down arrow icon" />
                </button>
                </td>
            </tr>
        </tbody>
    </table>
      {/* { isLoading && <LoadingSpinnerSection /> } */}
      {/* { !isLoading && <div className='flex items-center justify-end'>
         <button
        onClick={onModalOpen}
        className='px-10 py-2 rounded-2xl font-semibold text-xl text-[#f6f7f9] bg-[#149eca]'
      >
        <Link to="/main/apartments/addNewApartment">+ Add</Link>
      </button>
      </div> } */}
      {/* { !isLoading && apartments.length === 0 &&
      <div className='flex items-center justify-center'>
        <p className='italic text-4xl font-normal text-[#f6f7f9] text-left'>Found no apartments</p>
      </div>}
      { !isLoading && error && <p>{error}</p> }
      { isModalOpen && <AddNewApartment onFetchApartments={fetchApartments} onModalClose={onModalClose} />} */}
    </div>
  )
}

// napravi ispod 768 (sm screen size) da je prikazano kao na tom istom screen sizeu na heliswapu, a od sm na gore screen sizea kako si i prtije