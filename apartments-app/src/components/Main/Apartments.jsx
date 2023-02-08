import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import LoadingSpinnerSection from './LoadingSpinnerSection';
import Apartment from './Apartment';
import ApartmentTableHeader from './ApartmentTableHeader';
import MobileVersionApartment from './MobileVersionApartment';
import FoundNoApartmentSection from './FoundNoApartmentSection.jsx'
import { apartmentsFilterOptions } from './../../data/apartmentsFilterOptions';

const Apartments = () => {
  const [apartments, setApartments] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState('all')
  const [filterQuery, setFilterQuery] = useState('')

  const filterChangeHandler = e => setFilter(e.target.value)
  const filterQueryChangeHandler = e => setFilterQuery(e.target.value)

  const filteredApartments = useMemo(() => {
    return apartments.filter(apartment => {
      if (filter === 'all') {
        return apartments;
      }
      else if (filter === 'title') {
        return apartment.title.toLowerCase().includes(filterQuery.toLowerCase());
      }
      else if (filter === 'address') {
        return apartment.address.toLowerCase().includes(filterQuery.toLowerCase());
      } 
      else if (filter === 'city') {
        return apartment.city.toLowerCase().includes(filterQuery.toLowerCase());
      } 
      else {
        return apartments;
      }
    });
  }, [apartments, filter, filterQuery]);

  let errorContent = !isLoading && error && <p>{error}</p>
  let noApartmentContent = !isLoading && apartments.length === 0 && <FoundNoApartmentSection />
  let loadingContent = isLoading && <LoadingSpinnerSection />

  const deleteApartment = async id => {
    await axios.delete(`https://apartments-app-6a66f-default-rtdb.firebaseio.com/apartments/${id}.json`)
    
    setApartments(apartments.filter(apartment => apartment.id !== id))
  }

  const fetchApartments = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.get('https://apartments-app-6a66f-default-rtdb.firebaseio.com/apartments.json')
    
      const data = await response.data

      const loadedApartments = []

      for (let key in data) {
        loadedApartments.push({
          address: data[key].address,
          description: data[key].description,
          distanceFromTheSea: data[key].distanceFromTheSea,
          doubleBeds: data[key].doubleBeds,
          singleBeds: data[key].singleBeds,
          id: key,
          status: data[key].status,
          title: data[key].title,
          city: data[key].city,
          rooms: data[key].rooms,
          price: data[key].price,
          facilities: data[key].facilities
        })
      }

      setApartments(loadedApartments)
    } catch (error) { 
      setError(error.message) 
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchApartments()
  }, [])

  return (
    <div className='flex flex-col text-white font-poppins justify-center px-4 pt-36 md:px-36'>

      <h1 className='border-b-[#374151] border-b-[1px] pb-4 italic text-4xl font-normal text-[#f6f7f9] text-left'>Apartments</h1>
      { !isLoading && 
        <div className='flex items-center justify-end my-10'>
          <select value={filter} onChange={filterChangeHandler} className="text-black">
            {apartmentsFilterOptions.map(option => 
              <option key={option.label} value={option.value}>{option.label}</option>  
            )}
          </select>
          <input type="text" value={filterQuery} onChange={filterQueryChangeHandler} className="text-black"/>
          <button
            className='px-10 py-2 rounded-2xl font-semibold text-xl text-[#f6f7f9] bg-[#68106d]'
          >
            <Link to="/main/addNewApartment">+ Add</Link>
          </button>
        </div> 
      }

      { noApartmentContent }
      { loadingContent }
      { errorContent }

      <div className='hidden sm:block'>
        <ApartmentTableHeader />
        { filteredApartments.map((apartment, index) =>
          <Apartment
            key={apartment.id}
            address={apartment.address}
            description={apartment.description}
            distanceFromTheSea={apartment.distanceFromTheSea}
            doubleBeds={apartment.doubleBeds}
            singleBeds={apartment.singleBeds}
            status={apartment.status}
            title={apartment.title}
            index={index + 1}
            id={apartment.id}
            city={apartment.city}
            rooms={apartment.rooms}
            price={apartment.price}
            onDeleteApartment={deleteApartment}
          />
        )}
      </div>

      <div className='flex flex-col gap-4 sm:hidden'>
        {filteredApartments.map(apartment => 
          <MobileVersionApartment 
            key={apartment.id}
            address={apartment.address}
            description={apartment.description}
            distanceFromTheSea={apartment.distanceFromTheSea}
            doubleBeds={apartment.doubleBeds}
            singleBeds={apartment.singleBeds}
            status={apartment.status}
            title={apartment.title}
            id={apartment.id}
            city={apartment.city}
            rooms={apartment.rooms}
            price={apartment.price}
            onDeleteApartment={deleteApartment}
          />
        )}
      </div>

    </div>
  )
}

export default Apartments;

