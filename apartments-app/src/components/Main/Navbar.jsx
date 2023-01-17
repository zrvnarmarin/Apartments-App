import React from 'react'

const Navbar = () => {
  const navList = ['Apartments', 'Tags', 'Registered Users']

  return (
    <nav className='flex flex-row items-center justify-between bg-blue-50 p-6'>
        <div className='flex flex-row items-center justify-between gap-32'>
            <h1 className='italic text-4xl font-medium'>Apartmenify</h1>
            <ul className='list-none flex flex-row items-center justify-between gap-16'>
                {navList.map(item =>
                    <li key={item}>{item}</li>
                )}
            </ul>
        </div>
        <button className='px-10 py-2 rounded-2xl font-semibold text-xl bg-blue-200'>Logout</button>
    </nav>
  )
}

export default Navbar