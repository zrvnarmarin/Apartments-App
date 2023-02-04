// import One from "./components/One"
// import Four from "./components/Four"
// import ThemeProvider from "./store/Theme/ThemeProvider"
// import Header from "./components/Header"
import LoginPage from "./components/Login/LoginPage"
import MainPage from "./components/Main/MainPage"
import FrontPage from "./components/Front/FrontPage"
import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import Apartments from "./components/Main/Apartments"
import Tags from "./components/Main/Tags"
import ErrorPage from './components/Error/ErrorPage.jsx'
import RegisteredUsers from "./components/Main/RegisteredUsers"
import AddNewApartment from "./components/Main/AddNewApartment"

const App = () => {
  const [isLoginOpened, setIsLoginOpened] = useState(false)
  const [isMainOpened, setIsMainOpened] = useState(false)
  const [isNewApartmentModalOpen, setIsNewApartmentModalOpen] = useState(false)
  const openLoginPage = () => setIsLoginOpened(true)
  const openMainPage = () => setIsMainOpened(true)
  const openNewApartmentModal = () => setIsNewApartmentModalOpen(true)
  const closeNewApartmentModal = () => setIsNewApartmentModalOpen(false)

  return (
    // <ThemeProvider>
    //   <div className="bg-red-400 flex flex-col gap-4 m-4 p-2">
    //     <Header />
    //     <One />
    //     <Four />
    //   </div>
    // </ThemeProvider>

    <div>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<FrontPage onOpenLogin={openLoginPage} />} />
        <Route path="/login" element={<LoginPage onOpenMain={openMainPage} />} /> 
        <Route path="/main" element={<MainPage />}>
          <Route path="apartments" element={<Apartments isModalOpen={isNewApartmentModalOpen} onModalClose={closeNewApartmentModal} onModalOpen={openNewApartmentModal} />} >
            <Route path=":id" element={<AddNewApartment />} />
          </Route>
          <Route path="tags" element={<Tags />} />
          <Route path="registeredUsers" element={<RegisteredUsers />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;

// import React, { useState, useEffect } from "react";
// import axios from 'axios'
// import { validateName } from './utils/utilityFunctions'
// import { navListItems } from "./data/navListItems";
// import { Link } from 'react-router-dom'
// import styles from './styles/navbar.module.css'
// import DownArrow from './assets/DownArrow.svg'
// import FreeStatusIcon from './assets/FreeStatusIcon.png'

// const App = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [isLoginSuccessfull, setIsLoginSuccessfull] = useState(null)

//   const displayLogin = (loginInfo) => setIsLoginSuccessfull(loginInfo)

//   const setNewTask = task => setTasks(prev => [...prev, task])

//   const deleteTask = async id => {
//     const response = await axios.delete(`https://apartments-app-6a66f-default-rtdb.firebaseio.com/tasks/${id}.json`)

//     setTasks(tasks.filter(task => task.id !== id))
//   }

//   const getTasks = async () => {
//     setIsLoading(true)
//     setError(null)

//     try {
//       const response = await fetch('https://apartments-app-6a66f-default-rtdb.firebaseio.com/tasks.json')
//       if (!response.ok) throw new Error('Request failed!');
//       const passwordsResponseData = await response.json()

//       const loadedTasks = []

//       for (const key in passwordsResponseData) {
//         loadedTasks.push({
//           id: key,
//           text: passwordsResponseData[key].text
//         })
//       }

//       setTasks(loadedTasks)

//     } catch (err) {
//       setError(err.message || 'Something went wrong!');
//     }

//     setIsLoading(false)
//   }

//   useEffect(() => {
//     getTasks()
//   }, [])

//   return (
//     <div>
//       <LoginForm onLoginSucces={displayLogin} /> otkomentiraj ovo za test funkcionalnosti 
//       { isLoginSuccessfull && <>
//         <NewTask onSetNewTask={setNewTask} />
//         { isLoading && <p>Tasks are loading...</p>}
//         { error && <button onClick={getTasks}>{error} Try again!</button> }
//         { !isLoading && tasks.length === 0 && <p>There is no tasks! Add some!</p>}
//         {tasks.map((task, i) =>
//           <Task
//             key={task.id}
//             index={i}
//             id={task.id}
//             text={task.text}
//             onTaskDelete={deleteTask}
//           />
//         )}
//       </>}
//       {/* <Navbar />
//       <Main /> */}
//     </div>
//   )
// }

// export default App;

// const Task = ({ id, text, onTaskDelete, index }) => {
//   const [isFullOpened, setIsFullOpened] = useState(false)

//   return (
//     <div className='border-2 border-black'>
//       <p>ID: {id}</p>
//       <p>TEXT: {text}</p>
//       <p>#{index}</p>
//       <button onClick={() => onTaskDelete(id)} className="p-2 bg-indigo-100">Delete</button>
//       <button onClick={() => setIsFullOpened(prev => !prev)}>Show</button>
//       { isFullOpened &&
//         <div className="bg-red-400 border-2 border-black"><p>{text}</p></div>
//       }
//     </div>  
//   )
// }

// const NewTask = ({ onSetNewTask }) => {
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [enteredTask, setEnteredTask] = useState('')

//   const enteredTaskChangeHandler = e => setEnteredTask(e.target.value)

//   const addTask = async (enteredTask) => {
//     setIsLoading(true)
//     setError(null)

//     try {
//       const response = await fetch('https://apartments-app-6a66f-default-rtdb.firebaseio.com/tasks.json', {
//         method: 'POST',
//         body: JSON.stringify({ text: enteredTask }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })

//       const passwordsResponseData = await response.json()
      
//       const firebaseId = passwordsResponseData.name
//       onSetNewTask({ id: firebaseId, text: enteredTask })
      
//     } catch (error) {
//       setError(error)
//     }

//     setIsLoading(false)
//   }

//   const submitFormHandler = e => {
//     e.preventDefault()

//     if (enteredTask.length > 0) addTask(enteredTask)

//     setEnteredTask('')
//   }

//   if (error) return <p>{error}</p>

//   return (
//     <form onSubmit={submitFormHandler}>
//       <input value={enteredTask} onChange={enteredTaskChangeHandler} type="text" placeholder="Enter new task..." />
//       <button className="p-2 bg-green-100">{ isLoading ? <p>Sending...</p> : <p>Submit task</p>}</button>
//     </form>
//   )
// }

// const LoginForm = ({ onLoginSucces }) => {
//   const [isCorrectUsername, setIsCorrectUsername] = useState(false)
//   const [isCorrectPassword, setIsCorrectPassword] = useState(false)

//   const [loadedUsernames, setLoadedUsernames] = useState([])
//   const [loadedPasswords, setLoadedPasswords] = useState([])

//   const { 
//     value: username,
//     isValueValid: isUsernameValid,
//     hasError: hasUsernameError,
//     valueChangeHandler: usernameChangeHandler,
//     valueBlurHandler: usernameBlurHandler,
//     reset: resetUsername
//   } = UseInput(validateName)

//   const { 
//     value: password,
//     isValueValid: isPasswordValid,
//     hasError: hasPasswordError,
//     valueChangeHandler: passwordChangeHandler,
//     valueBlurHandler: passwordBlurHandler,
//     reset: resetPassword
//   } = UseInput(validateName)

//   let formIsValid = false
//   if (isUsernameValid && isPasswordValid) {
//     formIsValid = true
//   }

//   const submitHandler = async (e) => {
//     e.preventDefault()

//     const truthUsernames = loadedUsernames.some(loadedUsername => loadedUsername.username === username)
//     if (truthUsernames === true) { setIsCorrectUsername(true) }

//     // check if any passwords matches db passwords
//     const truthPasswords = loadedPasswords.some(loadedPassword => loadedPassword.password === password)
//     if (truthPasswords === true) { setIsCorrectPassword(true) }
    
//     if (!isUsernameValid && !isPasswordValid) return

//     let successLogin = isCorrectPassword && isCorrectUsername

//     //tu je bug, moram stisnuti dva puta gumb da posalje true state
//     onLoginSucces(successLogin) 

//     // resetUsername()
//     // resetPassword()
//   }
  
//   useEffect(() => {
//     loadLoginCredentials().then(() => console.log('use effect running'))
//   }, [])

//   const loadLoginCredentials = async () => {
//     try {
//       const passwordResponse = await fetch('https://apartments-app-6a66f-default-rtdb.firebaseio.com/passwords.json')
//       const passwordsResponseData = await passwordResponse.json()

//       const usernameResponse = await fetch('https://apartments-app-6a66f-default-rtdb.firebaseio.com/usernames.json')
//       const usernamesResponseData = await usernameResponse.json()

//       for (const key in passwordsResponseData) {
//         setLoadedPasswords(prev => [...prev, {
//           id: key,
//           password: passwordsResponseData[key].password
//         }])
//       }

//       for (const key in usernamesResponseData) {
//         setLoadedUsernames(prev => [...prev, {
//           id: key,
//           username: usernamesResponseData[key].username
//         }])
//       }

//       // // check if any usernames matches db usernames
//       // const truthUsernames = loadedUsernames.some(loadedUsername => loadedUsername.username === username)
//       // if (truthUsernames === true) { setIsCorrectUsername(true) }

//       // // check if any passwords matches db passwords
//       // const truthPasswords = loadedPasswords.some(loadedPassword => loadedPassword.password === password)
//       // if (truthPasswords === true) { setIsCorrectPassword(true) }

//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <div className="p-2 mb-4 border-2 border-black bg-teal-100">
//       <form onSubmit={submitHandler} className="flex flex-row gap-4 ">
//         <input value={username} onChange={usernameChangeHandler} onBlur={usernameBlurHandler} type="text" placeholder="Enter username..." />
//         { hasUsernameError && <p>Username incorect!</p>}
//         <input value={password} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} type="text" placeholder="Enter password..." />
//         { hasPasswordError && <p>Password is incorect!</p>}
//         <button>Submit</button>
//       </form>
//       <div style={{ border: '1px solid black', backgroundColor: `${isCorrectPassword && isCorrectUsername ? 'green' : 'red'}` }}>
//         { isCorrectPassword && isCorrectUsername ? 'Password and username are correct!' : ''}
//         { !isCorrectPassword && !isCorrectUsername ? 'Enter the credentials' : ''}
//         { isCorrectPassword && !isCorrectUsername ? 'Password is correct and username is not!' : ''}
//         { !isCorrectPassword && isCorrectUsername ? 'Username is correct and password is not!' : ''}
//       </div>
//     </div>
//   )
// }

// const UseInput = (validateValue) => {
//   const [value, setValue] = useState('')
//   const [isTouched, setIsTouched] = useState('')

//   const isValueValid = validateValue(value)
//   const isInputInvalid = !isValueValid && isTouched

//   const valueChangeHandler = e => setValue(e.target.value)
//   const valueBlurHandler = () => setIsTouched(true)
//   const reset = () => {
//     setValue('')
//     setIsTouched(false)
//   }

//   return {
//     value,
//     isValueValid,
//     hasError: isInputInvalid,
//     valueChangeHandler,
//     valueBlurHandler,
//     reset
//   }
// }

// //spreman za real app, smao kopiraj u Navbar komponentu! 
// const Navbar = ({ onLogout }) => {
//   const [isRotatedButton, setIsRotatedButton] = useState(false)
//   const toggleButtonRotation = () => setIsRotatedButton(prev => !prev)
  
//   return (
//     <div className="font-poppins">
//       <nav className='font-poppins flex flex-row items-center justify-between bg-[#24245a] p-6'>
//         <div className='flex flex-row justify-between flex-1'>
//           <Link to='/main'>
//             <h1 className='italic text-4xl font-medium text-[#f6f7f9]'>Apartmenify</h1>
//           </Link>
//           <button 
//             onClick={toggleButtonRotation} 
//             className={`${isRotatedButton ? 'rotate-45' : 'rotate-0'} sm:hidden duration-300 flex items-center justify-center origin-center`}>
//             <span className={styles.firstLine}></span>
//             <span className={styles.secondLine}></span>
//           </button>
//           <ul className={`hidden list-none sm:flex flex-row items-center justify-between gap-6 lg:gap-16 ss:text-md md:text-lg text-[#f6f7f9]`}>
//             {navListItems.map(item =>
//               <li className="hover:border-b-[1px] border-white " key={item.id}>
//                 <Link to={`/main${item.link}`}>{item.name}</Link>
//               </li>
//             )}
//           </ul>
//         <button
//           className='hidden sm:flex px-10 py-2 rounded-2xl font-semibold ss-text-md md:text-lg text-[#f6f7f9] bg-[#68106d] hover:bg-[#741379]'
//         >
//           <Link onClick={onLogout} to='/login'>Logout</Link>
//         </button>
//         </div>
        
//       </nav>
      
//       { isRotatedButton && <div className=" overflow-hidden flex-1 flex flex-col items-center z-50 h-screen w-[100%] sm:hidden top-0 bottom-0 left-0 bg-[#080c24] backdrop-blur">
//         {navListItems.map(item => 
//           <button key={item.id} className="hover:bg-[#68106d] py-6 text-center duration-100 w-full">
//             <Link to={`/main${item.link}`} className="text-2xl text-white">{item.name}</Link>
            
//           </button>  
//         )}
//         <button className="bg-[#24245a] hover:bg-[#68106d] py-6 text-center duration-100 w-full text-2xl text-white">
//           <Link to='/login'>Logout</Link>
//         </button>
//       </div>}
//     </div>
//   )
// }

// spreman za real app, napravi od ovog komponente TableApartments i MobileTableApartments
const Main = () => {
  const [isRotatedButton, setIsRotatedButton] = useState(false)
  const toggleButtonRotation = () => setIsRotatedButton(prev => !prev)

  const apartments = [
    {id: 1, status: 'free', reservedBy: 'Marin', title: 'Sunny apartment', city: 'Karlovac', rooms: 4, price: 34, description: 'Beautiful appartment at the sea of Mediteranean', address: 'Splitska 45', numberOFDoubleBeds: 2, numberOfSingleBeds: 3, distanceFromTheSea: '1.5 km'},
    {id: 2, status: 'free', reservedBy: 'Marin', title: 'Sunny apartment', city: 'Karlovac', rooms: 4, price: 34, description: 'Beautiful appartment at the sea of Mediteranean', address: 'Splitska 45', numberOFDoubleBeds: 2, numberOfSingleBeds: 3, distanceFromTheSea: '1.5 km'},
    {id: 3, status: 'free', reservedBy: 'Marin', title: 'Sunny apartment', city: 'Karlovac', rooms: 4, price: 34, description: 'Beautiful appartment at the sea of Mediteranean', address: 'Splitska 45', numberOFDoubleBeds: 2, numberOfSingleBeds: 3, distanceFromTheSea: '1.5 km'},
    {id: 4, status: 'free', reservedBy: 'Marin', title: 'Sunny apartment', city: 'Karlovac', rooms: 4, price: 34, description: 'Beautiful appartment at the sea of Mediteranean', address: 'Splitska 45', numberOFDoubleBeds: 2, numberOfSingleBeds: 3, distanceFromTheSea: '1.5 km'},
  ]
  
  return (
    <div className="font-poppins text-white">
      <section className="flex gap-2 pt-36 px-4 sm:px-12 md:px-24 lg:px-32 xl:px-64 flex-col bg-[#080c24]">
      <h1 className='border-b-[#374151] border-b-[1px] pb-4 italic text-4xl font-normal text-[#f6f7f9] text-left'>Apartments</h1>
        {apartments.map((apartment, i) => 
          <div key={apartment.id} className="sm:hidden bg-[#19193f] hover:bg-[#24245a] flex flex-col gap-1 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="hidden sm:block bg-red-200">{i}</span>
              <img className="inline-block" width="20" src={FreeStatusIcon} />
              <span>{apartment.title}</span>
              <span>
                <img className="bg-white rounded-full" height="20" width="40" src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png" alt="" />
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>CITY:</span>
              <span>{apartment.city}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>ROOMS: </span>
              <span>{apartment.rooms}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>PRICE: </span>
              <span className="bg-[#68106d] px-4 py-1 rounded-md">{apartment.price} E</span>
            </div>
            { isRotatedButton && 
              <div className="flex flex-col gap-2 rounded-xl">
                <div className="flex items-center justify-between">
                  <span>DESCRIPTION: </span>
                  <span className="xs:overflow-x-auto">{apartment.description}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>ADDRESS:</span>
                  <span>{apartment.address}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>NUMBER OF DOUBLE BEDS: </span>
                  <span className="">{apartment.numberOFDoubleBeds}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>NUMBER OF SINGLE BEDS: </span>
                  <span className="">{apartment.numberOfSingleBeds}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>DISTANCE FROM THE SEA: </span>
                  <span className="bg-[#68106d] px-4 py-1 rounded-md">{apartment.distanceFromTheSea}</span>
                </div>
              </div>
            }
            <div className="flex items-center justify-center pt-4">
              <button 
                onClick={toggleButtonRotation}
                className={`${isRotatedButton ? 'rotate-180' : 'rotate-0'} sm:hidden duration-300`} 
              >
                <img width="20" src={DownArrow} alt="Arrow image" />
              </button>
            </div>
          </div>  
        )}
        
        


      <table className='bg-[#19193f] text-[#f6f7f9] rounded-md hidden sm:table'>
        <thead>
            <tr className='bg-[#24245a]  border-b-[#23272f] border-b-[1px]'>
              <th className='px-0 py-5 text-sm md:text-md lg:text-lg xl:text-xl'>#</th>
              <th className='px-0 py-5 text-sm md:text-md lg:text-lg xl:text-xl'>Status</th>
              <th className='px-0 py-5 text-sm md:text-md lg:text-lg xl:text-xl'>Reserved By</th>
              <th className='px-0 py-5 text-sm md:text-md lg:text-lg xl:text-xl'>City</th>
              <th className='px-0 py-5 text-sm md:text-md lg:text-lg xl:text-xl'>Rooms</th>
              <th className='px-0 py-5 text-sm md:text-md lg:text-lg xl:text-xl'>Price</th>
              <th className='px-0 py-5 text-sm md:text-md lg:text-lg xl:text-xl'>Image</th>
              <th className='px-0 py-5 text-sm md:text-md lg:text-lg xl:text-xl'></th>
            </tr>
        </thead>
        <tbody>
          {apartments.map(apartment =>
          <>
            <tr key={apartment.id} className='border-b-[#23272f] border-b-[1px] hover:bg-[#24245a]  duration-100'>
              <td className='text-center text-sm md:text-md lg:text-lg xl:text-xl'>{apartment.id}</td>
              <td className='text-center text-sm md:text-md lg:text-lg xl:text-xl'>
                <img className="inline-block" width="20" src={FreeStatusIcon} />
              </td>
              <td className='py-2 text-center text-sm md:text-md lg:text-lg xl:text-xl'>{apartment.reservedBy}</td>
              <td className='py-2 text-center text-sm md:text-md lg:text-lg xl:text-xl'>{apartment.city}</td>
              <td className='py-2 text-center text-sm md:text-md lg:text-lg xl:text-xl'>{apartment.rooms}</td>
              <td className='py-2 text-center text-sm md:text-md lg:text-lg xl:text-xl'>{apartment.price}</td>
              <td className='py-2 text-center text-sm md:text-md lg:text-lg xl:text-xl'>
              <img
                className='hover:scale-[600%] duration-200 inline-block'
                width='30'
                height='30'
                src='https://www.phillyaptrentals.com/wp-content/uploads/2020/12/apartment-building-what-makes-good-apartment-building-scaled.jpg' />
              </td>
                <td  className='text-center text-sm md:text-md lg:text-lg xl:text-xl'>
                  <button
                    className='px-6 py-1 rounded-2xl font-semibold text-md text-[#f6f7f9]'
                  >
                    <img className="text-center inline-block" height="20" width="20" src={DownArrow} alt="Down arrow icon" />
                  </button>
                </td>
            </tr>
            
          </>
          )}
        </tbody>
      </table>
  </section>
    </div>
)}