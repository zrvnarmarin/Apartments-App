import React from 'react'
import Two from './Two'
import Three from './Three'
import { useContext } from 'react'
import ThemeContext from '../store/Theme/themeContext'

const One = () => {
  const themeContext = useContext(ThemeContext)
  const theme = themeContext.theme

  return (
    <div style={{ backgroundColor: `${theme}`}} className='border-2 border-black p-2 flex flex-col gap-4 bg-green-400'>
        One
        {themeContext.theme}
        <Two />
        <Three />
    </div>
  )
}

export default One