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

import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';

const AddMovie = ({ onAddMovie }) => {
  const [title, setTitle] = useState('')
  const [openingText, setOpeningText] = useState('')
  const [releaseDate, setReleaseDate] = useState('')

  const submitHandler = e => {
    e.preventDefault()

    const newMovie = {
      id: crypto.randomUUID(),
      title: title,
      openingText: openingText,
      releaseDate: releaseDate
    }

    onAddMovie(newMovie)
  }

  return (
    <form className="border-2 border-black flex flex-col gap-2 mb-10" onSubmit={submitHandler}>
      <input placeholder="title" className="border-black border-2 m-2" type="text" onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="opening Text" className="border-black border-2 m-2" type="text" onChange={(e) => setOpeningText(e.target.value)} />
      <input placeholder="release Date" className="border-black border-2 m-2" type="text" onChange={(e) => setReleaseDate(e.target.value)} />
      <button className="bg-green-300 rounded px-5 py-2 ">Submit</button>
    </form>
  )
}

const App = () => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const addMovieHandler = async (movie) => {
    const response = await axios.post('https://apartments-app-6a66f-default-rtdb.firebaseio.com/movies.json',
    movie).then(response => console.log(response))
  }

  const fetchMovies = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('https://apartments-app-6a66f-default-rtdb.firebaseio.com/movies.json')
      if (!response.ok) {
        throw new Error('Something went wrong..')
      }
      const data = await response.json()

      const loadedMovies = []
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }
      console.log(loadedMovies)

      setMovies(loadedMovies)
      setIsLoading(false)
    } 
    catch (error)  {setError(error.message) }
     
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  return (
    <div>
      <button onClick={fetchMovies}>Fetch movies </button>
      <button onClick={addMovieHandler}>Display movie in console</button>
      <AddMovie onAddMovie={addMovieHandler} />
      { isLoading && <p>Loading data...</p> }
      { !isLoading && movies.length === 0 && !error && <p>Found no movies</p>}
      { !isLoading && movies.length > 0 && movies.map(movie => 
        <div className="flex flex-col gap-4 border-2 border-black" key={movie.id}>
          <p>{movie.id}</p>
          <p>{movie.title}</p>
          <p>{movie.openingText}</p>
          <p>{movie.releaseDate}</p>
        </div>
      )}
      { !isLoading && error && <p>{error}</p> }
    </div>
  )
}

export default App;