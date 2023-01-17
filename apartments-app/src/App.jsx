import One from "./components/One"
import Four from "./components/Four"
import ThemeProvider from "./store/Theme/ThemeProvider"
import Header from "./components/Header"
import LoginPage from "./components/Login/LoginPage"
import MainPage from "./components/Main/MainPage"

const App = () => {

  return (
    // <ThemeProvider>
    //   <div className="bg-red-400 flex flex-col gap-4 m-4 p-2">
    //     <Header />
    //     <One />
    //     <Four />
    //   </div>
    // </ThemeProvider>
    <>
      {/* <LoginPage /> */}
      <MainPage />
    </>
  )
}

export default App;
