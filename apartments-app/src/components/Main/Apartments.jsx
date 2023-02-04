import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import AddNewApartment from './AddNewApartment'
import ApartmentsTable from './ApartmentsTable';
import LoadingSpinnerSection from './LoadingSpinnerSection';
import UseHttpRequest from '../../hooks/UseHttpRequest';
import FreeStatusIcon from '../../assets/FreeStatusIcon.png'
import DownArrow from '../../assets/DownArrow.svg'
import Apartment from './Apartment';
import ApartmentTableHeader from './ApartmentTableHeader';

const Apartments = ({ isModalOpen, onModalOpen, onModalClose }) => {
  const [apartments, setApartments] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false)
  const toggleMoreInfoSection = () => setIsMoreInfoOpen(prev => !prev)

  const setNewApartment = apartment => setApartments(prev => [...prev, apartment])

  const deleteApartment = async id => {
    const response = await axios.delete(`https://apartments-app-6a66f-default-rtdb.firebaseio.com/apartments/${id}.json`)
    
    setApartments(apartments.filter(apartment => apartment.id !== id))
  }

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
    } catch (error) { 
      setError(error.message) 
    }
    setIsLoading(false)
  })

  useEffect(() => {
    fetchApartments()
  }, [])

  return (
    <div className='flex flex-col text-white font-poppins justify-center px-4 pt-36 md:px-36'>
      <h1 className='border-b-[#374151] border-b-[1px] pb-4 italic text-4xl font-normal text-[#f6f7f9] text-left'>Apartments</h1>
      {/* { !isLoading && apartments.length > 0 && <ApartmentsTable apartments={apartments} /> } */}
      { isLoading && <LoadingSpinnerSection /> }
      { !isLoading && <div className='flex items-center justify-end my-10'>
         <button
        onClick={onModalOpen}
        className='px-10 py-2 rounded-2xl font-semibold text-xl text-[#f6f7f9] bg-[#68106d]'
      >
        <Link to="/main/addNewApartment">+ Add</Link>
      </button>
      </div> }
      { !isLoading && apartments.length === 0 &&
      <div className='flex items-center justify-center'>
        <p className='italic text-4xl font-normal text-[#f6f7f9] text-left'>Found no apartments</p>
      </div>}
      { !isLoading && error && <p>{error}</p> }
      {/* { isModalOpen && <AddNewApartment onSetNewApartment={setNewApartment} onFetchApartments={fetchApartments} onModalClose={onModalClose} />} */}

       { /* tablica apartmana */}
      <div className=' grid grid-cols-7 bg-[#19193f] text-[#f6f7f9] rounded-md '>
        <ApartmentTableHeader />
        
        </div>
        { apartments.map((apartment, index) => 
          <div key={apartment.id} className='grid grid-cols-7 col-span-7 hover:bg-[#24245a]  duration-100 '>
            <Apartment 
              index={index + 1}
              id={apartment.id} 
              status={apartment.status} 
              city={apartment.city} 
              rooms={apartment.rooms} 
              price={apartment.price} 
              onDeleteApartment={deleteApartment}
            />
          </div>
        )}

    </div>
  )
}

export default Apartments;

