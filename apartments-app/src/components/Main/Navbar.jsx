import React from 'react'
import { Link } from 'react-router-dom'
import { navListItems } from '../../data/navListItems'

const Navbar = ({ onLogout }) => {
 
  return (
    <nav className='flex flex-row items-center justify-between bg-[#374151] p-6'>
      <div className='flex flex-row items-center justify-between gap-32'>
        <Link to='/main'>
          <h1 className='italic text-4xl font-medium text-[#f6f7f9]'>Apartmenify</h1>
        </Link>
          <ul className='list-none flex flex-row items-center justify-between gap-16 text-[#f6f7f9]'>
            {navListItems.map(item =>
              <li key={item.id}>
                <Link to={`/main${item.link}`}>{item.name}</Link>
              </li>
            )}
          </ul>
      </div>
      <button
        onClick={onLogout} 
        className='px-10 py-2 rounded-2xl font-semibold text-xl text-[#f6f7f9] bg-[#149eca]'
      >
        <Link to='/login'>Logout</Link>
      </button>
    </nav>
  )
}

export default Navbar