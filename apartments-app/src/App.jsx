import One from "./components/One"
import Four from "./components/Four"
import ThemeProvider from "./store/Theme/ThemeProvider"
import Header from "./components/Header"
import LoginPage from "./components/Login/LoginPage"
import MainPage from "./components/Main/MainPage"
import { useState } from "react"

const App = () => {
  const [isUserLogged, setIsUserLogged] = useState(false)
  const toggleLogging = () => setIsUserLogged(prev => !isUserLogged)

  return (
    // <ThemeProvider>
    //   <div className="bg-red-400 flex flex-col gap-4 m-4 p-2">
    //     <Header />
    //     <One />
    //     <Four />
    //   </div>
    // </ThemeProvider>
    <>
    <button onClick={toggleLogging} className="px-10 py-2 rounded-xl text-lg bg-red-900 text-white">Switch Login and Main</button>
      { !isUserLogged && <LoginPage />}
      { isUserLogged && <MainPage /> }
    </>
  )
}

export default App;
