import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { navListItems } from '../../data/navListItems'
import navbarStyles from '../../styles/navbar.module.css'

const Navbar = ({ onLogout }) => {
  const [isRotatedButton, setIsRotatedButton] = useState(false)
  const toggleButtonRotation = () => setIsRotatedButton(prev => !prev)
  
  return (
    <div className="font-poppins">
      <nav className='font-poppins flex flex-row items-center justify-between bg-[#24245a] p-6'>
        <div className='flex flex-row justify-between flex-1'>
          <Link to='/main'>
            <h1 className='italic text-4xl font-medium text-[#f6f7f9]'>Apartmenify</h1>
          </Link>
          <button 
            onClick={toggleButtonRotation} 
            className={`${isRotatedButton ? 'rotate-45' : 'rotate-0'} sm:hidden duration-300 flex items-center justify-center origin-center`}>
            <span className={navbarStyles.firstLine}></span>
            <span className={navbarStyles.secondLine}></span>
          </button>
          <ul className={`hidden list-none sm:flex flex-row items-center justify-between gap-6 lg:gap-16 ss:text-md md:text-lg text-[#f6f7f9]`}>
            {navListItems.map(item =>
              <li className="hover:border-b-[1px] border-white " key={item.id}>
                <Link to={`/main${item.link}`}>{item.name}</Link>
              </li>
            )}
          </ul>
        <button
          className='hidden sm:flex px-10 py-2 rounded-2xl font-semibold ss-text-md md:text-lg text-[#f6f7f9] bg-[#68106d] hover:bg-[#741379]'
        >
          <Link onClick={onLogout} to='/login'>Logout</Link>
        </button>
        </div>
        
      </nav>
      
      { isRotatedButton && <div className=" overflow-hidden flex-1 flex flex-col items-center z-50 h-screen w-[100%] sm:hidden top-0 bottom-0 left-0 bg-[#080c24] backdrop-blur">
        {navListItems.map(item => 
          <button key={item.id} className="hover:bg-[#68106d] py-6 text-center duration-100 w-full">
            <Link to={`/main${item.link}`} className="text-2xl text-white">{item.name}</Link>
            
          </button>  
        )}
        <button className="bg-[#24245a] hover:bg-[#68106d] py-6 text-center duration-100 w-full text-2xl text-white">
          <Link to='/login'>Logout</Link>
        </button>
      </div>}
    </div>
  )
}

export default Navbar