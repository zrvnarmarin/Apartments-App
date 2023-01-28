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

import React, { useState, useEffect, useCallback, useRef } from "react";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  const setNewTask = task => setTasks(prev => [...prev, task])

  const getTasks = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('https://apartments-app-6a66f-default-rtdb.firebaseio.com/tasks.json')
      if (!response.ok) throw new Error('Request failed!');
      const responseData = await response.json()

      const loadedTasks = []

      for (const key in responseData) {
        loadedTasks.push({
          id: key,
          text: responseData[key].text
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
      <NewTask onSetNewTask={setNewTask} />
      { isLoading && <p>Tasks are loading...</p>}
      { error && <button onClick={getTasks}>{error} Try again!</button> }
      { tasks.length === 0 && <p>There is no tasks! Add some!</p>}
      {tasks.map((task, i) => 
        <div key={i} className='border-2 border-black'>
          <p>{task.id}</p>
          <p>{task.text}</p>
        </div>  
      )}
    </div>
  )
}

export default App;

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

      const responseData = await response.json()
      
      const firebaseId = responseData.name
      onSetNewTask({ id: firebaseId, text: enteredTask })
      
    } catch (error) {
      setError(error)
    }

    setIsLoading(false)
  }

  const submitFormHandler = e => {
    e.preventDefault()

    if (enteredTask.length > 0) addTask(enteredTask)
  }

  if (error) return <p>{error}</p>

  return (
    <form onSubmit={submitFormHandler}>
      <input value={enteredTask} onChange={enteredTaskChangeHandler} type="text" placeholder="Enter new task..." />
      <button>{ isLoading ? <p>Sending...</p> : <p>Submit task</p>}</button>
    </form>
  )
}