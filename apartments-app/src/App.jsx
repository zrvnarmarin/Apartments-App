import One from "./components/One"
import Four from "./components/Four"
import ThemeProvider from "./store/Theme/ThemeProvider"
import Header from "./components/Header"

const App = () => {

  return (
    <ThemeProvider>
      <div className="bg-red-400 flex flex-col gap-4 m-4 p-2">
        <Header />
        <One />
        <Four />
      </div>
    </ThemeProvider>
  )
}

export default App;
