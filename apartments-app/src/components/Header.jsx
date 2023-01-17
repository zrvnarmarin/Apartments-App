import React from 'react';
import ThemeContext from '../store/Theme/themeContext';
import { useContext } from 'react';
import { useState } from 'react';

const Header = () => {
    const themeContext = useContext(ThemeContext)
    const theme = themeContext.theme
    const [isDarkThemeActivated, setIsDarkThemeActivated] = useState(false)
  
    const toggleDarkTheme = () => {
      setIsDarkThemeActivated(prev => !prev)
      themeContext.isDarkThemeActivated(isDarkThemeActivated)
    }

  return (
    <header className='bg-green-400 p-2 border-2 border-black flex flex-row items-center justify-around'>
        <h1 className='font-bold text-2xl uppercase'>Header</h1>
        <button 
            onClick={toggleDarkTheme}
            className='bg-black text-white text-2xl font-semibold px-6 py-2 rounded-xl'
        >
            Switch Theme
        </button>
    </header>
  )
}

export default Header;
