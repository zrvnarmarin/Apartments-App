import React, { useContext } from 'react'
import Five from './Five'
import ThemeContext from '../store/Theme/themeContext'

const Four = () => {
  const themeContext = useContext(ThemeContext)
  const theme = themeContext.theme

  return (
    <div 
      style={{ backgroundColor: `${theme}`}} 
      className='border-2 border-black p-2 bg-blue-400'
    >
      <p>Four</p>
      <Five />
    </div>
  )
}

export default Four