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
import Facilities from "./components/Main/Facilities"
import ErrorPage from './components/Error/ErrorPage.jsx'
import RegisteredUsers from "./components/Main/RegisteredUsers"
import AddNewApartmentForm from "./components/Main/AddNewApartmentForm"

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
          </Route>
          <Route path="addNewApartment" element={<AddNewApartmentForm />} />
          <Route path="facilities" element={<Facilities />} />
          <Route path="registeredUsers" element={<RegisteredUsers />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;