import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import LoadingSpinnerSection from './LoadingSpinnerSection';
import Apartment from './Apartment';
import ApartmentTableHeader from './ApartmentTableHeader';
import FreeStatusIcon from '../../assets/FreeStatusIcon.png'
import DownArrow from '../../assets/DownArrow.svg'

const Apartments = ({ isModalOpen, onModalOpen, onModalClose }) => {
  const [apartments, setApartments] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const [isRotatedButton, setIsRotatedButton] = useState(false)
  const toggleButtonRotation = () => setIsRotatedButton(prev => !prev)


  const setNewApartment = apartment => setApartments(prev => [...prev, apartment])

  const deleteApartment = async id => {
    await axios.delete(`https://apartments-app-6a66f-default-rtdb.firebaseio.com/apartments/${id}.json`)
    
    setApartments(apartments.filter(apartment => apartment.id !== id))
  }

  const fetchApartments = useCallback (async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.get('https://apartments-app-6a66f-default-rtdb.firebaseio.com/apartments.json')
    
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
      { isLoading && <LoadingSpinnerSection /> }
      { !isLoading && 
        <div className='flex items-center justify-end my-10'>
          <button
            onClick={onModalOpen}
            className='px-10 py-2 rounded-2xl font-semibold text-xl text-[#f6f7f9] bg-[#68106d]'
          >
            <Link to="/main/addNewApartment">+ Add</Link>
          </button>
        </div> 
      }
      { !isLoading && apartments.length === 0 &&
        <div className='flex items-center justify-center'>
          <p className='italic text-4xl font-normal text-[#f6f7f9] text-left'>Found no apartments</p>
        </div>
      }

      { !isLoading && error && <p>{error}</p> }

       { /* tablica apartmana */}
      <div className='hidden sm:block'>
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


      <div>
        {<div key={'marin'} className="sm:hidden bg-[#19193f] hover:bg-[#24245a] text-xs ss:text-sm flex flex-col gap-2 rounded-xl p-4">
            <div className="flex items-center justify-center text-xl text-center">
              {/* <img className="inline-block" width="20" src={FreeStatusIcon} /> */}
              <span>Lijepi suncani apartman  drfgbdf</span>
              {/* <span>
                <img className="bg-white rounded-full" height="20" width="40" src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png" alt="" />
              </span> */}
            </div>

            <div className="flex items-center justify-between">
              <span>STATUS: </span>
              <span>
                <img className="inline-block" width="20" src={FreeStatusIcon} />
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>CITY:</span>
              <span>Karlovac</span>
            </div>
            <div className="flex items-center justify-between">
              <span>ROOMS: </span>
              <span>2</span>
            </div>
            <div className="flex items-center justify-between">
              <span>PRICE: </span>
              <span className="bg-[#68106d] px-4 py-1 rounded-md">34.55 e E</span>
            </div>
            { isRotatedButton && 
              <div className="flex flex-col gap-2 rounded-xl">
                <div className="flex items-center justify-between">
                  <span>DESCRIPTION: </span>
                  <span className="xs:overflow-x-auto">Neki apartman</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>ADDRESS:</span>
                  <span>Marmontova aleja 1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>DOUBLE BEDS: </span>
                  <span className="">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>SINGLE BEDS: </span>
                  <span className="">4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>DISTANCE FROM THE SEA: </span>
                  <span className="bg-[#68106d] px-4 py-1 rounded-md">1.5 km</span>
                </div>
                <div className='flex flex-col xs:flex-row gap-4 text-center col-span-full pt-12'>
                  <button className='w-full px-10 py-2 rounded-lg font-semibold  text-[#f6f7f9] bg-[#68106d] '>Change Details</button>
                  <button 
                    className='w-full px-10 py-2 rounded-lg font-semibold  text-[#f6f7f9] bg-[#68106d]'
                  >
                    Delete
                  </button>
                </div>
              </div>
            }
            <div className="flex items-center justify-center pt-4">
              <button 
                onClick={toggleButtonRotation}
                className={`${isRotatedButton ? 'rotate-180' : 'rotate-0'} sm:hidden duration-300`} 
              >
                <img width="20" src={DownArrow} alt="Arrow image" />
              </button>
            </div>
        </div>  }
      </div>


    </div>
  )
}

export default Apartments;

