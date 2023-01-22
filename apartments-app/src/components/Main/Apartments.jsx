import React from 'react'
import AddNewApartment from './AddNewApartment'
import { Link } from 'react-router-dom'
import ArrowDown from '../../assets/DownArrow.svg'
import axios from 'axios';
import { useState, useEffect } from 'react';
import LoginForm from '../Login/LoginForm';
import { useCallback } from 'react';
import LoadingSpinner from '../../assets/LoadingSpinner.svg'

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
    <div>
      <div className='flex flex-col gap-16 justify-center pt-36 px-36'>
          <h1 className='border-b-[#374151] border-b-[1px] pb-4 italic text-4xl font-normal text-[#f6f7f9] text-left'>Apartments</h1>
          { !isLoading && apartments.length > 0 && <table className='bg-[#384252] text-[#f6f7f9] rounded-md'>
            <thead>
              <tr className='border-b-[#23272f] border-b-[1px]'>
                <th className='py-6 px-6 bg-[#149eca]'>#</th>
                <th className='py-4 px-6'>Status</th>
                <th className='py-4 px-6'>Reserved By</th>
                <th className='py-4 px-6'>Title</th>
                <th className='py-4 px-6'>City</th>
                <th className='py-4 px-6'>Rooms</th>
                <th className='py-4 px-6'>Price</th>
                <th className='py-4 px-6'>Image</th>
                <th className='py-4 px-6'></th>
              </tr>
            </thead>
            <tbody>
              {apartments.map(apartment =>
                <tr key={apartment.id} className='border-b-[#23272f] border-b-[1px] hover:bg-[#4c5a70] duration-100'>
                  <td className='py-4 px-6'>{apartment.id}</td>
                  <td className='py-4 px-6'>{apartment.status}</td>
                  <td className='py-4 px-6'>{apartment.reservedBy}</td>
                  <td className='py-4 px-6'>{apartment.title}</td>
                  <td className='py-4 px-6'>{apartment.city}</td>
                  <td className='py-4 px-6'>{apartment.rooms}</td>
                  <td className='py-4 px-6'>{apartment.price}</td>
                  <td className='py-4 px-6'>
                    <img
                      className='hover:scale-[600%] duration-200'
                      width='30'
                      height='30'
                      src='https://www.phillyaptrentals.com/wp-content/uploads/2020/12/apartment-building-what-makes-good-apartment-building-scaled.jpg' />
                  </td>
                  <td>
                    <button
                      className='px-6 py-1 rounded-2xl font-semibold text-md text-[#f6f7f9] flex items-center justify-center'
                    >
                      <img height="20" width="20" src={ArrowDown} alt="Down arrow icon" />
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table> }
          { isLoading &&
            <div className='flex items-center justify-center'>
              <img height='50' width='50' src={LoadingSpinner} />
            </div>
          }
          <div className='flex items-center justify-end'>
           { !isLoading && apartments.length > 0 && <button
              onClick={onModalOpen}
              className='px-10 py-2 rounded-2xl font-semibold text-xl text-[#f6f7f9] bg-[#149eca]'
            >
              <Link to="/main/apartments/addNewApartment">+ Add</Link>
            </button>}
          </div>
          { isModalOpen && <AddNewApartment  onModalClose={onModalClose} />}
      </div>
    </div>
  )
}

export default Apartments