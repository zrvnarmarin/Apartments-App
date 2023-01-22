import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import AddNewApartment from './AddNewApartment'
import ApartmentsTable from './ApartmentsTable';
import ArrowDown from '../../assets/DownArrow.svg'
import loadingSpinner from '../../assets/LoadingSpinner.svg'
import LoadingSpinnerSection from './LoadingSpinnerSection';

const Apartments = ({ isModalOpen, onModalOpen, onModalClose }) => {
  const [apartments, setApartments] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchApartments = useCallback (async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.get('https://apartments-app-6a66f-default-rtdb.firebaseio.com/apartments.json')
    
      // if (!response.ok)  throw new Error('Something went wrong..') 

      const data = await response.data

      const loadedApartments = []

      for (let key in data) {
        loadedApartments.push({
          id: key,
          status: data[key].status,
          reservedBy: data[key].reservedBy,
          title: data[key].title,
          city: data[key].city,
          rooms: data[key].rooms,
          price: data[key].price
        })
      }

      setApartments(loadedApartments)
      setIsLoading(false)
    } catch (error) { 
      setError(error.message) 
    }

  })

  useEffect(() => {
    fetchApartments()
  }, [])

  return (
    <div className='flex flex-col gap-16 justify-center pt-36 px-36'>
      <h1 className='border-b-[#374151] border-b-[1px] pb-4 italic text-4xl font-normal text-[#f6f7f9] text-left'>Apartments</h1>
      { !isLoading && apartments.length > 0 && <ApartmentsTable apartments={apartments} /> }
      { isLoading && <LoadingSpinnerSection /> }
      { !isLoading && <div className='flex items-center justify-end'>
         <button
        onClick={onModalOpen}
        className='px-10 py-2 rounded-2xl font-semibold text-xl text-[#f6f7f9] bg-[#149eca]'
      >
        <Link to="/main/apartments/addNewApartment">+ Add</Link>
      </button>
      </div> }
      { !isLoading && apartments.length === 0 &&
      <div className='flex items-center justify-center'>
        <p className='italic text-4xl font-normal text-[#f6f7f9] text-left'>Found no apartments</p>
      </div>}
      { !isLoading && error && <p>{error}</p> }
      { isModalOpen && <AddNewApartment onFetchApartments={fetchApartments} onModalClose={onModalClose} />}
    </div>
  )
}

export default Apartments