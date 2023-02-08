import React from 'react'
import { Link } from 'react-router-dom'

const AddApartmentSection = () => {
  return (
    <button className='px-10 py-2 rounded-2xl font-semibold text-xl text-[#f6f7f9] bg-[#68106d]'>
        <Link to="/main/addNewApartment">+ Add</Link>
    </button>
  )
}

export default AddApartmentSection