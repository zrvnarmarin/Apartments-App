import React from 'react'
import { Link } from 'react-router-dom'
import { navListItems } from '../../data/navListItems'

const Navbar = ({ onLogout }) => {
 
  return (
    <nav className='flex flex-row items-center justify-between bg-blue-50 p-6'>
      <div className='flex flex-row items-center justify-between gap-32'>
        <Link to='/main'>
          <h1 className='italic text-4xl font-medium'>Apartmenify</h1>
        </Link>
          <ul className='list-none flex flex-row items-center justify-between gap-16'>
            {navListItems.map(item =>
              <li key={item.id}>
                <Link to={`/main${item.link}`}>{item.name}</Link>
              </li>
            )}
          </ul>
      </div>
      <button
        onClick={onLogout} 
        className='px-10 py-2 rounded-2xl font-semibold text-xl bg-blue-200'
      >
        <Link to='/login'>Logout</Link>
      </button>
    </nav>
  )
}

export default Navbar